import React, { ReactNode } from 'react'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { CreateBuilding } from '@/src/features/create-building/ui/create-building'

export default function CreateBuildingPage(): ReactNode {
    const router = useRouter()
    const handleSuccess = (newBuilding: { id: string }): void => {
        router.push(`/building/success/${newBuilding.id}`)
    }

    return (
        <View className="flex-1">
            <CreateBuilding onSuccess={handleSuccess} />
        </View>
    )
}
