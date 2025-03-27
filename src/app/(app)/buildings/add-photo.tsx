import { AddPhoto } from '@/src/features/add-photo/ui'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ReactNode } from 'react'
import { convertCameraPictureToFile, convertMediaAssetToFile } from '@/src/shared/lib/file-converter/file-converter'

export default function AddBuildingPhoto(): ReactNode {
    const router = useRouter()
    const { source, buildingId } = useLocalSearchParams()

    return (
        <AddPhoto
            maxSelection={1}
            onSelectPhotos={async photos => {
                const selected = photos[0]
                if (!selected || !selected.uri) return
                let file
                if ('mediaSubtypes' in selected) {
                    file = await convertMediaAssetToFile(selected)
                } else {
                    file = convertCameraPictureToFile(selected)
                }

                router.navigate({
                    pathname: source === 'edit' && buildingId ? `../buildings/${buildingId}/edit` : `/buildings/new`,
                    params: {
                        coverImage: file.uri,
                        fileName: file.name,
                        fileType: file.type
                    }
                })
            }}
        />
    )
}
