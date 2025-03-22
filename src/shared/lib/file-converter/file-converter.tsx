import * as MediaLibrary from 'expo-media-library'
import { ReactNativeFile } from 'apollo-upload-client'
import { CameraCapturedPicture } from 'expo-camera'

const convertMediaAssetToFile = async (asset: MediaLibrary.Asset): Promise<ReactNativeFile> => {
    const assetInfo = await MediaLibrary.getAssetInfoAsync(asset)
    return new ReactNativeFile({
        uri: assetInfo.localUri,
        name: assetInfo.filename,
        type: assetInfo.mediaType
    })
}

const convertCameraPictureToFile = (picture: CameraCapturedPicture): ReactNativeFile => {
    const filename = picture.uri.split('/').pop() || `photo_${Date.now()}.jpg`
    return new ReactNativeFile({
        uri: picture.uri,
        name: filename,
        type: 'image/jpeg'
    })
}

export { convertMediaAssetToFile, convertCameraPictureToFile }
