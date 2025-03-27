import React, { ReactNode } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import ReportList from '@/src/entities/report/ui/report-list'
import { useShareFile } from '@/src/features/share-report/lib/use-share-file'
import { ShareIcon } from '@/src/shared/ui/icons/share'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import Header from '@/src/shared/ui/header'
import Footer from '@/src/shared/ui/footer'

const ReportPage = (): ReactNode => {
    const { pdfUrl, excelUrl } = useLocalSearchParams()
    const pdfUrlString = Array.isArray(pdfUrl) ? pdfUrl[0] : pdfUrl || ''
    const excelUrlString = Array.isArray(excelUrl) ? excelUrl[0] : excelUrl || ''
    const { shareMultipleFiles } = useShareFile()
    const handleBulkAction = async (): Promise<void> => {
        await shareMultipleFiles([pdfUrl, excelUrl].filter(url => url) as string[])
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerBackVisible: false,
                    headerLeft: () => null,
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.replace('/buildings/archive-list')}>
                            <Text className="text-xl text-eva-blue-500">Cancle</Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <View className="flex-1 gap-6">
                <Header
                    headerText="Final Report"
                    headerDescription="Report is ready. Preview, download or share it now!"
                />
                <ReportList pdfUrl={pdfUrlString} excelUrl={excelUrlString} />
                <Footer>
                    <TouchableOpacity
                        onPress={handleBulkAction}
                        className="flex-row gap-3 items-center justify-center bg-eva-blue-500 py-4 rounded-xl"
                    >
                        <ShareIcon color="white" />
                        <Text className="text-white font-semibold">Share / Download all files</Text>
                    </TouchableOpacity>
                </Footer>
            </View>
        </>
    )
}

export default ReportPage
