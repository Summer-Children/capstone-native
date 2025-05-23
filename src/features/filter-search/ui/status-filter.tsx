import React, { forwardRef, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { ActionSheetRef } from 'react-native-actions-sheet'
import { CustomActionSheet } from './action-sheet'
import { TagList } from '@shared/ui/tag-list'
import { FilterState } from '../model/filter-state'

interface StatusFilterProps {
    filters: FilterState
    setFilters: (filters: Partial<FilterState>) => void
    onClose: () => void
}

export const StatusFilter = forwardRef<ActionSheetRef, StatusFilterProps>(({ filters, setFilters, onClose }, ref) => {
    const [selectedStatus, setSelectedStatus] = useState(filters.status || '')

    useEffect(() => {
        setSelectedStatus(filters.status || '')
    }, [filters.status])

    return (
        <CustomActionSheet
            ref={ref}
            title="Assessment Status"
            onApply={() => {
                setFilters({ status: selectedStatus })
                onClose()
            }}
            onReset={() => setSelectedStatus('')}
        >
            <View className="flex gap-2">
                <Text className="text-sm text-eva-black-300">Select Status</Text>
                <TagList
                    options={['Pending', 'In progress', 'Complete']}
                    selected={selectedStatus}
                    onSelect={setSelectedStatus}
                />
            </View>
        </CustomActionSheet>
    )
})
