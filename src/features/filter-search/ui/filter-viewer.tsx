import React, { useState, ReactNode } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ComboBox } from '@shared/ui'
import { X } from 'lucide-react-native'
import Header from '@shared/ui/header'

interface FilterViewProps {
    filters: { year: string; location: string }
    setFilters: (filters: { year: string; location: string }) => void
    onClose: () => void
}

export const FilterView = ({ filters, setFilters, onClose }: FilterViewProps): ReactNode => {
    const [year, setYear] = useState(filters.year)
    const [location, setLocation] = useState(filters.location)

    return (
        <>
            <View className="p-4 flex-1">
                <View className="mt-16">
                    <TouchableOpacity onPress={onClose}>
                        <X size={24} color="#2D3648" />
                    </TouchableOpacity>
                    <Header headerText="" headerDescription="Filters" />

                    <ComboBox
                        label="Assessment Year"
                        placeholder="Select year"
                        value={year}
                        onChangeText={setYear}
                        onSelect={item => setYear(item.val)}
                        options={[]}
                    />

                    <ComboBox
                        label="Location"
                        placeholder="Enter location"
                        value={location || ''}
                        onChangeText={setLocation}
                        onSelect={item => setLocation(item.val)}
                        options={[]}
                    />
                </View>

                <View className="absolute bottom-8 left-4 right-4">
                    <TouchableOpacity
                        className="bg-base-800 py-4 rounded-md items-center mb-4"
                        onPress={() => {
                            setFilters({ year, location })
                            onClose()
                        }}
                    >
                        <Text className="text-white font-bold">Filter</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="py-4 rounded-md items-center"
                        onPress={() => {
                            setYear('')
                            setLocation('')
                        }}
                    >
                        <Text className="text-black font-bold">Reset filters</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
