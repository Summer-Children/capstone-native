import { GET_COMPONENT_REPORT, UPDATE_COMPONENT_REPORT } from '@/src/entities/component-report/hook/component-report'
import Header from '@/src/shared/ui/header'
import XButton from '@/src/shared/ui/x-button'
import { AddDescription } from '@/src/widgets/add-components/ui/add-description'
import { useMutation, useQuery } from '@apollo/client'
import { Alert, Text } from 'react-native'

import { Href, Stack, useLocalSearchParams } from 'expo-router'
import type { ReactNode } from 'react'
import React from 'react'

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

    const onGoNext = async (note: string): Promise<Href> => {
        const { componentReport } = data
        const { id, action, condition, priority, quantityNeeded, yearReviewed } = componentReport
        if (!id || !action || !condition || !priority || !quantityNeeded || !yearReviewed) {
            Alert.alert('data is imcomplete')
            return Promise.reject(new Error('data is imcomplete'))
        }

        await updateComponentReport({
            variables: {
                input: {
                    id: componentReportId.toString(),
                    action: action,
                    condition: condition,
                    priority: priority,
                    quantityNeeded: quantityNeeded,
                    yearReviewed: yearReviewed,
                    note: note
                }
            }
        })
        const targetPath = `./add-photos`
        return targetPath
    }

    return (
        <>
            <Stack.Screen options={{ headerRight: () => <XButton /> }} />
            <Header
                headerText="Component description"
                headerDescription="Describe your component status and details. We'll organize it in the report for you."
            />

            <AddDescription onGoNext={onGoNext} />
        </>
    )
}
