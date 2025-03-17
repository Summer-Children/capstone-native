import { Text } from '@/reusables/components/ui/text'
import React, { ReactNode } from 'react'
import { View } from 'react-native'

interface HeaderProps {
    headerText: string
    headerDescription?: string
    className?: string
}

export default function Header({ headerText, headerDescription, className }: HeaderProps): ReactNode {
    return (
        <View className={`flex flex-col gap-3 py-4 h-fit ${className}`}>
            {headerText && <Text className="text-3xl font-bold ">{headerText}</Text>}
            {headerDescription && <Text className="text-lg text-gray-700">{headerDescription}</Text>}
        </View>
    )
}
