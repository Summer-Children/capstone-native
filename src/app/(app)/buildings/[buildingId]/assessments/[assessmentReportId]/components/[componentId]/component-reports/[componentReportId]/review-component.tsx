import { Button } from '@/reusables/components/ui/button'
import { Label } from '@/reusables/components/ui/label'
import { GET_COMPONENT_REPORT, useUpdateComponentReport } from '@/src/entities/component-report/hook/component-report'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { useQuery } from '@apollo/client'
import { Link, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import { Text } from 'reusables/components/ui/text'
import { X } from 'lucide-react-native'
import { GET_COMPONENT } from '@/src/entities/component/hook/components'
import ExpandableText from '@/src/shared/ui/expandable-text'
import { File } from '@/src/_gqlgen/graphql'
import { AddPhotoIcon } from '@/src/shared/ui/icons/add-photo'
export default function ReviewComponentPage(): React.ReactNode {
    const { componentId, componentReportId } = useLocalSearchParams()
    const {
        refetch: refetchComponentReport,
        data: componentReportData,
        loading: componentReportLoading
    } = useQuery(GET_COMPONENT_REPORT, {
        variables: {
            componentReportId: componentReportId.toString()
        }
    })
    const { data: componentData, loading: componentLoading } = useQuery(GET_COMPONENT, {
        variables: {
            componentId: componentId.toString()
        }
    })
    const { updateComponentReportMutation } = useUpdateComponentReport()

    const [photos, setPhotos] = useState<Array<File | null>>(componentReportData?.componentReport?.images ?? [])

    const removePhoto = async (id: string): Promise<void> => {
        setPhotos(photos.filter(photo => photo?.id !== id))
        await updateComponentReportMutation({
            ...componentReportData?.componentReport,
            id: componentReportData?.componentReport?.id.toString() ?? '',
            images: [],
            removeImages: [id]
        })
        await refetchComponentReport()
    }

    if (componentReportLoading || componentLoading) {
        return <Text>Loading...</Text>
    }

    if (!componentReportData) {
        return <Text>could not fetch data</Text>
    }

    const { componentReport } = componentReportData
    const { res: component } = componentData!
    const finalCost = (component.unitRate ?? 0) * (componentReport.quantityNeeded ?? 0)
    const editActionPath = './update-action'
    const editDescriptionPath = './update-description'
    const addNewComponentPath = '../../../add-component'
    const componentListPath = '../../../../components'

    return (
        <View className="flex-1 flex-col bg-white">
            <Header headerText={'Component review'} />

            <ScrollView className="flex-1 flex-col overflow-scroll mb-28 gap-y-4">
                {/* component name */}
                <View className="h-fit">
                    <View className="flex flex-row justify-between items-center mb-3">
                        <Text className="font-medium text-base">Component Name</Text>
                        <Button variant="link" size="sm">
                            <Text className="text-blue-600">Edit</Text>
                        </Button>
                    </View>
                    <Text className="mb-6 border border-gray-300 rounded-lg px-4 py-3">{component.name}</Text>
                </View>

                {/* Photos Section */}
                <View className="flex-1">
                    <Label className="mb-3 text-gray-600">Photos</Label>

                    {/* Photos Carousel */}
                    <View className="mb-4">
                        {photos.length > 0 ? (
                            <FlatList
                                data={photos}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item?.id ?? ''}
                                renderItem={({ item }) => (
                                    <View className="mr-3 relative">
                                        <View className="w-40 h-40 bg-gray-200 rounded-lg overflow-hidden justify-center items-center">
                                            <Image
                                                source={{
                                                    uri: item?.url ?? ''
                                                }}
                                                className="w-full h-full object-cover"
                                                defaultSource={{
                                                    uri: item?.url ?? ''
                                                }}
                                            />
                                        </View>
                                        <TouchableOpacity
                                            className="absolute top-2 right-2 w-6 h-6 bg-gray-700 rounded-full items-center justify-center"
                                            onPress={() => removePhoto(item?.id ?? '')}
                                        >
                                            <X size={14} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                className="pb-3"
                            />
                        ) : (
                            <View className="flex-row w-full h-40 bg-gray-200 rounded-lg overflow-hidden justify-center items-center">
                                <AddPhotoIcon />
                                <Text className="text-gray-700 font-medium">No image selected</Text>
                            </View>
                        )}
                    </View>

                    {/* Add More Photos Button */}
                    <Link href="./add-photos" asChild>
                        <TouchableOpacity className="flex-row items-center justify-center bg-gray-100 py-3 px-4 rounded-lg">
                            <AddPhotoIcon />
                            <Text className="text-gray-700 font-medium">Add photos</Text>
                        </TouchableOpacity>
                    </Link>
                </View>

                {/* Description Section */}
                <View className="mb-6">
                    <View className="flex flex-row justify-between items-center my-1">
                        <Text className="font-medium text-base">Description</Text>
                        <Link href={editDescriptionPath}>
                            <Text className="text-blue-600">Edit</Text>
                        </Link>
                    </View>
                    <View className="mb-1">
                        {/* REALLY?????? */}
                        <Text className="text-sm text-gray-500">Enhanced with AI ✨</Text>
                    </View>
                    <View className="bg-gray-50 rounded-md p-3 mb-4">
                        <ExpandableText text={componentReport.note ?? ''} />
                    </View>
                </View>

                {/* Activity Section */}
                <View className="mb-6">
                    <View className="flex flex-row justify-between items-center mb-3">
                        <Text className="font-medium text-base">Activity</Text>
                        <Link href={editActionPath}>
                            <Text className="text-blue-600">Edit</Text>
                        </Link>
                    </View>

                    {/* Activity Details */}
                    <View className="space-y-3">
                        <View className="flex flex-row justify-between">
                            <Text className="text-gray-500">Action</Text>
                            <Text className="text-gray-700">{componentReport.action}</Text>
                        </View>

                        <View className="flex flex-row justify-between">
                            <Text className="text-gray-500">Next renovation</Text>
                            <Text className="text-gray-700">{component.nextActionYear}</Text>
                        </View>

                        <View className="flex flex-row justify-between">
                            <Text className="text-gray-500">Component condition</Text>
                            <Text className="text-gray-700">{componentReport.condition}</Text>
                        </View>

                        <View className="flex flex-row justify-between">
                            <Text className="text-gray-500">Frequency</Text>
                            {component.actionFrequency ? (
                                <Text className="text-gray-500">every {component.actionFrequency} years</Text>
                            ) : (
                                <Text className="text-gray-500">-</Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Final Cost */}
                <View className="mb-8">
                    <View className="flex flex-row justify-between">
                        <Text className="font-medium">Final Cost</Text>
                        <Text className="font-medium">{finalCost}</Text>
                    </View>
                </View>
            </ScrollView>

            <Footer className="bg-white h-28 flex flex-col justify-center items-center">
                {/*Minor TODO: the following "Continue to finish" button should navigate to the "Review Assessment" page only when the immediate last route segment is "Review assessment" page */}
                <Link href={componentListPath} asChild>
                    <Button className="w-full bg-blue-900 mb-2">
                        <Text className="text-white font-medium">Continue to finish</Text>
                    </Button>
                </Link>
                <Link href={addNewComponentPath} asChild>
                    <Button variant="link" className="w-full">
                        <Text className="text-blue-600">Add another component</Text>
                    </Button>
                </Link>
            </Footer>
        </View>
    )
}
