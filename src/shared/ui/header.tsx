import { Text } from '@/reusables/components/ui/text'
import { H2 } from '@/reusables/components/ui/typography'
import { default as React, ReactNode } from 'react'
import { View } from 'react-native'

interface HeaderProps {
    headerText: string
    headerDescription?: string
    className?: string
}

export default function Header({ headerText, headerDescription, className }: HeaderProps): ReactNode {
    return (
        <View className={`pb-10 flex flex-col gap-3 py-4 h-fit ${className}`}>
            {headerText && <H2 className="text-4xl">{headerText}</H2>}
            {headerDescription && <Text className="text-md text-eva-black-900">{headerDescription}</Text>}
        </View>
    )
}
