import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useRouter, useLocalSearchParams, Stack } from 'expo-router'
import { ImageIcon, X } from 'lucide-react-native'
import Header from '@/src/shared/ui/header'
// import { Button } from '@/reusables/components/ui/button'
// import { useCreateAssessmentReport } from '@/src/features/create-building/api/use-assessment-report'
import { GET_BUILDING } from '@/src/entities/building'
import { useQuery } from '@apollo/client'

export default function BuildingSuccess(): ReactNode {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    // const { name: buildingName } = useLocalSearchParams()

    const { data, loading, error } = useQuery(GET_BUILDING, {
        variables: { id: id as string },
        skip: !id
    })
    const building = data?.res

    // const { create: createAssessmentReport } = useCreateAssessmentReport()

    // const startAssessment = async (): Promise<void> => {
    //     if (!buildingName) {
    //         console.error('Building name is required to start the assessment')
    //         return
    //     }

    //     try {
    //         if (!building) {
    //             console.error('Building data is not available')
    //             return
    //         }
    //         const reportId = await createAssessmentReport({
    //             id: building.id,
    //             draft: true,
    //             fiscalYear: building.fiscalYear || 0
    //         })

    //         if (reportId) {
    //             router.push(`../assessment/building/assessment/${building?.name}`)
    //         } else {
    //             console.error('Assessment creation failed')
    //         }
    //     } catch (error) {
    //         console.error('Error creating assessment:', error)
    //     }
    // }

    if (loading) return <Text>Loading building data...</Text>
    if (error) return <Text>Error loading building data</Text>
    if (!building) return <Text>No building found</Text>

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerBackVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push('/building')} className="mr-4">
                            <X size={24} color="#2D3648" />
                        </TouchableOpacity>
                    )
                }}
            />

            <ScrollView className="flex-1">
                <Header headerText="Your building have been created" />
                <View className="pb-4 flex gap-4">
                    <View className="h-60 bg-eva-white-200 rounded-xl overflow-hidden justify-center items-center">
                        <ImageIcon size={50} color="#2D3648" />
                    </View>
                    <View className="flex px-4">
                        <Text className="text-2xl font-bold text-eva-black-900">{building.name}</Text>
                        <Text className="text-eva-black-300">{building.address}</Text>
                        <Text className="text-eva-black-300 mb-2">Built in: {building.year}</Text>
                        <Text className="text-eva-black-900">Strata: {building.strataId}</Text>
                    </View>
                </View>
            </ScrollView>

            {/* <View className="absolute bottom-8 left-4 right-4 flex gap-4">
                <Button className="bg-base-800 rounded-md items-center" onPress={startAssessment}>
                    <Text className="text-white font-bold">Start assessment</Text>
                </Button>

                <Button
                    variant="outline"
                    className="border-white py-4 rounded-md items-center"
                    onPress={() => router.push(`/building/detail/${building.id}`)}
                >
                    <Text className="text-base-800 font-bold">Check building profile</Text>
                </Button>
            </View> */}
        </>
    )
}
