import { Button } from '@/reusables/components/ui/button'
import { AddPhoto } from '@/src/features/add-photo/ui'
import Header from '@/src/shared/ui/header'
import CloseButton from '@/src/shared/ui/close-button'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import React, { ReactNode, useState } from 'react'
import { Text } from 'reusables/components/ui/text'
import { GET_COMPONENT_REPORT, useUpdateComponentReport } from '@/src/entities/component-report/hook/component-report'
import { useQuery } from '@apollo/client'
import * as MediaLibrary from 'expo-media-library'
import { ComponentReportPriority } from '@/src/_gqlgen/graphql'
import { convertMediaAssetToFile, convertCameraPictureToFile } from '@/src/shared/lib/file-converter/file-converter'
import { CameraCapturedPicture } from 'expo-camera'

export default function AddPhotosPage(): ReactNode {
    const { componentReportId } = useLocalSearchParams()
    const router = useRouter()
    const [selectedPhotos, setSelectedPhotos] = useState<Array<MediaLibrary.Asset>>([])
    const { updateComponentReportMutation } = useUpdateComponentReport()
    const {
        data: componentReportData,
        loading,
        error
    } = useQuery(GET_COMPONENT_REPORT, {
        variables: {
            componentReportId: componentReportId.toString()
        }
    })

    const onSelectPhotos = async (photos: Array<MediaLibrary.Asset | CameraCapturedPicture> | null): Promise<void> => {
        if (!photos || photos.length === 0) return
        if ('mediaSubtypes' in photos[0]) {
            const files = await Promise.all(photos.map(photo => convertMediaAssetToFile(photo as MediaLibrary.Asset)))
            setSelectedPhotos(files)
        } else {
            const files = await Promise.all(
                photos.map(photo => convertCameraPictureToFile(photo as CameraCapturedPicture))
            )
            setSelectedPhotos(files)
        }
    }

    const handleContinue = async (): Promise<void> => {
        try {
            await updateComponentReportMutation({
                id: componentReportData?.componentReport?.id.toString() || '',
                action: componentReportData?.componentReport?.action || '',
                note: componentReportData?.componentReport?.note || '',
                priority: componentReportData?.componentReport?.priority || ComponentReportPriority.Low,
                quantityNeeded: componentReportData?.componentReport?.quantityNeeded || 0,
                yearReviewed: componentReportData?.componentReport?.yearReviewed || 0,
                condition: componentReportData?.componentReport?.condition || 'good',
                images: selectedPhotos,
                removeImages: []
            })
            router.push(`./update-action`)
        } catch (error) {
            console.error('Error saving photos:', error)
        }
    }

    if (loading) return <Text>loading</Text>
    if (error) return <Text>error</Text>
    return (
        <>
            <Stack.Screen options={{ headerRight: () => <CloseButton /> }} />
            <Header headerText="Add Component Photos"></Header>
            <AddPhoto maxSelection={5} onSelectPhotos={onSelectPhotos} />

            <Button onPress={handleContinue}>
                <Text>Continue</Text>
            </Button>
        </>
    )
}
