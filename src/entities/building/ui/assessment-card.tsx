import { View, Text, TouchableOpacity } from 'react-native'
import { PdfIcon, XlsIcon, ChevronIcon, AssignmentIcon } from '@/src/shared/ui'
import { ActionButton } from '@/src/widgets/home'
import { ReactNode, useState } from 'react'
import { useRouter } from 'expo-router'
import FileViewer from '@/src/features/view-file/ui/file-viewer'

type ReportFile = {
    name: string
    type: 'pdf' | 'xlsx'
    url: string
}

type AssessmentCardProps = {
    year: number
    crfAnnualContribution: string
    crfBalance: string
    crfMinBalance: string
    showReportFiles?: boolean
    reportFiles?: ReportFile[]
    buildingId: string
    assessmentReportId: string
}

export default function AssessmentCard({
    year,
    crfAnnualContribution,
    crfBalance,
    crfMinBalance,
    showReportFiles = false,
    reportFiles = [],
    buildingId,
    assessmentReportId
}: AssessmentCardProps): ReactNode {
    const router = useRouter()
    const [selectedFile, setSelectedFile] = useState<{ url: string; type: 'pdf' | 'xlsx' } | null>(null)
    const [triggerOpen, setTriggerOpen] = useState(false)

    const handlePreview = (fileUrl: string, fileType: 'pdf' | 'xlsx'): void => {
        setSelectedFile({ url: fileUrl, type: fileType.toLowerCase() as 'pdf' | 'xlsx' })
        setTriggerOpen(prev => !prev)
    }
    return (
        <>
            <View className="mx-4 py-5 flex flex-row justify-between items-center border-t border-eva-white-200">
                <Text className="font-semibold text-eva-black-50">Assessment</Text>
                <View className="flex flex-row items-center gap-1">
                    <Text className="text-eva-black-500">{year}</Text>
                    <ChevronIcon direction="down" color="#5D6368" />
                </View>
            </View>

            <View className="px-4 py-5 border border-eva-white-200 rounded-xl mx-4 bg-white">
                <View className="mb-5">
                    <Text className="font-semibold text-eva-black-950 mb-3">Financial information</Text>
                    <View className="flex flex-col gap-2">
                        <View className="flex flex-row justify-between">
                            <Text className="text-eva-black-500">CRF Annual Contribution</Text>
                            <Text className="font-semibold text-eva-black-950">{crfAnnualContribution}</Text>
                        </View>
                        <View className="flex flex-row justify-between">
                            <Text className="text-eva-black-500">Total CRF Balance</Text>
                            <Text className="font-semibold text-eva-black-950">{crfBalance}</Text>
                        </View>
                        <View className="flex flex-row justify-between">
                            <Text className="text-eva-black-500">CRF Minimum Balance</Text>
                            <Text className="font-semibold text-eva-black-950">{crfMinBalance}</Text>
                        </View>
                    </View>
                </View>

                {showReportFiles && reportFiles.length > 0 && (
                    <View className="mb-5 pt-4 border-t border-eva-white-200">
                        <Text className="font-semibold text-eva-black-950">Report files</Text>
                        <View className="flex gap-4 mt-2">
                            {reportFiles.map(file => (
                                <View key={file.url} className="flex flex-row items-center justify-between py-3">
                                    <View className="flex flex-row items-center gap-3">
                                        {file.type === 'pdf' ? <PdfIcon /> : <XlsIcon />}
                                        <Text className="text-eva-black-950 font-semibold">{file.name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        className="bg-gray-100 px-4 py-3 rounded-full"
                                        onPress={() => handlePreview(file.url, file.type)}
                                    >
                                        <Text className="text-eva-black-900 font-semibold">Preview</Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                <ActionButton
                    label="Review assessment"
                    icon={<AssignmentIcon size={20} variant="solid" color="#1C1D1F" />}
                    onPress={() => router.push(`/buildings/${buildingId}/assessments/${assessmentReportId}/review`)}
                />
            </View>

            {selectedFile && (
                <FileViewer fileUrl={selectedFile.url} fileType={selectedFile.type} triggerOpen={triggerOpen} />
            )}
        </>
    )
}
