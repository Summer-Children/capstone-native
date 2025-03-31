import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { BuildingCard, getBuildingState } from '@/src/entities/building/ui/building-card'
import { Stack, useRouter } from 'expo-router'
import Header from '@/src/shared/ui/header'
import React, { ReactNode, useRef, useState } from 'react'
import { GET_BUILDINGS } from '@/src/entities/building'
import { useQuery } from '@apollo/client'
import { Building } from '@/src/entities/building/type/building-type'
import { ActionSheetRef } from 'react-native-actions-sheet'
import { useSearch } from '@/src/features/filter-search/model/search'
import {
    SortActionSheet,
    FilterChips,
    LocationFilter,
    StatusFilter,
    YearFilter,
    SearchBar
} from '@/src/features/filter-search/ui'
import { BlankState } from '@/src/widgets/home'
import { AddHomeIcon } from '@/src/shared/ui'
import { FilterState } from '@/src/features/filter-search/model/filter-state'

export default function BuildingArchive(): ReactNode {
    const router = useRouter()
    const { data } = useQuery<{ res: Building[] }>(GET_BUILDINGS, {
        fetchPolicy: 'network-only'
    })
    const buildings: Building[] = (data?.res || []).filter((b): b is Building => b !== null)
    const { searchQuery } = useSearch()
    const [filters, setFilters] = useState<FilterState>({
        sortBy: '',
        location: '',
        year: '',
        status: ''
    })

    const updateFilters = (newPart: Partial<FilterState>): void => {
        setFilters(prev => ({ ...prev, ...newPart }))
    }

    const sortSheetRef = useRef<ActionSheetRef>(null)
    const yearSheetRef = useRef<ActionSheetRef>(null)
    const statusSheetRef = useRef<ActionSheetRef>(null)
    const locationSheetRef = useRef<ActionSheetRef>(null)

    const filteredBuildings = buildings
        .filter(b => {
            const buildingStatus = getBuildingState(b)
            const matchesSearch = searchQuery
                ? [b.name, b.address, b.strataId].some(field =>
                      field?.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                : true
            const matchesYear = filters.year ? b.fiscalYear === Number(filters.year) : true
            const matchesLocation = filters.location ? b.address?.includes(filters.location) : true
            const matchesStatus = filters.status ? buildingStatus === filters.status.toLowerCase() : true
            return matchesSearch && matchesYear && matchesLocation && matchesStatus
        })
        .sort((a, b) => {
            if (filters.sortBy === 'Newest First') return Number(b.fiscalYear) - Number(a.fiscalYear)
            if (filters.sortBy === 'Oldest First') return Number(a.fiscalYear) - Number(b.fiscalYear)
            if (filters.sortBy === 'A-Z') return a.name.localeCompare(b.name)
            if (filters.sortBy === 'Z-A') return b.name.localeCompare(a.name)
            return 0
        })

    const clearFilters = (): void => {
        setFilters({ sortBy: '', location: '', year: '', status: '' })
    }

    return (
        <>
            <Stack.Screen
                options={{
                    contentStyle: { paddingHorizontal: 0, backgroundColor: 'white' },
                    headerBackVisible: false,
                    headerLeft: () => null
                }}
            />

            <Header headerText="Buildings" className="px-4" />

            {buildings.length === 0 ? (
                <BlankState
                    title="No buildings yet"
                    description="Start by adding a building to begin your assessments. Once you register a building, you’ll be able to track its progress and complete assessments easily."
                    buttons={[
                        {
                            label: 'Add Building',
                            icon: <AddHomeIcon size={16} variant="solid" color="#1C1D1F" />,
                            onPress: () => router.push('/buildings/new')
                        }
                    ]}
                />
            ) : (
                <View className="flex-1 gap-3">
                    <SearchBar className="mx-4" />
                    <View className="flex pl-4">
                        <FilterChips
                            filters={filters}
                            setFilters={updateFilters}
                            onSortPress={() => sortSheetRef.current?.show()}
                            onYearPress={() => yearSheetRef.current?.show()}
                            onStatusPress={() => statusSheetRef.current?.show()}
                            onLocationPress={() => locationSheetRef.current?.show()}
                        />
                    </View>
                    <View className="flex-row justify-between items-center my-3 px-4">
                        <Text className="font-semibold text-eva-black-900">
                            {`${filteredBuildings.length} result${filteredBuildings.length === 1 ? '' : 's'}`}
                        </Text>

                        {(filters.sortBy || filters.location || filters.year || filters.status) && (
                            <TouchableOpacity onPress={clearFilters}>
                                <Text className="text-eva-blue-500 font-semibold text-sm">Clear filters</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {filteredBuildings.length === 0 ? (
                        <View className="flex-1 justify-start items-center px-8">
                            <Text className="text-eva-black-500 text-center font-semibold">No results found</Text>
                            <Text className="text-eva-black-300 text-center text-sm">
                                Try adjusting your search or filters to find the building you're looking for.
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            className="px-4"
                            data={filteredBuildings}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                if (!item) return null
                                const status = getBuildingState(item)
                                return (
                                    <BuildingCard
                                        showDot={false}
                                        building={item}
                                        onPress={() => {
                                            if (status === 'in progress') {
                                                const inProgressReport = item.assessmentReports.find(
                                                    report => report.draft
                                                )
                                                if (inProgressReport) {
                                                    router.push(
                                                        `/buildings/${item.id}/assessments/${inProgressReport.id}/components`
                                                    )
                                                } else {
                                                    console.warn('No in-progress report found')
                                                }
                                            } else {
                                                router.push(`/buildings/${item.id}/detail`)
                                            }
                                        }}
                                    />
                                )
                            }}
                        />
                    )}

                    <SortActionSheet
                        filters={filters}
                        setFilters={updateFilters}
                        ref={sortSheetRef}
                        onClose={() => sortSheetRef.current?.hide()}
                    />
                    <YearFilter
                        filters={filters}
                        setFilters={updateFilters}
                        ref={yearSheetRef}
                        onClose={() => yearSheetRef.current?.hide()}
                    />
                    <StatusFilter
                        filters={filters}
                        setFilters={updateFilters}
                        ref={statusSheetRef}
                        onClose={() => statusSheetRef.current?.hide()}
                    />
                    <LocationFilter
                        filters={filters}
                        setFilters={updateFilters}
                        ref={locationSheetRef}
                        onClose={() => locationSheetRef.current?.hide()}
                    />
                </View>
            )}
        </>
    )
}
