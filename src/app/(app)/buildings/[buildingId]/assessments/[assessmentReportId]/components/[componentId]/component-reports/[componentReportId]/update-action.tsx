import Header from '@/src/shared/ui/header'
import XButton from '@/src/shared/ui/x-button'
import AddAction from '@/src/widgets/add-components/ui/add-action'
import { Stack, useLocalSearchParams } from 'expo-router'
import type { ReactNode } from 'react'
import React from 'react'

export default function AddActionPage(): ReactNode {
    const { componentId, componentReportId } = useLocalSearchParams()

    return (
        <>
            <Stack.Screen options={{ headerRight: () => <XButton /> }} />
            <Header
                headerText="Action"
                headerDescription="Describe the condition of this component and recommend the necessary actions."
            />
            <AddAction componentReportId={componentReportId.toString()} componentId={componentId.toString()} />
        </>
    )
}
