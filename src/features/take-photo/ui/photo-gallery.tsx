import React, { ReactNode, useEffect, useState } from 'react'
import { View, FlatList, Image, StyleSheet } from 'react-native'
import * as MediaLibrary from 'expo-media-library'

export function PhotoGallery(): ReactNode {
    const [photos, setPhotos] = useState<string[]>([])
    const loadPhotos = async (): Promise<void> => {
        try {
            const { assets } = await MediaLibrary.getAssetsAsync({
                first: 30,
                mediaType: 'photo'
            })

            const paths = await Promise.all(
                assets.map(async asset => {
                    const assetInfo = await MediaLibrary.getAssetInfoAsync(asset)
                    return assetInfo.localUri || asset.uri
                })
            )
            setPhotos(paths)
        } catch (error) {
            console.error('Failed to load photos:', error)
        }
    }

    useEffect(() => {
        void loadPhotos()
        const subscription = MediaLibrary.addListener(() => {
            void loadPhotos()
        })

        return (): void => {
            subscription.remove()
        }
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={photos}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => <Image source={{ uri: item }} style={styles.image} />}
                numColumns={3}
                contentContainerStyle={styles.gallery}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    gallery: {
        marginTop: 20
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
        borderRadius: 10
    }
})
