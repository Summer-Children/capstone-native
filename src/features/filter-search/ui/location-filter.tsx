import React, { useState, forwardRef, useEffect } from 'react'
import { View, TextInput, FlatList, TouchableOpacity, Text } from 'react-native'
import { ActionSheetRef } from 'react-native-actions-sheet'
import { CustomActionSheet } from './action-sheet'
import * as Location from 'expo-location'
import { CloseIcon, SearchIcon, NearMeIcon, SearchHistoryIcon } from '@/src/shared/ui'
import { FilterState } from '../model/filter-state'

interface LocationFilterProps {
    filters: FilterState
    setFilters: (filters: Partial<FilterState>) => void
    onClose: () => void
}

export const LocationFilter = forwardRef<ActionSheetRef, LocationFilterProps>(
    ({ filters, setFilters, onClose }, ref) => {
        const [search, setSearch] = useState(filters.location || '')
        const [isFocused, setIsFocused] = useState(false)
        const [history, setHistory] = useState<string[]>([])
        const [currentLocation, setCurrentLocation] = useState<string | null>(null)

        useEffect((): void => {
            setSearch(filters.location || '')
        }, [filters.location])

        useEffect((): void => {
            void (async (): Promise<void> => {
                const userLocation = await Location.getCurrentPositionAsync({})
                const reverseGeocode = await Location.reverseGeocodeAsync(userLocation.coords)
                if (reverseGeocode.length > 0) {
                    const { city, region } = reverseGeocode[0]
                    setCurrentLocation(`${city}, ${region}`)
                }
            })()
        }, [])

        useEffect((): void => {
            if (filters.location && !history.includes(filters.location)) {
                setHistory(prev => [filters.location, ...prev.filter(item => item !== filters.location)].slice(0, 10))
            }
        }, [filters.location])

        const selectLocation = (loc: string): void => {
            setSearch(loc)
            setFilters({ ...filters, location: loc })
            setHistory(prev => [loc, ...prev.filter(item => item !== loc)].slice(0, 10))
        }

        return (
            <CustomActionSheet
                ref={ref}
                title="Location"
                containerStyle={{ height: '90%' }}
                onApply={() => {
                    const selectedLocation = search.trim() || currentLocation || ''
                    if (selectedLocation) {
                        setFilters({ ...filters, location: selectedLocation })
                        setHistory(prev =>
                            [selectedLocation, ...prev.filter(item => item !== selectedLocation)].slice(0, 10)
                        )
                    }
                    onClose()
                }}
                onReset={() => {
                    setFilters({ ...filters, location: '' })
                    setSearch('')
                }}
            >
                <View
                    className={`flex-row items-center border rounded-xl p-3 ${
                        isFocused ? 'border-eva-blue-500' : 'border-eva-white-500'
                    }`}
                >
                    <SearchIcon size={20} />
                    <TextInput
                        className="ml-2 flex-1 text-eva-black-900"
                        placeholder="Search a location"
                        value={search}
                        onChangeText={text => setSearch(text)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    {search.length > 0 && (
                        <TouchableOpacity
                            onPress={() => {
                                setSearch('')
                                setFilters({ ...filters, location: '' })
                            }}
                        >
                            <CloseIcon size={16} />
                        </TouchableOpacity>
                    )}
                </View>
                {currentLocation && (
                    <TouchableOpacity className="flex-row items-center" onPress={() => selectLocation(currentLocation)}>
                        <NearMeIcon size={20} color="#1C1D1F" variant="solid" />
                        <Text className="text-eva-black-900"> Current location, {currentLocation}</Text>
                    </TouchableOpacity>
                )}
                {history.length > 0 && (
                    <View>
                        <Text className="text-eva-black-300">Recent</Text>
                        <FlatList
                            data={history.slice(0, 10)}
                            keyExtractor={item => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="p-2 flex-row items-center"
                                    onPress={() => selectLocation(item)}
                                >
                                    <SearchHistoryIcon size={20} color="#1C1D1F" />
                                    <Text className="text-eva-black-900">{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </CustomActionSheet>
        )
    }
)
