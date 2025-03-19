import { Button } from '@/reusables/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/reusables/components/ui/card'
import { Separator } from '@/reusables/components/ui/separator'
import { Text } from '@/reusables/components/ui/text'
import Footer from '@/src/shared/ui/footer'
import { CheckCircleIcon, ChevronIcon, ErrorIcon, LibraryAddIcon } from '@/src/shared/ui/icons'
import { useQuery } from '@apollo/client'
import { GET_COMPONENT_REPORTS_BY_ASSESSMENT_REPORT_ID } from '@entities/component-report/hook/component-report'
import { GET_COMPONENTS } from '@entities/component/hook'
import { Href, Link, router, useFocusEffect } from 'expo-router'
import React, { ReactNode, useCallback } from 'react'
import { ScrollView, View } from 'react-native'

type ReviewAssessmentProps = {
    buildingId: string
    assessmentReportId: string
}

type Component = {
    id: string
    buildingId: string
    name: string
    category: string
    section: string
    actionFrequency?: number
    nextActionYear?: number
    yearInstalled?: number
    unitRate?: number
    lastActionYear?: number
}

type ComponentReport = {
    id: string
    assessmentReportId: string
    componentId: string
    action?: string
    condition?: string
    priority?: string
    note?: string
    quantityNeeded?: number
    yearReviewed?: number
    component: Component
}

export function ReviewAssessment({ buildingId, assessmentReportId }: ReviewAssessmentProps): ReactNode {
    const { refetch: componentsRefetch, data: componentsData } = useQuery(GET_COMPONENTS, {
        variables: { buildingId: buildingId }
    })

    const { refetch: cReportsFetch, data: componentReportsData } = useQuery(
        GET_COMPONENT_REPORTS_BY_ASSESSMENT_REPORT_ID,
        {
            variables: { assessmentReportId: assessmentReportId }
        }
    )

    useFocusEffect(
        useCallback(() => {
            void componentsRefetch()
            void cReportsFetch()
        }, [componentsRefetch, cReportsFetch])
    )

    // TODO: need to add image source once the image source is available
    const isCompleted = (report: ComponentReport): boolean =>
        ![
            report?.action,
            report?.condition,
            report?.note,
            report?.quantityNeeded,
            report?.yearReviewed,
            report?.component?.actionFrequency,
            report?.component?.nextActionYear,
            // report?.component?.yearInstalled, // TOCHECK: it is not used anywhere
            report?.component?.unitRate,
            report?.component?.lastActionYear
        ].some(field => field === null || field === undefined || field === '')

    const isExist = (componentId: string): boolean =>
        componentReportsData?.componentReports.find(report => report?.componentId === componentId) !== undefined
    const groupedComponents = componentsData?.res.reduce(
        (acc, component) => {
            const section = component?.section || 'Unknown'
            if (!acc[section]) {
                acc[section] = []
            }
            acc[section].push(component)
            return acc
        },
        {} as Record<string, typeof componentsData.res>
    )

    const reviewComponentReportPath = (componentId: string, componentReportId: string): Href =>
        `/buildings/${buildingId}/assessments/${assessmentReportId}/components/${componentId}/component-reports/${componentReportId}/review-component`
    const newComponentPath: Href = `/buildings/${buildingId}/assessments/${assessmentReportId}/components/add-component`
    const newComponentReportPath: (componentId: string) => Href = (componentId: string): Href =>
        `/buildings/${buildingId}/assessments/${assessmentReportId}/components/${componentId}/add-component-report`

    return (
        <View className="flex-1">
            <ScrollView>
                <View className=" flex flex-col gap-4">
                    {Object.entries(groupedComponents || {}).map(([section, components]) => (
                        <Card key={section} className="w-full max-w-sm">
                            <CardHeader className="flex flex-row justify-between">
                                <CardTitle>{section}</CardTitle>
                                <CardDescription className="text-eva-black-300">
                                    {
                                        components.filter(component =>
                                            isCompleted(
                                                componentReportsData?.componentReports.find(
                                                    report => report?.componentId === component?.id
                                                ) as ComponentReport
                                            )
                                        ).length
                                    }
                                    /{components.length} Completed
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-3">
                                {components.map(component => {
                                    const reviewPath = reviewComponentReportPath(
                                        component?.id as string,
                                        componentReportsData?.componentReports.find(
                                            report => report?.componentId === component?.id
                                        )?.id as string
                                    )
                                    const newCRPath = newComponentReportPath(component?.id as string)
                                    return (
                                        <Link
                                            key={component?.id}
                                            href={isExist(component?.id as string) ? reviewPath : newCRPath}
                                            asChild
                                        >
                                            <Button
                                                key={component?.id}
                                                variant="link"
                                                className="rounded-lg py-2 px-3 flex-row gap-3 justify-between bg-eva-white-100 text-eva-black-900"
                                            >
                                                {isCompleted(
                                                    componentReportsData?.componentReports.find(
                                                        report => report?.componentId === component?.id
                                                    ) as ComponentReport
                                                ) ? (
                                                    <CheckCircleIcon
                                                        variant="solid"
                                                        stroke="#14532d"
                                                        color="#dcfce7"
                                                        strokeWidth={1.5}
                                                    />
                                                ) : (
                                                    <ErrorIcon variant="solid" color="#fee2e2" stroke="#7F1D1D" />
                                                )}
                                                <Text className="flex-grow">{component?.name}</Text>
                                                <ChevronIcon direction="right" />
                                            </Button>
                                        </Link>
                                    )
                                })}
                                <Separator className="mt-3" />
                            </CardContent>
                            <CardFooter className="flex flex-row justify-start">
                                <Link href={newComponentPath} asChild>
                                    <Button
                                        className="rounded-lg flex-row gap-2 items-center justify-center bg-eva-white-100 "
                                        size="sm"
                                    >
                                        <LibraryAddIcon variant="solid" color="#111213" size={20}>
                                            {' '}
                                        </LibraryAddIcon>
                                        <Text className="text-eva-black-900">Add a component</Text>
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </View>
            </ScrollView>
            <Footer>
                <Button
                    onPress={() => {
                        router.push('./review/depreciation-preview')
                    }}
                >
                    <Text>Confirm</Text>
                </Button>
            </Footer>
        </View>
    )
}
