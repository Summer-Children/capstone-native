import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { useShareFile } from '@/src/features/share-report/lib/use-share-file'
import FileViewer from '@/src/features/view-file/ui/file-viewer'
import { PdfIcon } from '@/src/shared/ui/icons/pdf'
import { XlsIcon } from '@/src/shared/ui/icons/xls'
import { ShareIcon } from '@/src/shared/ui/icons/share'

interface ReportCardProps {
    title: string
    fileType: 'pdf' | 'excel'
    fileSize: string
    date: string
    fileUrl: string
}

const ReportCard: React.FC<ReportCardProps> = ({ title, fileType, fileSize, date, fileUrl }) => {
    const { shareFile } = useShareFile()
    const [showFileViewer, setShowFileViewer] = useState(false)
    const IconComponent = fileType === 'pdf' ? PdfIcon : XlsIcon
    const cardTitle = fileType === 'pdf' ? 'Building Assessment Inventory' : 'Depreciation Report'

    const handleQuickView = (): void => {
        setShowFileViewer(true)
    }

    const handleShare = (): void => {
        shareFile(fileUrl, fileType).catch(() => {
            Alert.alert('Error')
        })
    }

    return (
        <View className="bg-white rounded-lg p-4 mb-6 flex-1 gap-6 border border-base-200">
            <Text>{cardTitle}</Text>
            <View className="flex-row items-start gap-4">
                <IconComponent />
                <View className="flex-1 gap-1">
                    <Text>{title}</Text>
                    <Text className="text-base-600 text-sm">
                        {fileSize} · {date}
                    </Text>
                    <TouchableOpacity onPress={handleQuickView}>
                        <Text className="font-bold text-sm">Quick View</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={handleShare}
                className="flex-row items-center justify-center gap-2 bg-base-200 rounded-full py-2"
            >
                <ShareIcon color="#2D3648" />
                <Text className="text-base-800 font-bold text-sm">Share / Download</Text>
            </TouchableOpacity>

            {showFileViewer && <FileViewer fetchedFileUrl={fileUrl} fileType={fileType} />}
        </View>
    )
}

export default ReportCard
