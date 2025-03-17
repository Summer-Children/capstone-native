import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ReportList from '@/src/entities/report/ui/report-list'
import { useShareFile } from '@/src/features/share-report/lib/use-share-file'
import { useFetchReports } from '@/src/entities/report/api/use-fetch-reports'
import { X } from 'lucide-react-native'
import { ShareIcon } from '@/src/shared/ui/icons/share'
import { router, Stack } from 'expo-router'
import Header from '@/src/shared/ui/header'

const ReportPage = (): ReactNode => {
    const { reports } = useFetchReports()
    const { shareMultipleFiles } = useShareFile()
    const handleBulkAction = async (): Promise<void> => {
        const fileUrls = reports.map(report => report.fileUrl)
        await shareMultipleFiles(fileUrls)
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: true,
                    headerTitle: '',
                    headerBackVisible: false,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push('/building/detail/1')} className="mr-4">
                            <X size={24} color="#2D3648" />
                        </TouchableOpacity>
                    )
                }}
            />
            <View className="flex-1">
                <Header headerText="Report" headerDescription="Your report is ready! Share or view it now!" />
                <ReportList />
                <TouchableOpacity
                    onPress={handleBulkAction}
                    className="flex-row gap-2 items-center justify-center bg-base-800 py-4 rounded-md"
                >
                    <ShareIcon color="white" />
                    <Text className="text-white font-bold">Share / Download all files</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ReportPage
