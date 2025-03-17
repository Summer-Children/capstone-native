import { View, Text, TouchableOpacity } from 'react-native'
import { Building as BuildingIcon } from 'lucide-react-native'
import { Building } from '../type/building-type'
import { ReactNode } from 'react'

interface PendingCardProps {
    building: Building
    onPress: () => void
    isSelected: boolean
}

export function PendingCard({ building, onPress, isSelected }: PendingCardProps): ReactNode {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`border bg-white rounded-2xl items-center mb-4 overflow-hidden p-2 ${
                isSelected ? 'border-base-400' : 'border-base-200'
            }`}
        >
            <View className="w-full flex-row gap-2">
                <View className="w-1/4 h-28 bg-base-200 flex items-center justify-center rounded-lg">
                    <BuildingIcon color="#000" size={24} />
                </View>

                <View className="flex w-full p-2 items-start justify-center">
                    <Text className="font-semibold text-base-800">{building.name}</Text>
                    <Text
                        className="text-sm text-base-700 mb-3"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ maxWidth: '75%' }}
                    >
                        {building.address}
                    </Text>
                    <Text className="text-sm text-base-800">Strata: {building.strataId}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
