import { Stack, useLocalSearchParams } from 'expo-router'
import { AddComponent } from '@/src/widgets/add-components/ui/add-component'
import CloseButton from '@/src/shared/ui/close-button'
import type { ReactNode } from 'react'
import React from 'react'

export default function AddComponentPage(): ReactNode {
    const { buildingId, assessmentReportId } = useLocalSearchParams()
    return (
        <>
            <Stack.Screen options={{ headerRight: () => <CloseButton /> }} />
            <AddComponent buildingId={buildingId as string} assessmentReportId={assessmentReportId as string} />
        </>
    )
}
