import React, { ReactNode } from 'react'
import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { CreateBuilding } from '@/src/features/create-building/ui/create-building'

export default function CreateBuildingPage(): ReactNode {
    const router = useRouter()
    const handleSuccess = ({ id }: { id: string }): void => {
        router.push(`/buildings/success?id=${id}`)
    }

    return (
        <View className="flex-1">
            <CreateBuilding onSuccess={handleSuccess} />
        </View>
    )
}
