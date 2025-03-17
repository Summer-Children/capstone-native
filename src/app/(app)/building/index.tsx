import { View, FlatList, TouchableOpacity, Modal, Text } from 'react-native'
import { BuildingCard } from '@/src/entities/building/ui/building-card'
import { Stack, useRouter } from 'expo-router'
import Header from '@/src/shared/ui/header'
import React, { ReactNode, useMemo, useState } from 'react'
import { SearchBar } from '@/src/features/filter-search/ui/search-bar'
import { TagList } from '@/src/features/filter-search/ui/tag-list'
import { SlidersHorizontal } from 'lucide-react-native'
import { FilterView } from '@/src/features/filter-search/ui/filter-viewer'
import { GET_BUILDINGS } from '@/src/entities/building'
import { useQuery } from '@apollo/client'

export default function BuildingArchive(): ReactNode {
    const router = useRouter()
    const { data, loading, error } = useQuery(GET_BUILDINGS)
    const buildings = data?.res || []
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({ year: '', location: '' })
    const [isFilterModalVisible, setFilterModalVisible] = useState(false)

    const filteredBuildings = useMemo(() => {
        return buildings.filter(building => {
            if (!building) return false
            const matchesSearch = searchQuery ? building.name?.toLowerCase().includes(searchQuery.toLowerCase()) : true
            const matchesYear = filters.year ? building.year === Number(filters.year) : true
            const matchesLocation = filters.location ? building.address?.includes(filters.location) : true

            return matchesSearch && matchesYear && matchesLocation
        })
    }, [buildings, searchQuery, filters])

    if (loading) return <Text className="text-center mt-10">Loading buildings...</Text>
    if (error) return <Text className="text-center mt-10 text-red-500">Failed to load buildings</Text>

    return (
        <>
            <Stack.Screen
                options={{
                    contentStyle: { paddingHorizontal: 0, backgroundColor: 'white' }
                }}
            />
            <View className="flex-1 px-4">
                <Header headerText="Buildings" />
                <View className="flex-row justify-between gap-4">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    <TouchableOpacity
                        className="bg-base-800 rounded-lg flex items-center justify-center p-2 px-2.5"
                        onPress={() => setFilterModalVisible(true)}
                    >
                        <SlidersHorizontal size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <TagList filters={filters} setFilters={setFilters} />
                <FlatList
                    data={filteredBuildings}
                    keyExtractor={item => item?.id?.toString() || ''}
                    renderItem={({ item }) => {
                        if (!item) return null
                        return (
                            <BuildingCard
                                building={{
                                    id: item.id,
                                    name: item.name || undefined,
                                    address: item.address || undefined,
                                    year: item.year || undefined,
                                    strataId: item.strataId || undefined
                                }}
                                onPress={() => router.push(`/building/detail/${item.id}`)}
                            />
                        )
                    }}
                />
            </View>
            <Modal visible={isFilterModalVisible} animationType="slide">
                <View className="flex-1">
                    <FilterView
                        filters={filters}
                        setFilters={setFilters}
                        onClose={() => setFilterModalVisible(false)}
                    />
                </View>
            </Modal>
        </>
    )
}
