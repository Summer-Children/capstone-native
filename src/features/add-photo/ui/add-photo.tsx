import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, FlatList, Alert } from 'react-native'
import { CameraView } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { Camera, CircleCheck, CircleX } from 'lucide-react-native'

interface AddPhotoProps {
    maxSelection: number
    onSelectPhotos: (photos: string[]) => void
}

export function AddPhoto({ maxSelection, onSelectPhotos }: AddPhotoProps): ReactNode {
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [photos, setPhotos] = useState<string[]>([])
    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([])
    const cameraRef = useRef<CameraView | null>(null)

    useEffect(() => {
        async function loadPhotos(): Promise<void> {
            try {
                if ((await MediaLibrary.requestPermissionsAsync()).granted) {
                    setPhotos(
                        (
                            await MediaLibrary.getAssetsAsync({
                                mediaType: 'photo',
                                sortBy: [['creationTime', false]],
                                first: 100
                            })
                        ).assets.map(asset => asset.uri)
                    )
                }
            } catch (error) {
                console.error('Failed to load photos:', error)
            }
        }
        void loadPhotos()
    }, [])

    const handleTakePhoto = async (): Promise<void> => {
        try {
            if (!cameraRef.current) return Alert.alert('Error', 'Camera ref is not available.')

            const photo = await cameraRef.current.takePictureAsync()
            if (!photo) return Alert.alert('Error', 'Failed to capture photo.')

            await MediaLibrary.saveToLibraryAsync(photo.uri)
            setPhotos(
                (
                    await MediaLibrary.getAssetsAsync({
                        mediaType: 'photo',
                        sortBy: [['creationTime', false]],
                        first: 100
                    })
                ).assets.map(asset => asset.uri)
            )
        } catch (error) {
            Alert.alert('Error', `Failed to capture photo: ${(error as Error).message}`)
            console.log('Photo captured:', photos)
        }
    }

    const handleToggleSelectPhoto = (uri: string): void => {
        setSelectedPhotos(prevSelectedPhotos => {
            let newSelectedPhotos
            if (prevSelectedPhotos.includes(uri)) {
                newSelectedPhotos = prevSelectedPhotos.filter(photo => photo !== uri)
            } else {
                if (prevSelectedPhotos.length >= maxSelection) {
                    Alert.alert(`Maximum ${maxSelection} photos allowed`)
                    return prevSelectedPhotos
                }
                newSelectedPhotos = [uri, ...prevSelectedPhotos]
            }
            onSelectPhotos(newSelectedPhotos)
            return newSelectedPhotos
        })
    }

    return (
        <View className="flex-1">
            {isCameraActive ? (
                <CameraView className="flex-1 w-full" ref={cameraRef} style={StyleSheet.absoluteFillObject}>
                    <TouchableOpacity className="absolute top-12 left-4" onPress={() => setIsCameraActive(false)}>
                        <CircleX color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="absolute bottom-10 self-center bg-black/50 p-4 rounded-full items-center"
                        onPress={handleTakePhoto}
                    >
                        <Text className="text-white font-bold text-2xl">Take Photo</Text>
                    </TouchableOpacity>
                </CameraView>
            ) : (
                <>
                    <View className="h-72 justify-center items-center">
                        {selectedPhotos.length === 0 ? (
                            <Text className="text-center text-2xl text-base-600 font-bold">
                                No photos yet.{'\n'}Select or take one!
                            </Text>
                        ) : (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
                                {selectedPhotos.map(uri => (
                                    <View
                                        key={uri}
                                        className="relative mr-2 w-[145] h-[220] rounded-xl overflow-hidden"
                                    >
                                        <Image source={{ uri }} className="w-full h-full" resizeMode="cover" />
                                        <TouchableOpacity
                                            className="absolute top-2 right-2"
                                            onPress={() => handleToggleSelectPhoto(uri)}
                                        >
                                            <CircleX color="#fff" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        )}
                    </View>

                    <FlatList
                        data={['camera', ...photos]}
                        keyExtractor={(_item, index) => index.toString()}
                        numColumns={4}
                        renderItem={({ item }) =>
                            item === 'camera' ? (
                                <TouchableOpacity
                                    onPress={() => setIsCameraActive(true)}
                                    className="w-1/4 aspect-square justify-center items-center bg-base-200 border border-white"
                                >
                                    <Camera color="#2D3648" size={24} />
                                    <Text className="text-base-800 font-bold text-base">Camera</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => handleToggleSelectPhoto(item)}
                                    className="w-1/4 aspect-square border border-white"
                                >
                                    <Image source={{ uri: item }} className="w-full h-full" resizeMode="cover" />
                                    {selectedPhotos.includes(item) && (
                                        <View className="absolute right-2 top-2">
                                            <CircleCheck color="#fff" />
                                        </View>
                                    )}
                                </TouchableOpacity>
                            )
                        }
                    />
                </>
            )}
        </View>
    )
}
