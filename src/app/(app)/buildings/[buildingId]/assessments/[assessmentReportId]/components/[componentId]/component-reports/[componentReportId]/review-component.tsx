import { Button } from '@/reusables/components/ui/button'
import { Label } from '@/reusables/components/ui/label'
import { GET_COMPONENT_REPORT, useUpdateComponentReport } from '@/src/entities/component-report/hook/component-report'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { useQuery } from '@apollo/client'
import { Link, Stack, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { View, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native'
import { Text } from 'reusables/components/ui/text'
import { X } from 'lucide-react-native'
import { GET_COMPONENT } from '@/src/entities/component/hook/components'
import ExpandableText from '@/src/shared/ui/expandable-text'
import { File } from '@/src/_gqlgen/graphql'
import { AddPhotoIcon } from '@/src/shared/ui/icons/add-photo'
import CloseButton from '@/src/shared/ui/close-button'
import BottomButton from '@/src/shared/ui/bottom-button'
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
        <>
            <Stack.Screen
                options={{
                    headerRight: () => <CloseButton />
                }}
            />
            <View className="flex-1 flex-col bg-white">
                <Header headerText={'Component review'} />

                <ScrollView className="flex-1  overflow-scroll mb-32 ">
                    <View className="flex flex-col gap-6">
                        {/* component name */}
                        <View className="h-fit flex flex-col gap-1">
                            <Text className="font-medium text-base text-eva-black-300">Name</Text>
                            <Text className="border border-eva-white-500 rounded-lg px-4 py-3">{component.name}</Text>
                        </View>

                        {/* Photos Section */}
                        <View className="flex-1 ">
                            <Label className="mb-2 text-gray-600">Photos</Label>

                            {/* Photos Carousel */}
                            <View className="mb-3">
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
                                    <View className="flex-row w-full h-40 bg-eva-white-100 rounded-lg overflow-hidden justify-center items-center">
                                        <AddPhotoIcon variant="solid" />
                                        <Text className="font-medium text-eva-black-900">No image selected</Text>
                                    </View>
                                )}
                            </View>

                            {/* Add More Photos Button */}
                            <Link href="./add-photos" asChild>
                                <TouchableOpacity className="flex-row gap-1 items-center justify-center bg-eva-white-100 py-2 px-4 rounded-lg">
                                    <AddPhotoIcon variant="solid" className="text-eva-black-900" />
                                    <Text className="font-medium text-eva-black-900">Add more photos</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>

                        {/* Description Section */}
                        <View className=" border-eva-white-300 border rounded-xl px-4 py-5">
                            <View className="flex flex-row justify-between items-center my-1">
                                <Text className="text-xl">Description</Text>
                                <Link href={editDescriptionPath}>
                                    <Text className="text-eva-blue-500 font-semibold">Edit</Text>
                                </Link>
                            </View>
                            <View className="mb-1">
                                <Text className="text-md text-eva-black-300">Enhanced with AI ✨</Text>
                            </View>
                            <View className=" rounded-md mb-4">
                                <ExpandableText text={componentReport.note ?? ''} />
                            </View>
                        </View>

                        {/* Activity Section */}
                        <View className=" border-eva-white-300 border rounded-xl px-4 py-5">
                            <View className="flex flex-row justify-between items-center mb-3">
                                <Text className="text-xl">Actions</Text>
                                <Link href={editActionPath}>
                                    <Text className="text-eva-blue-500 font-semibold">Edit</Text>
                                </Link>
                            </View>

                            {/* Activity Details */}
                            <View className="flex flex-col gap-4">
                                <View className="flex flex-col gap-2">
                                    <View className="flex flex-row justify-between">
                                        <Text className="text-eva-black-300">Action</Text>
                                        <Text>{componentReport.action}</Text>
                                    </View>

                                    <View className="flex flex-row justify-between">
                                        <Text className="text-eva-black-300">Next renovation</Text>
                                        <Text>{component.nextActionYear}</Text>
                                    </View>

                                    <View className="flex flex-row justify-between">
                                        <Text className="text-eva-black-300">Component condition</Text>
                                        <Text>{componentReport.condition}</Text>
                                    </View>

                                    <View className="flex flex-row justify-between">
                                        <Text className="text-eva-black-300">Frequency</Text>
                                        {component.actionFrequency ? (
                                            <Text>every {component.actionFrequency} years</Text>
                                        ) : (
                                            <Text>-</Text>
                                        )}
                                    </View>
                                </View>
                                <View className="flex flex-row justify-between">
                                    <Text className="font-medium">Final Cost</Text>
                                    <Text className="font-medium">{finalCost}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <Footer className="bg-white h-28 flex flex-col gap-4 justify-center items-center">
                    {/*Minor TODO: the following "Continue to finish" button should navigate to the "Review Assessment" page only when the immediate last route segment is "Review assessment" page */}
                    <Link href={componentListPath} asChild>
                        <BottomButton className="w-full">Continue to finish</BottomButton>
                    </Link>
                    <Link href={addNewComponentPath} asChild>
                        <Button variant="link" className="w-full">
                            <Text className="text-eva-blue-500 text-3xl font-bold">Add another component</Text>
                        </Button>
                    </Link>
                </Footer>
            </View>
        </>
    )
}
