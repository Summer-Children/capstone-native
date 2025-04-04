import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { PdfIcon, XlsIcon, ShareIcon } from '@/src/shared/ui/icons'
import { useShareFile } from '@/src/features/share-report/lib/use-share-file'

type ReportItemProps = {
    title: string
    fileType: 'pdf' | 'xlsx'
    fileUrl: string
    onPreview: () => void
}

const ReportItem: React.FC<ReportItemProps> = ({ title, fileType, fileUrl, onPreview }) => {
    const { shareFile } = useShareFile()
    const IconComponent = fileType === 'pdf' ? PdfIcon : XlsIcon

    const handleShare = (): void => {
        shareFile(fileUrl, fileType).catch(() => {
            console.error('Failed to share the file.')
        })
    }

    return (
        <View className="bg-white rounded-2xl py-5 px-4 mb-6 flex-1 gap-6 border border-eva-white-300">
            <Text className="font-semibold text-eva-black-900">{title}</Text>
            <View className="flex-row items-center justify-between gap-4">
                <View className="flex flex-row items-center gap-3">
                    <IconComponent />
                    <Text className="font-semibold text-eva-black-900">{title}</Text>
                </View>
                <TouchableOpacity className="bg-eva-white-100 rounded-full py-2 px-4" onPress={onPreview}>
                    <Text className="font-semibold text-sm">Preview</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={handleShare}
                className="flex-row items-center justify-center gap-2 bg-eva-white-100 rounded-full py-2"
            >
                <ShareIcon size={16} color="#1C1D1F" />
                <Text className="text-eva-black-900 font-semibold text-sm">Share file</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReportItem
