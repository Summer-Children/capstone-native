import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { Marker } from 'react-native-maps'

interface MapMarkerProps {
    building: { id: string; name: string }
    coordinate: { latitude: number; longitude: number }
    onPress: (id: string) => void
    isSelected: boolean
    color: string
}

export function MapMarker({ building, coordinate, onPress, isSelected, color }: MapMarkerProps): ReactNode {
    return (
        <Marker coordinate={coordinate} onPress={() => onPress(building.id)}>
            <View className={`flex items-center shadow-sm ${isSelected ? 'z-20' : 'z-10'}`}>
                <View
                    className={`flex-row items-center ${isSelected ? 'px-4 py-2' : 'px-3 py-1'} rounded-full bg-white`}
                >
                    <View
                        className="w-3 h-3 border border-eva-white-50 rounded-full mr-1.5"
                        style={{ backgroundColor: color }}
                    />

                    <Text
                        className={`text-xs font-semibold ${isSelected ? 'text-eva-black-900 font-bold text-sm' : 'text-eva-black-300'}`}
                    >
                        {building.name}
                    </Text>
                </View>
                <View className="w-0 h-0 -mt-0.5 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
            </View>
        </Marker>
    )
}
