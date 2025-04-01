import React, { ReactNode } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from '@/reusables/components/ui/text'

interface TagListProps {
    options: string[]
    selected: string
    onSelect: (option: string) => void
    gap?: number
}

export const TagList = ({ options, selected, onSelect, gap = 16 }: TagListProps): ReactNode => {
    return (
        <View className="flex-row flex-wrap" style={{ gap: gap }}>
            {options.map(option => (
                <TouchableOpacity
                    key={option}
                    className={`rounded-full px-4 py-2 flex-row items-center border ${
                        selected === option ? 'bg-eva-black-900 border-eva-black-900' : 'bg-white border-eva-white-500'
                    }`}
                    onPress={() => onSelect(option)}
                >
                    <Text
                        className={`font-semibold text-sm ${selected === option ? 'text-white' : 'text-eva-black-300'}`}
                    >
                        {option}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}
