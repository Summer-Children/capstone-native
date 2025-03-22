import { AddPhoto } from '@/src/features/add-photo/ui'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ReactNode } from 'react'

export default function AddBuildingPhoto(): ReactNode {
    const router = useRouter()
    const { source, buildingId } = useLocalSearchParams()

    return (
        <AddPhoto
            maxSelection={1}
            onSelectPhotos={photos => {
                const selected = photos[0]
                if (selected?.uri) {
                    router.navigate({
                        pathname:
                            source === 'edit' && buildingId ? `../buildings/${buildingId}/edit` : `/buildings/new`,
                        params: { coverImage: selected.uri }
                    })
                }
            }}
        />
    )
}
