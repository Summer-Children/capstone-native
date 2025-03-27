import React, { ReactNode } from 'react'
import { View } from 'react-native'
import Header from '@/src/shared/ui/header'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { EditBuilding } from '@/src/features/edit-building/ui/edit-building'
import { showToast } from '@/src/shared/ui/custom-toast'

export default function EditBuildingPage(): ReactNode {
    const { buildingId } = useLocalSearchParams()
    const router = useRouter()

    return (
        <View className="flex-1">
            <Header headerText="Building information" />
            <EditBuilding
                id={buildingId as string}
                onSuccess={() => {
                    showToast('Information updated!', 'success', 3000)
                    router.replace(`/buildings/${buildingId}/detail`)
                }}
            />
        </View>
    )
}
