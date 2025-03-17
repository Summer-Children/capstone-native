import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Download, FileText, ImageIcon, ChevronDown } from 'lucide-react-native'
import { ReactNode } from 'react'
import { GET_BUILDING } from '@/src/entities/building'
import { useQuery } from '@apollo/client'
import React from 'react'

export default function BuildingDetail(): ReactNode {
    const { buildingId } = useLocalSearchParams()
    const router = useRouter()
    const { data } = useQuery(GET_BUILDING, {
        variables: { id: buildingId as string },
        skip: !buildingId,
        fetchPolicy: 'network-only'
    })
    console.log({ data })

    const building = data?.res

    if (!building) return <Text>No building found</Text>

    const hasAssessment = building?.assessmentReports?.length > 0
    const isDraft = building?.assessmentReports?.some(report => report?.draft === true)

    console.log({ hasAssessment, isDraft })

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTransparent: true,
                    headerTintColor: '#2D3648',
                    contentStyle: { paddingHorizontal: 0 },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.push(`./edit`)}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8,
                                marginRight: 10
                            }}
                        >
                            <Text className="text-base-800 font-bold">Edit building</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <ScrollView>
                <View className="relative">
                    <View className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <ImageIcon color="#000" size={36} />
                    </View>
                </View>

                <View className="flex mt-6 px-4">
                    <Text className="text-2xl font-bold text-base-800">{building.name}</Text>
                    <Text className="text-sm text-base-600">{building.address}</Text>
                    <View className="flex flex-row justify-between">
                        <Text className="text-base text-base-800">Strata: {building.strataId}</Text>
                        <Text className="text-base text-base-800">Construction year: {building.year}</Text>
                    </View>
                </View>

                {!hasAssessment && (
                    // TODO: create new assessment report when route handler
                    <TouchableOpacity
                        onPress={() => router.push(`../assessments/new`)}
                        className="flex items-center py-3 mx-4 mt-8 rounded-full bg-base-200"
                    >
                        <Text className="text-base-800 font-bold">Start assessment</Text>
                    </TouchableOpacity>
                )}

                {hasAssessment && !isDraft && (
                    <>
                        <Text className="px-4 mt-4 text-base text-base-600">
                            You haven’t perform an assessment yet.
                        </Text>
                        <TouchableOpacity className="flex items-center py-3 mx-4 mt-4 rounded-full bg-base-200">
                            <Text className="text-base-800 font-bold">Start assessment</Text>
                        </TouchableOpacity>
                    </>
                )}
                {hasAssessment && isDraft && (
                    <TouchableOpacity className="flex flex-row justify-between items-center py-4 mx-4 mt-4 border-gray-300">
                        <Text className="text-lg font-bold text-base-600">Assessment</Text>
                        <View className="flex flex-row items-center gap-2">
                            <Text className="text-lg font-bold text-base-800">2025</Text>
                            <ChevronDown size={20} color="#2D3648" />
                        </View>
                    </TouchableOpacity>
                )}
                {hasAssessment && isDraft && (
                    <View className="p-4 border border-base-200 rounded-xl mx-4">
                        <Text className="text-lg font-bold text-base-600 mb-3">Financial information</Text>
                        <View className="flex flex-col gap-2 border-b border-base-200 pb-4">
                            <View className="flex flex-row justify-between">
                                <Text className="text-base text-base-800">CRF Annual Contribution</Text>
                                <Text className="text-base font-bold text-base-800">65,162</Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-base text-base-800">Total CRF Balance</Text>
                                <Text className="text-base font-bold text-base-800">159,014.48</Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-base text-base-800">CRF Minimum Balance</Text>
                                <Text className="text-base font-bold text-base-800">10,000</Text>
                            </View>
                        </View>

                        <Text className="text-lg font-bold text-base-600 mt-4">Report files</Text>
                        <View className="flex gap-3 mt-2">
                            <View className="flex flex-row items-center justify-between p-3">
                                <View className="flex flex-row items-center gap-3">
                                    <FileText size={24} color="#2D3648" />
                                    <View>
                                        <Text className="text-base text-base-800">Langara College_BAI.pdf</Text>
                                        <Text className="text-xs text-base-600">8.3MB · 2025-01-16</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <Download size={20} color="#2D3648" />
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center justify-between p-3">
                                <View className="flex flex-row items-center gap-3">
                                    <FileText size={24} color="#2D3648" />
                                    <View>
                                        <Text className="text-base text-base-800">Langara College_DPR.xls</Text>
                                        <Text className="text-xs text-base-600">9.3MB · 2025-01-16</Text>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <Download size={20} color="#2D3648" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity className="flex items-center py-3 mt-6 rounded-full bg-base-200">
                            <Text className="text-base-800 font-bold">Review assessment</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </>
    )
}
