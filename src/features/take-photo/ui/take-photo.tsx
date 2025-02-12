import React, { useState, useRef, ReactNode } from 'react'
import { CameraView } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert, Modal } from 'react-native'

export function TakePhoto(): ReactNode {
    const [isCameraActive, setIsCameraActive] = useState(false)
    const cameraRef = useRef<CameraView | null>(null)

    const takePhoto = async (): Promise<void> => {
        try {
            if (cameraRef.current) {
                const photo = await cameraRef.current.takePictureAsync()
                if (!photo) {
                    Alert.alert('Error', 'Failed to capture photo.')
                    return
                }
                await MediaLibrary.saveToLibraryAsync(photo.uri)
            }
        } catch (error) {
            Alert.alert('Error', `Failed to capture photo: ${(error as Error).message}`)
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Open Camera" onPress={() => setIsCameraActive(true)} />
            <Modal visible={isCameraActive} animationType="slide" transparent={false}>
                <View style={styles.cameraContainer}>
                    <CameraView ref={cameraRef} />
                    <TouchableOpacity style={styles.returnButton} onPress={() => setIsCameraActive(false)}>
                        <Text style={styles.buttonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shutterButton} onPress={takePhoto}>
                        <View style={styles.shutterButtonInner} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraContainer: {
        flex: 1
    },
    shutterButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: '#D2D4D9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    shutterButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 35,
        backgroundColor: '#D2D4D9'
    },
    returnButton: {
        position: 'absolute',
        top: 80,
        left: 20,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
})
