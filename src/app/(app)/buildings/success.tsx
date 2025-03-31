import React, { ReactNode, useState } from 'react'
import { View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { useRouter, useLocalSearchParams, Stack } from 'expo-router'
import { ImageIcon } from 'lucide-react-native'
import Header from '@/src/shared/ui/header'
import { Button } from '@/reusables/components/ui/button'
import { GET_BUILDING } from '@/src/entities/building'
import { useMutation, useQuery } from '@apollo/client'
import Footer from '@/src/shared/ui/footer'
import { CREATE_ASSESSMENT_REPORT } from '@/src/entities/assessment-report/hook/assessment-report'
import { getBuildingImageUrl } from '@/src/entities/building/hook/get-building-image-url'
import BottomButton from '@/src/shared/ui/bottom-button'

export default function BuildingSuccess(): ReactNode {
    const { id } = useLocalSearchParams()
    const router = useRouter()
    const { data } = useQuery(GET_BUILDING, {
        variables: { id: id as string },
        skip: !id
    })
    const [loadFailed, setLoadFailed] = useState(false)
    const [createAssessmentReport] = useMutation(CREATE_ASSESSMENT_REPORT)
    const building = data?.res
    if (!building) return <Text>No building found</Text>
    const imageUrl = getBuildingImageUrl(building.id)

    const handleCreateAssessment = async (): Promise<void> => {
        if (!id) return

        try {
            const { data } = await createAssessmentReport({
                variables: {
                    input: {
                        buildingId: id as string,
                        draft: true
                    }
                }
            })

            const assessmentReportId = data?.createAssessmentReport?.id
            if (assessmentReportId) {
                router.push(`/buildings/${id}/assessments/${assessmentReportId}/components`)
            }
        } catch (error) {
            console.error('Failed to create assessment report:', error)
        }
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerBackVisible: false,
                    headerLeft: () => null,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.replace('/buildings/archive-list')}>
                            <Text className="text-xl text-eva-blue-500 font-semibold">Close</Text>
                        </TouchableOpacity>
                    )
                }}
            />

            <ScrollView className="flex-1">
                <Header headerText="Your building profile has been created" />
                <View className="pb-4 flex gap-4">
                    <View className="h-60 bg-eva-white-200 rounded-xl overflow-hidden justify-center items-center">
                        {!loadFailed ? (
                            <Image
                                source={{ uri: imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                                onError={() => setLoadFailed(true)}
                            />
                        ) : (
                            <ImageIcon size={50} color="#2D3648" />
                        )}
                    </View>
                    <View className="flex px-4">
                        <Text className="text-2xl font-bold text-eva-black-900">{building.name}</Text>
                        <Text className="text-eva-black-300">{building.address}</Text>
                        <Text className="text-eva-black-300 mb-2">Built in: {building.year}</Text>
                        <Text className="text-eva-black-900">Strata: {building.strataId}</Text>
                    </View>
                </View>
            </ScrollView>

            <Footer className="flex gap-4 mx-4">
                <BottomButton onPress={handleCreateAssessment}>
                    <Text>Start assessment</Text>
                </BottomButton>

                <Button
                    variant="outline"
                    className="border-white py-4 rounded-xl items-center"
                    onPress={() => router.push(`/buildings/${building.id}/detail`)}
                >
                    <Text className="text-eva-blue-500 font-bold">Check building profile</Text>
                </Button>
            </Footer>
        </>
    )
}
