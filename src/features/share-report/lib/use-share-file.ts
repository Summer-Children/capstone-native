import RNFS from 'react-native-fs'
import Share from 'react-native-share'

type FileType = 'pdf' | 'xlsx'

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
            await Share.open(shareOptions)
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
            await Share.open(shareOptions)
            return true
        } catch {
            return false
        }
    }

    return { shareFile, shareMultipleFiles }
}
