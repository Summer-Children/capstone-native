import RNFS from 'react-native-fs'
import Share from 'react-native-share'
import Toast from 'react-native-toast-message'

type FileType = 'pdf' | 'xlsx'

interface ShareResult {
    success: boolean
    message?: string
}

interface UseShareFileReturn {
    shareFile: (fileUrl: string, fileType: FileType) => Promise<boolean>
    shareMultipleFiles: (fileUrls: string[]) => Promise<boolean>
}

export const useShareFile = (): UseShareFileReturn => {
    const checkAndDownloadFile = async (fileUrl: string, fileType: FileType): Promise<string> => {
        const localFilePath = `${RNFS.DocumentDirectoryPath}/cached-file.${fileType === 'pdf' ? 'pdf' : 'xlsx'}`
        const fileExists = await RNFS.exists(localFilePath)

        if (!fileExists) {
            await RNFS.downloadFile({
                fromUrl: fileUrl,
                toFile: localFilePath
            }).promise
        }
        return localFilePath
    }

    const handleToast = (result: ShareResult, fileType: FileType): void => {
        if (result.success && result.message) {
            if (result.message.includes('mailto')) {
                Toast.show({
                    type: 'success',
                    text1: 'Successfully Sent via Mail!',
                    text2: 'Your report has been sent via Mail.',
                    visibilityTime: 3000,
                    position: 'bottom'
                })
            } else if ((fileType === 'pdf' || fileType === 'xlsx') && result.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Saved to Files!',
                    text2: 'Your report has been saved locally.',
                    visibilityTime: 3000,
                    position: 'bottom'
                })
            } else {
                Toast.show({
                    type: 'success',
                    text1: 'Successfully Shared!',
                    text2: 'Your report has been shared.',
                    visibilityTime: 3000,
                    position: 'bottom'
                })
            }
        }
    }

    const shareFile = async (fileUrl: string, fileType: 'pdf' | 'xlsx'): Promise<boolean> => {
        try {
            const localFilePath = await checkAndDownloadFile(fileUrl, fileType)

            const shareOptions = {
                title: 'Share report',
                url: `file://${localFilePath}`,
                type:
                    fileType === 'pdf'
                        ? 'application/pdf'
                        : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }

            const result = await Share.open(shareOptions)
            handleToast(result, fileType)
            return true
        } catch {
            return false
        }
    }

    const shareMultipleFiles = async (fileUrls: string[]): Promise<boolean> => {
        try {
            const localFilePaths = await Promise.all(
                fileUrls.map(async url => {
                    const fileType = url.endsWith('pdf') ? 'pdf' : 'xlsx'
                    return await checkAndDownloadFile(url, fileType)
                })
            )
            const shareOptions = {
                title: 'Share multiple reports',
                urls: localFilePaths.map(filePath => `file://${filePath}`)
            }
            const result = await Share.open(shareOptions)
            const firstFileType = fileUrls[0].endsWith('pdf') ? 'pdf' : 'xlsx'
            handleToast(result, firstFileType)
            return true
        } catch {
            return false
        }
    }

    return { shareFile, shareMultipleFiles }
}
