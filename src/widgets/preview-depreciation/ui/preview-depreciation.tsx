import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/reusables/components/ui/table'
import { Text } from '@/reusables/components/ui/text'
import BottomButton from '@/src/shared/ui/bottom-button'
import Footer from '@/src/shared/ui/footer'
import { LoadingOverlay } from '@/src/shared/ui/loading-overlay'
import { useMutation } from '@apollo/client'
import { UPDATE_ASSESSMENT_REPORT } from '@entities/assessment-report/hooks/update-assessment-report'
import cn from 'clsx'
import { useRouter } from 'expo-router'
import { ReactNode, useMemo } from 'react'
import { ScrollView, useWindowDimensions, View } from 'react-native'
import { CREATE_ASSESSMENT_REPORT_PDF } from '../api/create-report-pdf'

type DepreciationPreviewtProps = {
    assessmentReportId: string
}

export default function DepreciationPreview({ assessmentReportId }: DepreciationPreviewtProps): ReactNode {
    const [generateAssessmentReportPdf, { loading }] = useMutation(CREATE_ASSESSMENT_REPORT_PDF, {
        fetchPolicy: 'network-only'
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

    // TODO: Replace the dummy data with the actual data once the backend is ready (Tomoki will do the calculation part)
    const dummyData = [
        {
            fiscalYear: '2027',
            annualContribution: '$71.204',
            Expenditures: '$250.00',
            closingBalance: '$50.000'
        },
        {
            fiscalYear: '2032',
            annualContribution: '$82.545',
            Expenditures: '$150.00',
            closingBalance: '$100.000'
        },
        {
            fiscalYear: '2037',
            annualContribution: '$82.500',
            Expenditures: '$300.00',
            closingBalance: '$75.000'
        }
    ]

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
            const { data } = await generateAssessmentReportPdf({
                variables: {
                    input: {
                        assessmentReportId: assessmentReportId
                    }
                }
            })

            const pdfUrl = data?.res?.pdfUrl ? `${data.res.pdfUrl}&timestamp=${Date.now()}` : null

            if (!pdfUrl) return

            router.push({
                pathname: '/(app)/report',
                params: { pdfUrl: encodeURIComponent(pdfUrl) }
            })
        } catch (error) {
            console.error('Failed to generate report:', error)
        }
    }

    return (
        <>
            <View className="flex-1">
                <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
                    <Table aria-labelledby="invoice-table">
                        <TableHeader>
                            <TableRow>
                                <TableHead style={{ width: columnWidths[0] }}>
                                    <Text className="text-left">Year</Text>
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
                            {dummyData.map((dummy, index) => (
                                <TableRow
                                    key={dummy.fiscalYear}
                                    className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                                >
                                    <TableCell style={{ width: columnWidths[0] }}>
                                        <Text className="text-left">{dummy.fiscalYear}</Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[1] }}>
                                        <Text className="text-right">{dummy.annualContribution}</Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[2] }}>
                                        <Text className="text-right"> {dummy.Expenditures}</Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[3] }}>
                                        <Text className="text-right">{dummy.closingBalance}</Text>
                                    </TableCell>
                                </TableRow>
                            ))}
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
