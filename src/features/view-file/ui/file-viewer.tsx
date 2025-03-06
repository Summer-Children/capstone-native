import React, { useState, useEffect, ReactNode } from 'react'
import { Button, View, Alert } from 'react-native'
import RNFS from 'react-native-fs'
import { viewDocument } from '@react-native-documents/viewer'

interface FileViewerProps {
    fetchedFileUrl: string
    fileType: 'pdf' | 'excel'
    buttonText?: string
}

export default function FileViewer({ fetchedFileUrl, fileType, buttonText }: FileViewerProps): ReactNode {
    const [filePath, setFilePath] = useState<string | null>(null)

    const downloadFile = async (): Promise<void> => {
        const localFilePath = `${RNFS.DocumentDirectoryPath}/dummy.${fileType === 'pdf' ? 'pdf' : 'xlsx'}`

        try {
            const fileExists = await RNFS.exists(localFilePath)
            if (!fileExists) {
                const options = {
                    fromUrl: fetchedFileUrl,
                    toFile: localFilePath
                }
                await RNFS.downloadFile(options).promise
            }
            setFilePath(localFilePath)
        } catch {
            Alert.alert('Download Failed', 'Could not download the Excel file.')
        }
    }

    useEffect(() => {
        // todo: add proper cleanup on unmount
        void downloadFile()
    }, [])

    const handleOpenFile = async (): Promise<void> => {
        if (!filePath) {
            Alert.alert('No File Found', 'The file is not available. Please try again.')
            return
        }

        try {
            await viewDocument({
                uri: `file://${filePath}`,
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                presentationStyle: 'fullScreen'
            })
        } catch {
            Alert.alert('Error', 'Failed to open the file.')
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button title={buttonText || 'Open File'} onPress={handleOpenFile} />
        </View>
    )
}
