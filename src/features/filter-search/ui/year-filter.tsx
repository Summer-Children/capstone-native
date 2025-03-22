import React, { useState, useEffect, forwardRef, useMemo } from 'react'
import { Picker } from '@react-native-picker/picker'
import { ActionSheetRef } from 'react-native-actions-sheet'
import { GET_BUILDINGS } from '@/src/entities/building'
import { useQuery } from '@apollo/client'
import { Building } from '@/src/entities/building/type/building-type'
import { CustomActionSheet } from './action-sheet'
import { FilterState } from '../model/filter-state'

interface YearFilterProps {
    filters: FilterState
    setFilters: (filters: Partial<FilterState>) => void
    onClose: () => void
}

export const YearFilter = forwardRef<ActionSheetRef, YearFilterProps>(({ filters, setFilters, onClose }, ref) => {
    const [year, setYear] = useState(filters.year || '')
    const { data } = useQuery<{ res: Building[] }>(GET_BUILDINGS)
    const buildings: Building[] = (data?.res || []).filter((b): b is Building => b !== null)

    useEffect(() => {
        setYear(filters.year || '')
    }, [filters.year])

    const years = useMemo(() => {
        if (buildings.length > 0) {
            const minYear = Math.min(...buildings.map(b => Number(b.fiscalYear)))
            const currentYear = new Date().getFullYear()
            return Array.from({ length: currentYear - minYear + 1 }, (_, i) => minYear + i)
        }
        return []
    }, [buildings])

    return (
        <CustomActionSheet
            ref={ref}
            title="Assessment Year"
            onApply={() => {
                setFilters({ year })
                onClose()
            }}
            onReset={() => setYear('')}
        >
            <Picker selectedValue={year} onValueChange={setYear}>
                {years.map(y => (
                    <Picker.Item key={y} label={`${y}`} value={y} />
                ))}
            </Picker>
        </CustomActionSheet>
    )
})
