import { CircleX } from 'lucide-react-native'
import { TouchableOpacity, ScrollView, View, Image } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import type { ReactNode } from 'react'
type CameraScrollHorizontalProps = {
    selectedPhotos: MediaLibrary.Asset[]
    handleToggleSelectPhoto: (asset: MediaLibrary.Asset) => void
}

const CameraScrollHorizontal = ({
    selectedPhotos,
    handleToggleSelectPhoto
}: CameraScrollHorizontalProps): ReactNode => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
            {selectedPhotos.map(asset => (
                <View key={asset.uri} className="relative mr-2 w-[145] h-[220] rounded-xl overflow-hidden">
                    <Image source={{ uri: asset.uri }} className="w-full h-full" resizeMode="cover" />
                    <TouchableOpacity className="absolute top-2 right-2" onPress={() => handleToggleSelectPhoto(asset)}>
                        <CircleX color="#fff" />
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )
}

export default CameraScrollHorizontal
