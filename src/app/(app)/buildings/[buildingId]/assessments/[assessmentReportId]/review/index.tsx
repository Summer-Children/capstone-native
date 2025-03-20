import { Text } from '@/reusables/components/ui/text'
import { GET_BUILDING } from '@/src/entities/building/hook'
import CloseButton from '@/src/shared/ui/close-button'
import Header from '@/src/shared/ui/header'
import { ReviewAssessment } from '@/src/widgets/review-assessment/ui/review-assessment'
import { useQuery } from '@apollo/client'
import { Stack, useLocalSearchParams } from 'expo-router'
import { default as React, ReactNode } from 'react'

export default function ReviewAssessmentPage(): ReactNode {
    const { buildingId, assessmentReportId } = useLocalSearchParams()
    const { data: buildingData } = useQuery(GET_BUILDING, {
        variables: { id: buildingId as string }
    })
    const buildingName = buildingData?.res?.name || ''

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: () => <Text className="text-eva-black-300 text-xl ">{buildingName}</Text>,
                    headerRight: () => <CloseButton />
                }}
            />
            <Header
                headerText="Review assessment"
                headerDescription="Review your assessment and complete the missing components before you generate your final report"
            ></Header>
            <ReviewAssessment
                buildingId={buildingId as string}
                assessmentReportId={assessmentReportId as string}
            ></ReviewAssessment>
        </>
    )
}
