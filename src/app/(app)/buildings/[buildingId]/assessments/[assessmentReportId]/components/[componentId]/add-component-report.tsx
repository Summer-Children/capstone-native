import { CREATE_COMPONENT_REPORT } from '@/src/entities/component-report/hook/component-report'
import Header from '@/src/shared/ui/header'
import CloseButton from '@/src/shared/ui/close-button'
import { useMutation } from '@apollo/client'
import { AddDescription } from '@/src/widgets/add-components/ui/add-description'
import { Href, Stack, useLocalSearchParams } from 'expo-router'
import type { ReactNode } from 'react'
import React from 'react'
import { ComponentReportPriority } from '@/src/_gqlgen/graphql'

export default function AudioDescriptionPage(): ReactNode {
    const { assessmentReportId, componentId, buildingId } = useLocalSearchParams()
    const [createComponentReport] = useMutation(CREATE_COMPONENT_REPORT)
    const onGoNext = async (note: string | null | undefined): Promise<Href> => {
        const result = await createComponentReport({
            variables: {
                input: {
                    assessmentReportId: assessmentReportId.toString(),
                    componentId: componentId.toString(),
                    action: 'TBD',
                    condition: 'TBD',
                    note: note ?? '',
                    priority: ComponentReportPriority.Low,
                    quantityNeeded: 0,
                    yearReviewed: new Date().getFullYear()
                }
            },
            onError: error => {
                console.error('Error creating component report', error)
            }
        })
        const componentReportId = result.data?.createComponentReport.id
        if (!componentReportId) {
            throw new Error('Component report ID is required')
        }
        return `/buildings/${buildingId}/assessments/${assessmentReportId}/components/${componentId}/component-reports/${componentReportId}/add-photos`
    }

    return (
        <>
            <Stack.Screen options={{ headerRight: () => <CloseButton /> }} />
            <Header
                headerText="Component description"
                headerDescription="Describe your component status and details. We'll organize it in the report for you."
            />
            <AddDescription onGoNext={onGoNext} />
        </>
    )
}
