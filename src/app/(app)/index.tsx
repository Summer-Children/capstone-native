import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { BuildingCarousel } from '@/src/features/map-view/ui/building-carousel'
import { MapViewComponent } from '@/src/features/map-view/ui/map'
import { tokenVar } from '@shared/lib/auth/provider'
import { router, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { AddHomeIcon, AssignmentIcon } from '@/src/shared/ui'
import { ReactNode, useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import { useQuery } from '@apollo/client'
import { GET_BUILDINGS } from '@/src/entities/building'
import { Building } from '@/src/entities/building/type/building-type'
import { getBuildingState } from '@/src/entities/building/ui/building-card'
import { ActionButton, BlankState } from '@/src/widgets/home'
import { H2 } from '@/reusables/components/ui/typography'

export default function Homepage(): ReactNode {
    const accountName = 'Carolina' // TODO: get account name from user but I suppose we dont have time
    const { data, loading, error } = useQuery<{ res: Building[] }>(GET_BUILDINGS, {
        fetchPolicy: 'network-only'
    })
    const buildings: Building[] = (data?.res || []).filter((b): b is Building => b !== null)
    const filteredBuildings = buildings.filter(b => getBuildingState(b) !== 'complete')
    const visibleBuildings = [...filteredBuildings].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 5)

    const totalPendingAssessments = filteredBuildings.length

    const handleMarkerPress = (id: string): void => {
        setSelectedBuilding(id)
    }
    const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null)

    useEffect(() => {
        if (!selectedBuilding && visibleBuildings.length > 0 && visibleBuildings[0]?.id) {
            setSelectedBuilding(visibleBuildings[0].id)
        }
    }, [visibleBuildings])

    const logout = async (): Promise<void> => {
        tokenVar(null)
        await SecureStore.deleteItemAsync('authToken')
    }

    const handleCardPress = (id: string): void => {
        router.push(`/buildings/${id}/detail`)
    }

    return (
        <>
            <Stack.Screen
                options={{
                    contentStyle: { paddingHorizontal: 0, backgroundColor: 'white' },
                    headerBackVisible: false,
                    headerLeft: () => null
                }}
            />
            <View className="flex px-4 gap-2">
                {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
                <Image source={require('@/assets/images/logo.png')} resizeMode="contain" className="w-10 h-10" />
                <View className="flex-row justify-between items-center">
                    <H2 className="text-[32px] text-eva-blue-900">Hello {accountName}!</H2>
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
                            onPress={() => router.push('/buildings/new')}
                        />
                    </View>

                    <Text className="text-lg font-bold mb-2">
                        {`${totalPendingAssessments} Pending assessment${totalPendingAssessments === 1 ? '' : 's'}`}
                    </Text>

                    <MapViewComponent
                        buildings={visibleBuildings}
                        selectedBuilding={selectedBuilding}
                        onSelectBuilding={handleMarkerPress}
                    />
                    <View className="absolute bottom-0 w-full">
                        <BuildingCarousel
                            buildings={visibleBuildings}
                            selectedBuilding={selectedBuilding}
                            onSelectBuilding={setSelectedBuilding}
                            onCardPress={handleCardPress}
                        />
                    </View>
                </View>
            ) : (
                <BlankState
                    title="No assessments yet"
                    description="Add a building to get started or begin an assessment for an existing one."
                    buttons={[
                        {
                            label: 'New Assessment',
                            icon: <AssignmentIcon size={16} variant="solid" color="#1C1D1F" />,
                            onPress: () => router.push('/buildings')
                        },
                        {
                            label: 'Add Building',
                            icon: <AddHomeIcon size={16} variant="solid" color="#1C1D1F" />,
                            onPress: () => router.push('/buildings/new')
                        }
                    ]}
                />
            )}
        </>
    )
}
