import { View, TouchableOpacity, Image } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { Building as BuildingIcon } from 'lucide-react-native'
import { Building } from '../type/building-type'
import { ReactNode, useState } from 'react'
import { Badge } from '@/src/widgets/home'
import { getBuildingImageUrl } from '../hook/get-building-image-url'

interface BuildingCardProps {
    building: Building
    onPress: () => void
    hasShadow?: boolean
}

const getBuildingState = (building: Building): 'pending' | 'in progress' | 'complete' => {
    if (!building.assessmentReports || building.assessmentReports.length === 0) return 'pending'
    if (building.assessmentReports.some(report => report.draft)) return 'in progress'
    return 'complete'
}

export function BuildingCard({ building, onPress, hasShadow }: BuildingCardProps): ReactNode {
    const [loadFailed, setLoadFailed] = useState(false)
    const state = getBuildingState(building)
    const imageUrl = getBuildingImageUrl(building.id)

    return (
        <TouchableOpacity
            onPress={onPress}
            className={`bg-white rounded-[20px] mb-4 items-center ${hasShadow ? 'shadow-home-card' : ''}`}
        >
            <View className="w-full flex-row gap-2 p-2">
                <View className="w-1/4 h-28 flex items-center justify-center rounded-xl bg-eva-white-200">
                    {!loadFailed && imageUrl ? (
                        <Image
                            source={{ uri: imageUrl }}
                            className="w-full h-full rounded-xl"
                            resizeMode="cover"
                            onError={() => setLoadFailed(true)}
                        />
                    ) : (
                        <BuildingIcon color="#000" size={24} />
                    )}
                </View>

                <View className="flex-1 p-2 justify-center">
                    <Text className="font-semibold text-eva-black-900 text-base">{building.name}</Text>
                    <Text
                        className="text-sm text-eva-black-300 mb-3"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ maxWidth: '95%' }}
                    >
                        {building.address}
                    </Text>
                    <View className="flex-row items-center justify-between">
                        <Text className="text-sm text-eva-black-300">Strata: {building.strataId}</Text>
                        <Badge state={state} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export { getBuildingState }
