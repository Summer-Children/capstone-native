import React, { useState, forwardRef, useEffect } from 'react'
import { View } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { ActionSheetRef } from 'react-native-actions-sheet'
import { CustomActionSheet } from './action-sheet'
import { TagList } from './tag-list'
import { FilterState } from '../model/filter-state'

interface SortActionSheetProps {
    filters: FilterState
    setFilters: (filters: Partial<FilterState>) => void
    onClose: () => void
}

export const SortActionSheet = forwardRef<ActionSheetRef, SortActionSheetProps>(
    ({ filters, setFilters, onClose }, ref) => {
        const [sortBy, setSortBy] = useState(filters.sortBy || '')

        useEffect(() => {
            setSortBy(filters.sortBy || '')
        }, [filters.sortBy])

        return (
            <CustomActionSheet
                ref={ref}
                title="Sort by"
                onApply={() => {
                    setFilters({ ...filters, sortBy })
                    onClose()
                }}
                onReset={() => setSortBy('')}
            >
                <View className="flex gap-2">
                    <Text className="text-sm text-eva-black-300">Assessment year</Text>
                    <TagList options={['Newest First', 'Oldest First']} selected={sortBy} onSelect={setSortBy} />
                </View>

                <View className="flex gap-2 mt-4">
                    <Text className="text-md text-eva-black-300">Building Name</Text>
                    <TagList options={['A-Z', 'Z-A']} selected={sortBy} onSelect={setSortBy} />
                </View>
            </CustomActionSheet>
        )
    }
)
