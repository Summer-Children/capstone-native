import React, { ReactNode } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { SearchIcon } from '@/src/shared/ui/icons/search'
import { SolidCloseIcon } from '@/src/shared/ui/icons/solid-close'

interface SearchBarProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps): ReactNode => {
    return (
        <View className="flex-1 flex-row items-center rounded-lg p-2 bg-base-200">
            <SearchIcon color="#717D96" />
            <TextInput
                placeholder="Search Buildings"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="ml-2 flex-1"
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <SolidCloseIcon size={20} />
                </TouchableOpacity>
            )}
        </View>
    )
}
