import React, { ReactNode } from 'react'
import { View, ScrollView, TouchableOpacity, Text } from 'react-native'
import { ChevronIcon, CloseIcon } from '@/src/shared/ui'
import { FilterState } from '../model/filter-state'

interface FilterChipsProps {
    filters: FilterState
    setFilters: (filters: Partial<FilterState>) => void
    onSortPress: () => void
    onYearPress: () => void
    onLocationPress: () => void
    onStatusPress: () => void
}

export const FilterChips = ({
    filters,
    setFilters,
    onSortPress,
    onYearPress,
    onLocationPress,
    onStatusPress
}: FilterChipsProps): ReactNode => {
    const chips = [
        { label: 'Sort', value: filters.sortBy, onPress: onSortPress, clearKey: 'sortBy' },
        { label: 'Location', value: filters.location, onPress: onLocationPress, clearKey: 'location' },
        { label: 'Assessment Year', value: filters.year, onPress: onYearPress, clearKey: 'year' },
        { label: 'Status', value: filters.status, onPress: onStatusPress, clearKey: 'status' }
    ]

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
                {chips.map(({ label, value, onPress, clearKey }) => (
                    <TouchableOpacity
                        key={label}
                        className={`rounded-full px-4 py-2 flex-row items-center ${value ? 'bg-eva-black-900' : 'bg-eva-white-100'}`}
                        onPress={onPress}
                    >
                        <Text className={`font-semibold text-sm ${value ? 'text-white' : 'text-eva-black-900'}`}>
                            {value ? `${label}: ${value}` : label}
                        </Text>
                        {value ? (
                            <TouchableOpacity onPress={() => setFilters({ [clearKey]: '' })} className="ml-2">
                                <CloseIcon size={16} color="white" />
                            </TouchableOpacity>
                        ) : (
                            <ChevronIcon size={16} color="#1C1D1F" direction="down" />
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}
