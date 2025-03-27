import { useEffect, ReactNode, useRef, useState } from 'react'
import { Alert } from 'react-native'
import RNFS from 'react-native-fs'
import { viewDocument } from '@react-native-documents/viewer'

interface FileViewerProps {
    fileUrl: string
    fileType: 'pdf' | 'xlsx'
    fileName: string
    triggerOpen: boolean
}

export default function FileViewer({ fileUrl, fileType, fileName, triggerOpen }: FileViewerProps): ReactNode {
    const isMounted = useRef(true)
    const [localFilePath, setLocalFilePath] = useState<string | null>(null)
    useEffect(() => {
        isMounted.current = true
        const tempFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}.${fileType}`

        const downloadFile = async (): Promise<void> => {
            try {
                const fileExists = await RNFS.exists(tempFilePath)
                if (!fileExists) {
                    await RNFS.downloadFile({ fromUrl: fileUrl, toFile: tempFilePath }).promise
                }

                if (isMounted.current) {
                    setLocalFilePath(tempFilePath)
                }
            } catch {
                if (isMounted.current) {
                    Alert.alert('Download Failed', 'Could not download the file.')
                }
            }
        }

        void downloadFile()

        return (): void => {
            isMounted.current = false
            RNFS.unlink(tempFilePath).catch(err => console.error('File deletion failed:', err))
        }
    }, [fileUrl])

    useEffect(() => {
        if (localFilePath) {
            void viewDocument({
                uri: `file://${localFilePath}`,
                mimeType:
                    fileType === 'pdf'
                        ? 'application/pdf'
                        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                presentationStyle: 'fullScreen'
            })
        }
    }, [triggerOpen, localFilePath])

    return null
}
