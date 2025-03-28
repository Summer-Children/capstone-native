import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { GET_BUILDING } from '@/src/entities/building/hook'
import { GET_COMPONENTS } from '@/src/entities/component/hook'
import { componentImages } from '@/src/entities/component/model/components-list'
import BottomButton from '@/src/shared/ui/bottom-button'
import CloseButton from '@/src/shared/ui/close-button'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { useQuery } from '@apollo/client'
import { AddCircleIcon, ExclamationIcon, LibraryAddIcon } from '@shared/ui/icons'
import { Link, Stack, useFocusEffect, useLocalSearchParams } from 'expo-router'
import { useCallback, type ReactNode } from 'react'
import { FlatList, Image, View } from 'react-native'

export default function BuildingAssessmentPage(): ReactNode {
    const { buildingId, assessmentReportId } = useLocalSearchParams()

    const { data: buildingData, loading: buildingLoading } = useQuery(GET_BUILDING, {
        variables: { id: buildingId as string },
        fetchPolicy: 'network-only'
    })
    const buildingName = buildingData?.res?.name || ''

    const {
        refetch: refetchComponents,
        data: componentData,
        loading: componentLoading,
        error
    } = useQuery(GET_COMPONENTS, {
        variables: { buildingId: buildingId as string }
    })

    useFocusEffect(
        useCallback(() => {
            void refetchComponents()
        }, [refetchComponents])
    )

    if (componentLoading || buildingLoading) {
        return <Text>Loading...</Text>
    }

    if (error) {
        throw error
    }

    return (
        <View className="flex-1">
            <Stack.Screen
                options={{
                    headerTitle: () => <Text className="text-eva-black-300 text-xl">{buildingName}</Text>,
                    headerRight: () => <CloseButton />
                }}
            />
            <Header
                headerText="Building assessment"
                headerDescription="Add components with photos and audio description. We'll categorize them and generate a report for you!"
            />

            <View className="flex-row items-center justify-between">
                <Text className="font-bold text-lg">Components</Text>
                {componentData && componentData.res.length > 0 && (
                    <Link
                        href={`/buildings/${String(buildingId)}/assessments/${String(assessmentReportId)}/components/add-component`}
                        asChild
                    >
                        <Button
                            className="rounded-lg flex-row gap-2 items-center justify-center bg-eva-white-100 "
                            size="sm"
                        >
                            <LibraryAddIcon variant="solid" color="#111213" size={20}>
                                {' '}
                            </LibraryAddIcon>
                            <Text className="text-eva-black-900">Add a component</Text>
                        </Button>
                    </Link>
                )}
            </View>

            <View className="h-2/3 py-4">
                {componentData && componentData.res.length === 0 && (
                    <View className="flex flex-row justify-between items-center py-2 rounded-md bg-eva-white-100 h-[80px]  ">
                        <Link
                            href={`/buildings/${String(buildingId)}/assessments/${String(assessmentReportId)}/components/add-component`}
                            asChild
                        >
                            <Button variant="link" className=" flex flex-row gap-4 items-center justify-start ">
                                <View className="bg-eva-white-50 rounded-lg w-[64px] aspect-square flex items-center justify-center p-5">
                                    <AddCircleIcon color="#0251FF" variant="solid" />
                                </View>
                                <Text>Add a component</Text>
                            </Button>
                        </Link>
                    </View>
                )}

                <FlatList
                    className="flex flex-col"
                    contentContainerStyle={{ gap: 16 }}
                    data={componentData?.res}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View
                            className={
                                'flex flex-row justify-start gap-4 items-center p-2 rounded-xl bg-eva-white-100 h-[5rem]'
                            }
                        >
                            {/* <Image source={{ uri: item?.image }} className="w-10 h-10 mr-2" /> */}
                            <View className="flex flex-row gap-2 items-center justify-center overflow-hidden h-[4rem] aspect-square rounded-xl">
                                {item?.name && componentImages[item?.name] ? (
                                    <Image source={componentImages[item?.name]} className="object-cover" />
                                ) : (
                                    <View className="w-10 h-10 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                                        <ExclamationIcon color="#FFFFFF" width={20} height={20} fontVariant="normal" />
                                    </View>
                                )}
                            </View>
                            <Text className="font-bold">{item?.name}</Text>
                            {/* <ChevronIcon direction="right" className="absolute right-2"></ChevronIcon> */}
                        </View>
                    )}
                />
            </View>

            <Footer>
                <Link
                    href={`/buildings/${String(buildingId)}/assessments/${String(assessmentReportId)}/review`}
                    asChild
                    disabled={!componentData || componentData?.res.length === 0}
                >
                    <BottomButton>Confirm components</BottomButton>
                </Link>
            </Footer>
        </View>
    )
}
