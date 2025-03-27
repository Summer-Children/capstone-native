import { View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ImageIcon } from 'lucide-react-native'
import { ReactNode, useState } from 'react'
import { GET_BUILDING } from '@/src/entities/building'
import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import BottomButton from '@/src/shared/ui/bottom-button'
import AssessmentCard from '@/src/entities/building/ui/assessment-card'
import { CREATE_ASSESSMENT_REPORT } from '@/src/entities/assessment-report/hook/assessment-report'
import { getBuildingImageUrl } from '@/src/entities/building/hook/get-building-image-url'
import { getReportExcelUrl, getReportPdfUrl } from '@/src/entities/assessment-report/hook'

export default function BuildingDetail(): ReactNode {
    const [loadFailed, setLoadFailed] = useState(false)
    const { buildingId } = useLocalSearchParams()
    const router = useRouter()
    const { data } = useQuery(GET_BUILDING, {
        variables: { id: buildingId as string },
        skip: !buildingId,
        fetchPolicy: 'network-only'
    })
    const [createAssessmentReport] = useMutation(CREATE_ASSESSMENT_REPORT)
    const building = data?.res
    if (!building) return <Text>No building found</Text>

    const imageUrl = getBuildingImageUrl(buildingId as string)

    const hasAssessment = building?.assessmentReports?.length > 0
    const isDraft = building?.assessmentReports?.some(report => report?.draft === true)

    const latestAssessmentReportId = building?.assessmentReports?.[0]?.id
    const pdfUrl = getReportPdfUrl(latestAssessmentReportId as string)
    const excelUrl = getReportExcelUrl(latestAssessmentReportId as string)

    const handleCreateAssessment = async (): Promise<void> => {
        if (!buildingId) return

        try {
            const { data } = await createAssessmentReport({
                variables: {
                    input: {
                        buildingId: buildingId as string,
                        draft: true
                    }
                }
            })

            const assessmentReportId = data?.createAssessmentReport?.id
            if (assessmentReportId) {
                router.push(`/buildings/${buildingId}/assessments/${assessmentReportId}/components`)
            }
        } catch (error) {
            console.error('Failed to create assessment report:', error)
        }
    }

    return (
        <>
            <Stack.Screen
                options={{
                    contentStyle: { paddingHorizontal: 0 },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => router.replace(`/buildings/${buildingId}/edit`)}
                            style={{
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8
                            }}
                        >
                            <Text className="text-eva-black-900 font-semibold">Edit building</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
                <View>
                    <View className="w-full h-64 bg-eva-white-200 flex items-center justify-center">
                        {!loadFailed ? (
                            <Image
                                source={{ uri: imageUrl }}
                                className="w-full h-full"
                                resizeMode="cover"
                                onError={() => setLoadFailed(true)}
                            />
                        ) : (
                            <ImageIcon color="#000" size={36} />
                        )}
                    </View>
                </View>

                <View className="flex mt-4 px-4">
                    <Text className="text-2xl font-semibold text-eva-black-900">{building.name}</Text>
                    <View className="flex">
                        <Text className="text-sm text-eva-black-300">{building.address}</Text>
                        <Text className="text-sm text-eva-black-300">Built in {building.year}</Text>
                    </View>
                    <Text className="text-sm text-eva-black-900 mt-2">Strata: {building.strataId}</Text>
                </View>

                {!hasAssessment && (
                    <View className="flex-1 justify-center px-4">
                        <Text className="text-2xl text-center font-semibold text-eva-black-200 px-14">
                            You haven’t performed an assessment yet
                        </Text>
                    </View>
                )}

                <BottomButton onPress={handleCreateAssessment} className="mx-4 mt-6">
                    <Text>Start assessment</Text>
                </BottomButton>

                {hasAssessment && !isDraft && (
                    <AssessmentCard
                        buildingId={String(buildingId)}
                        assessmentReportId={String(building.assessmentReports[0]?.id)}
                        year={building.fiscalYear ?? 0}
                        crfAnnualContribution={(building.crfAnnualContribution ?? 0).toLocaleString()}
                        crfBalance={(building.crfTotalBalance ?? 0).toLocaleString()}
                        crfMinBalance={(building.crfMinimumBalance ?? 0).toLocaleString()}
                        showReportFiles={true}
                        reportFiles={[
                            {
                                name: `${building.name}`,
                                type: 'pdf',
                                url: pdfUrl
                            },
                            {
                                name: `${building.name}`,
                                type: 'xlsx',
                                url: excelUrl
                            }
                        ]}
                    />
                )}
            </ScrollView>
        </>
    )
}
