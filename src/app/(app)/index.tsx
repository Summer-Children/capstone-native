import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { GET_BUILDINGS_ON_FIRST_LOAD } from '@/src/entities/building'
import { Building } from '@/src/entities/building/type/building-type'
import { useCarousel } from '@/src/features/map-view/api/use-carousel'
import { BuildingCarousel } from '@/src/features/map-view/ui/building-carousel'
import { MapViewComponent } from '@/src/features/map-view/ui/map'
import { AddHomeIcon, AssignmentIcon } from '@/src/shared/ui'
import { ActionButton, BlankState } from '@/src/widgets/home'
import { useQuery } from '@apollo/client'
import { tokenVar } from '@shared/lib/auth/provider'
import { router, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React, { ReactNode, useEffect, useState } from 'react'
import { View } from 'react-native'

export default function Homepage(): ReactNode {
    const { data, loading, error } = useQuery<{ res: Building[] }>(GET_BUILDINGS_ON_FIRST_LOAD)
    const buildings: Building[] = (data?.res || []).filter((b): b is Building => b !== null)

    const { handleSelectBuilding } = useCarousel()
    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

    useEffect(() => {
        if (buildings.length > 0 && buildings[0]?.id) {
            setSelectedBuilding(buildings[0].id)
        }
    }, [buildings])

    const logout = async (): Promise<void> => {
        tokenVar(null)
        await SecureStore.deleteItemAsync('authToken')
    }

    return (
        <>
            <Stack.Screen
                options={{
                    contentStyle: { paddingHorizontal: 0, backgroundColor: 'white' },
                    headerLeft: () => null
                }}
            />
            <View className="flex px-4 gap-6">
                <View className="flex-row justify-between items-center">
                    <Text className="text-3xl font-bold text-eva-blue-900">Hello</Text>
                    <Button onPress={logout}>
                        <Text>Log out </Text>
                    </Button>
                </View>
            </View>

            {loading ? (
                <View className="flex-1 flex items-center justify-center">
                    <Text className="text-lg font-bold"> Loading...</Text>
                </View>
            ) : error ? (
                <View className="flex-1 flex items-center justify-center">
                    <Text className="text-lg font-bold text-red-500"> Failed to load data </Text>
                </View>
            ) : buildings.length > 0 ? (
                <View className="flex-1 p-4">
                    <View className="flex-row gap-4 mb-8">
                        <ActionButton
                            label="New Assessment"
                            icon={<AssignmentIcon variant="solid" color="#1C1D1F" size={16} />}
                            onPress={() => router.push('/buildings')}
                        />
                        <ActionButton
                            label="Add Building"
                            icon={<AddHomeIcon variant="solid" color="#1C1D1F" size={16} />}
                            onPress={() => router.push('/building/create')}
                        />
                    </View>

                    <Text className="text-lg font-bold mb-2">
                        {`${Math.min(buildings.length, 5)} Pending assessment${Math.min(buildings.length, 5) === 1 ? '' : 's'}`}
                    </Text>

                    <MapViewComponent
                        buildings={buildings}
                        selectedBuilding={selectedBuilding}
                        onSelectBuilding={handleSelectBuilding}
                    />
                    <View className="absolute bottom-0 w-full">
                        <BuildingCarousel
                            buildings={buildings}
                            selectedBuilding={selectedBuilding}
                            onSelectBuilding={setSelectedBuilding}
                        />
                    </View>
                </View>
            ) : (
                <BlankState
                    onBuildingPress={() => router.push('/building/create')}
                    onAssessmentPress={() => router.push('/buildings')}
                />
            )}
        </>
    )
}
