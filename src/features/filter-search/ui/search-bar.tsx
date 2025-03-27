import React, { ReactNode, useState } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { SearchIcon } from '@/src/shared/ui/icons/search'
import { CloseIcon } from '@/src/shared/ui'
import { useSearch } from '../model/search'

interface SearchBarProps {
    className?: string
}

export const SearchBar = ({ className }: SearchBarProps): ReactNode => {
    const { searchQuery, setSearchQuery } = useSearch()
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View
            className={`flex-row items-center rounded-xl p-3 border ${
                isFocused ? 'border-eva-blue-500' : 'border-eva-white-500'
            } ${className}`}
        >
            <SearchIcon size={20} />
            <TextInput
                placeholder="Find buildings"
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="ml-2 flex-1"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <CloseIcon size={20} />
                </TouchableOpacity>
            )}
        </View>
    )
}
