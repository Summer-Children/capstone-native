import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { ImageIcon } from 'lucide-react-native'
import { ReactNode, useState } from 'react'
import { GET_BUILDING } from '@/src/entities/building'
import { useMutation, useQuery } from '@apollo/client'
import React from 'react'
import { Button } from '@/reusables/components/ui/button'
import AssessmentCard from '@/src/entities/building/ui/assessment-card'
import { CREATE_ASSESSMENT_REPORT } from '@/src/entities/assessment-report/hook/assessment-report'
import { getBuildingImageUrl } from '@/src/entities/building/hook/getBuildingImageUrl'

export default function BuildingDetail(): ReactNode {
    const [loadFailed, setLoadFailed] = useState(false)
    // TODO: remove the urls when the backend is ready
    const pdfUrl =
        'https://evalo-s3-bucket-mdr.s3.us-west-1.amazonaws.com/assessment_reports/building_asset_inventory_6.pdf'
    const excelUrl = 'https://evalo-s3-bucket-mdr.s3.us-west-1.amazonaws.com/assessment/6/budget.xlsx'
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
                            onPress={() => router.push(`/buildings/${buildingId}/edit`)}
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8,
                                marginRight: 10
                            }}
                        >
                            <Text className="text-eva-black-900 font-bold">Edit building</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <ScrollView className="flex-1 bg-white" contentContainerStyle={{ flexGrow: 1 }}>
                {/* TODO: replace the element if it has coverimage */}
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
                    <Text className="text-2xl font-bold text-eva-black-900">{building.name}</Text>
                    <View className="flex">
                        <Text className="text-sm text-eva-black-300">{building.address}</Text>
                        <Text className="text-sm text-eva-black-300">Built in {building.year}</Text>
                    </View>
                    <Text className="text-sm text-eva-black-900 mt-2">Strata: {building.strataId}</Text>
                </View>

                {!hasAssessment && (
                    <View className="flex-1 justify-center px-4">
                        <Text className="text-2xl text-center font-semibold text-eva-black-200 px-14">
                            You haven’t perform an assessment yet
                        </Text>
                    </View>
                )}

                <Button
                    className="bg-eva-blue-500 rounded-xl items-center mx-4 my-6"
                    onPress={handleCreateAssessment}
                    disabled={hasAssessment && isDraft}
                >
                    <Text className="text-white font-bold">Start assessment</Text>
                </Button>

                {hasAssessment && isDraft && (
                    <AssessmentCard
                        buildingId={String(buildingId)}
                        assessmentReportId={String(building.assessmentReports[0]?.id)}
                        year={building.fiscalYear ?? 0}
                        crfAnnualContribution={(building.crfAnnualContribution ?? 0).toLocaleString()}
                        crfBalance={(building.crfTotalBalance ?? 0).toLocaleString()}
                        crfMinBalance={(building.crfMinimumBalance ?? 0).toLocaleString()}
                        showReportFiles={false}
                    />
                )}

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
                                name: 'Enter-File_name.pdf',
                                type: 'pdf',
                                url: pdfUrl
                            },
                            {
                                name: 'Enter-File_name.xls',
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
