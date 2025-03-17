import { View, Text, TouchableOpacity } from 'react-native'
import { Building } from 'lucide-react-native'
import { ReactNode } from 'react'

interface BuildingCardProps {
    building: {
        id: string
        name?: string
        address?: string
        year?: number | null
        strataId?: string | null
        assessmentReports?: Array<{ id: string; draft: boolean }> | null
    }
    onPress: () => void
}
export function BuildingCard({ building, onPress }: BuildingCardProps): ReactNode {
    return (
        <TouchableOpacity onPress={onPress} className="border border-base-200 rounded-xl p-2 items-center mb-4">
            <View className="w-full flex gap-2">
                <View className="w-full h-24 rounded-md bg-base-200 flex items-center justify-center">
                    <Building color="#000" size={24} />
                </View>

                <View className="flex w-full items-start">
                    <Text className="text-sm font-semibold text-base-800">{building.name}</Text>
                    <Text className="text-xs text-base-800">{building.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
