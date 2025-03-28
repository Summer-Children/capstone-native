import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/reusables/components/ui/table'
import { Text } from '@/reusables/components/ui/text'
import BottomButton from '@/src/shared/ui/bottom-button'
import Footer from '@/src/shared/ui/footer'
import { LoadingOverlay } from '@/src/shared/ui/loading-overlay'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_ASSESSMENT_REPORT } from '@entities/assessment-report/hooks/update-assessment-report'
import cn from 'clsx'
import { useRouter } from 'expo-router'
import React, { ReactNode, useMemo } from 'react'
import { ScrollView, useWindowDimensions, View } from 'react-native'
import { GENERATE_PDF_AND_EXCEL } from '../api/create-report-pdf'
import { GET_ASSESSMENT_REPORT_FOR_PREVIEW } from '@entities/assessment-report/hook/index'

type DepreciationPreviewtProps = {
    assessmentReportId: string
}

type TableDataItem = {
    fiscalYear: string
    annualContribution: string
    Expenditures: string
    closingBalance: string
}

export default function DepreciationPreview({ assessmentReportId }: DepreciationPreviewtProps): ReactNode {
    const [generatePdfAndExcel, { loading }] = useMutation(GENERATE_PDF_AND_EXCEL, {
        fetchPolicy: 'network-only'
    })
    const { data: assessmentReportData } = useQuery(GET_ASSESSMENT_REPORT_FOR_PREVIEW, {
        variables: { id: assessmentReportId }
    })
    const router = useRouter()
    const [updateAssessmentReport] = useMutation(UPDATE_ASSESSMENT_REPORT)

    const { width } = useWindowDimensions()
    const MIN_COLUMN_WIDTHS = [50, 100, 100, 100]
    const columnWidths = useMemo(() => {
        const totalWidth = width * 0.91
        const firstColumnWidth = totalWidth / 7
        const remainingWidth = (totalWidth - firstColumnWidth) / (MIN_COLUMN_WIDTHS.length - 1)
        return [firstColumnWidth, remainingWidth, remainingWidth, remainingWidth]
    }, [width])

    const generateTableData = (): TableDataItem[] => {
        if (!assessmentReportData?.res) return []

        const {
            fiscalYear,
            componentReports,
            building: { components = [] },
            crfAnnualContribution,
            crfTotalBalance
        } = assessmentReportData.res

        const tableData = []
        let closingBalance = crfTotalBalance
        let contributions = crfAnnualContribution

        for (let i = 0; i < 8; i++) {
            const year = fiscalYear + i

            if (i > 0) {
                contributions = parseFloat(((contributions ?? 0) * 1.03).toFixed(2))
            }

            const expenditures = components.reduce((sum, component) => {
                const quantity =
                    componentReports?.find(report => report?.component.id === component?.id)?.quantityNeeded ?? 0

                let actionYear = component?.nextActionYear ?? 0
                while (actionYear <= fiscalYear + 7) {
                    if (actionYear === year) {
                        sum += (component?.unitRate ?? 0) * quantity
                    }
                    actionYear += component?.actionFrequency ?? 0
                }
                return sum
            }, 0)

            closingBalance = (closingBalance ?? 0) + (contributions ?? 0) - (expenditures ?? 0)

            tableData.push({
                fiscalYear: year.toString(),
                annualContribution: `$${(contributions ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                Expenditures: `$${(expenditures ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                closingBalance: `$${(closingBalance ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
            })
        }

        return tableData
    }

    const handleGenerateReport = async (): Promise<void> => {
        try {
            await updateAssessmentReport({
                variables: {
                    input: {
                        id: assessmentReportId,
                        draft: false
                    }
                }
            })
            const { data } = await generatePdfAndExcel({
                variables: {
                    input: {
                        assessmentReportId: assessmentReportId
                    }
                }
            })
            if (!data) {
                console.error('No data returned from generatePdfAndExcel mutation')
                return
            }

            const pdfUrl = data?.res?.pdfUrl ? `${data.res.pdfUrl}` : null
            const excelUrl = data?.res?.excelUrl ? `${data.res.excelUrl}` : null

            if (!pdfUrl || !excelUrl) return

            router.push({
                pathname: '/(app)/report',
                params: {
                    pdfUrl: encodeURIComponent(pdfUrl),
                    excelUrl: encodeURIComponent(excelUrl)
                }
            })
        } catch (error) {
            console.error('Failed to generate report:', error)
        }
    }

    const tableData = generateTableData()

    return (
        <>
            <View className="flex-1">
                <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
                    <Table aria-labelledby="invoice-table">
                        <TableHeader>
                            <TableRow>
                                <TableHead style={{ width: columnWidths[0] }}>
                                    <Text className="text-left text-eva-black-400">Year</Text>
                                </TableHead>
                                <TableHead style={{ width: columnWidths[1] }}>
                                    <Text className="text-right">Contributions</Text>
                                </TableHead>
                                <TableHead style={{ width: columnWidths[2] }}>
                                    <Text className="text-right"> Expenditures</Text>
                                </TableHead>
                                <TableHead style={{ width: columnWidths[3] }}>
                                    <Text className="text-right">Closing Balance</Text>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tableData.map((data, index) => (
                                <TableRow
                                    key={data.fiscalYear}
                                    className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                                >
                                    <TableCell style={{ width: columnWidths[0] }}>
                                        <Text className="text-left text-eva-black-900">{data.fiscalYear}</Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[1] }}>
                                        <Text className="text-right text-eva-black-900">{data.annualContribution}</Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[2] }}>
                                        <Text className="text-right text-eva-black-900"> {data.Expenditures}</Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[3] }}>
                                        <Text
                                            className={`text-right ${
                                                parseFloat(data.closingBalance.replace(/[$,]/g, '')) < 0
                                                    ? 'text-red-600'
                                                    : 'text-eva-black-900'
                                            }`}
                                        >
                                            {data.closingBalance}
                                        </Text>
                                    </TableCell>
                                </TableRow>
                            ))}

                            <TableFooter>
                                <TableRow className="border-t">
                                    <TableCell style={{ width: columnWidths[0] }}>
                                        <Text
                                            className="text-left bold text-eva-black-950 font-[Figtree_700Bold]"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            Total
                                        </Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[1] }}>
                                        <Text className="text-right font-bold text-eva-black-900">
                                            {`$${tableData
                                                .reduce(
                                                    (sum, row) =>
                                                        sum + parseFloat(row.annualContribution.replace(/[$,]/g, '')),
                                                    0
                                                )
                                                .toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                        </Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[2] }}>
                                        <Text className="text-right font-bold text-eva-black-900">
                                            {`$${tableData
                                                .reduce(
                                                    (sum, row) =>
                                                        sum + parseFloat(row.Expenditures.replace(/[$,]/g, '')),
                                                    0
                                                )
                                                .toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                        </Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[3] }}>
                                        {((): ReactNode => {
                                            const totalContribution = tableData.reduce(
                                                (sum, row) =>
                                                    sum + parseFloat(row.annualContribution.replace(/[$,]/g, '')),
                                                0
                                            )
                                            const totalExpenditure = tableData.reduce(
                                                (sum, row) => sum + parseFloat(row.Expenditures.replace(/[$,]/g, '')),
                                                0
                                            )
                                            const totalBalance = totalContribution - totalExpenditure
                                            return (
                                                <Text
                                                    className={cn(
                                                        'text-right font-bold',
                                                        totalBalance < 0 ? 'text-red-600' : 'text-eva-black-900'
                                                    )}
                                                >
                                                    {`$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                                </Text>
                                            )
                                        })()}
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </TableBody>
                    </Table>
                </ScrollView>
                <Footer>
                    <BottomButton onPress={handleGenerateReport}>Generate full report</BottomButton>
                </Footer>
            </View>
            {loading && <LoadingOverlay>Generating a report...</LoadingOverlay>}
        </>
    )
}
