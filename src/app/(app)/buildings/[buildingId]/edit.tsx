import React, { ReactNode } from 'react'
import { View } from 'react-native'
import Header from '@/src/shared/ui/header'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { EditBuilding } from '@/src/features/edit-building/ui/edit-building'

export default function EditBuildingPage(): ReactNode {
    const { id } = useLocalSearchParams()
    const router = useRouter()

    return (
        <View className="flex-1">
            <Header headerText="Building information" />
            <EditBuilding id={id as string} onSuccess={() => router.push(`/building/detail/${id}`)} />
        </View>
    )
}
