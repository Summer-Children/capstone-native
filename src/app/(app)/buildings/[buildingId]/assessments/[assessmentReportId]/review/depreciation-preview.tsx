import { GET_BUILDING } from '@/src/entities/building'
import CloseButton from '@/src/shared/ui/close-button'
import Header from '@/src/shared/ui/header'
import DepreciationPreview from '@/src/widgets/preview-depreciation/ui/preview-depreciation'
import { useQuery } from '@apollo/client'
import { Stack, useLocalSearchParams } from 'expo-router'
import { ReactNode } from 'react'
import { Text } from '@/reusables/components/ui/text'

export default function DepreciationPreviewPage(): ReactNode {
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
                headerText="Depreciation preview"
                headerDescription="Preview your depreciation report on most critical years. Progressive Annual Increase is 3.0% every year."
            ></Header>
            <DepreciationPreview assessmentReportId={assessmentReportId as string} />
        </>
    )
}
