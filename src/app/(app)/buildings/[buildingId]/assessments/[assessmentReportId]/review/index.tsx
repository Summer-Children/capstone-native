import Header from '@/src/shared/ui/header'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ReactNode } from 'react'

export default function ReviewAssessmentPage(): ReactNode {
    const { building } = useLocalSearchParams()
    const buildingName = building as string

    return (
        <>
            <Stack.Screen options={{ title: buildingName, headerLeft: () => null }} />
            <Header
                headerText="Reivew assessment"
                headerDescription="Review your assessment and complete the missing cimponents"
            ></Header>
        </>
    )
}
