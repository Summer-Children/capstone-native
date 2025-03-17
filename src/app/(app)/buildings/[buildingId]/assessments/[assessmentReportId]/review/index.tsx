import Header from '@/src/shared/ui/header'
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ReactNode } from 'react'
import { Text, View } from 'react-native'

export default function ReviewAssessmentPage(): ReactNode {
    const { buildingId, assessmentReportId } = useLocalSearchParams()

    return (
        <>
            <Stack.Screen options={{ title: 'Review assessment', headerLeft: () => null }} />
            <Header
                headerText="Reivew assessment"
                headerDescription="Review your assessment and complete the missing components"
            ></Header>
            {/* TODO: review assessment page */}
            <Text>Review assessment</Text>
            <View>
                <Text>Building id</Text>
                <Text>{buildingId}</Text>
            </View>
            <View>
                <Text>Assessment id</Text>
                <Text>{assessmentReportId}</Text>
            </View>
        </>
    )
}
