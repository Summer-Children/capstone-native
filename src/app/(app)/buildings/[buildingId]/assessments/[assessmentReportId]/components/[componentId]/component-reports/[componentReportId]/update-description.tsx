import { GET_COMPONENT_REPORT, UPDATE_COMPONENT_REPORT } from '@/src/entities/component-report/hook/component-report'
import Header from '@/src/shared/ui/header'
import CloseButton from '@/src/shared/ui/close-button'
import { AddDescription } from '@/src/widgets/add-components/ui/add-description'
import { useMutation, useQuery } from '@apollo/client'
import { Text } from 'react-native'

import { Href, Stack, useLocalSearchParams } from 'expo-router'
import type { ReactNode } from 'react'
import React from 'react'
import { ComponentReportPriority } from '@/src/_gqlgen/graphql'

export default function AudioDescriptionPage(): ReactNode {
    const { componentReportId } = useLocalSearchParams()
    const { data, loading } = useQuery(GET_COMPONENT_REPORT, {
        variables: {
            componentReportId: componentReportId.toString()
        }
    })
    const [updateComponentReport] = useMutation(UPDATE_COMPONENT_REPORT)

    if (loading) {
        return <Text>Loading...</Text>
    }

    if (!data) {
        return <Text>could not fetch data</Text>
    }

    const onGoNext = async (note: string | null | undefined): Promise<Href> => {
        const { componentReport } = data
        const { action, condition, priority, quantityNeeded, yearReviewed } = componentReport

        await updateComponentReport({
            variables: {
                input: {
                    id: componentReportId.toString(),
                    action: action ?? '',
                    condition: condition ?? '',
                    priority: priority ?? ComponentReportPriority.Low,
                    quantityNeeded: quantityNeeded ?? 0,
                    yearReviewed: yearReviewed ?? 0,
                    note: note ?? ''
                }
            }
        })
        const targetPath = `./add-photos`
        return targetPath
    }

    return (
        <>
            <Stack.Screen options={{ headerRight: () => <CloseButton /> }} />
            <Header
                headerText="Component description"
                headerDescription="Describe your component status and details. We'll organize it in the report for you."
            />

            <AddDescription onGoNext={onGoNext} initialValue={data.componentReport.note} />
        </>
    )
}
