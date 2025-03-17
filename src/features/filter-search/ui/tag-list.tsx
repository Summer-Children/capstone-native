import React, { ReactNode } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { X } from 'lucide-react-native'

interface TagListProps {
    filters: { year: string; location: string }
    setFilters: (filters: { year: string; location: string }) => void
}

export const TagList = ({ filters, setFilters }: TagListProps): ReactNode => {
    const { year, location } = filters

    const removeTag = (key: keyof typeof filters): void => {
        setFilters({ ...filters, [key]: '' })
    }

    return (
        <View className="py-4">
            <View className="flex-row flex-wrap gap-2 mb-2">
                {year && (
                    <View className="flex-row items-center border border-black rounded-full px-3 py-1">
                        <Text className="text-base-800 mr-3">{year}</Text>
                        <TouchableOpacity onPress={() => removeTag('year')}>
                            <X size={14} color="#2D3648" />
                        </TouchableOpacity>
                    </View>
                )}

                {location && (
                    <View className="flex-row items-center border border-black rounded-full px-3 py-1">
                        <Text className="text-base-800 mr-3">{location}</Text>
                        <TouchableOpacity onPress={() => removeTag('location')}>
                            <X size={14} color="#2D3648" />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}
