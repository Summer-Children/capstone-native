import { Text } from '@/reusables/components/ui/text'
import React, { ReactNode } from 'react'
import { View } from 'react-native'

interface HeaderProps {
    headerText: string
    headerDescription?: string
}

export default function Header({ headerText, headerDescription }: HeaderProps): ReactNode {
    return (
        <View className="py-4">
            <Text className="text-3xl font-bold ">{headerText}</Text>
            <Text className="text-lg text-gray-700 pb-6">{headerDescription}</Text>
        </View>
    )
}
