import { ImageContainer } from '@/src/shared/ui'
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { ActionButton } from './action-button'

interface BlankStateProps {
    title: string
    description: string
    icon?: ReactNode
    buttons?: { label: string; icon?: ReactNode; onPress: () => void }[]
}

export function BlankState({ title, description, icon, buttons }: BlankStateProps): ReactNode {
    return (
        <View className="flex-1 items-center justify-center m-4 rounded-2xl p-8 gap-12 bg-[#F9F9F9]">
            {icon || <ImageContainer size={50} color="#D9D9D9" />}
            <View className="flex gap-2">
                <Text className="text-lg font-semibold text-center">{title}</Text>
                <Text className="text-center text-sm">{description}</Text>
            </View>

            <View className="flex gap-4">
                {buttons?.map((button, index) => (
                    <ActionButton key={index} label={button.label} icon={button.icon} onPress={button.onPress} />
                ))}
            </View>
        </View>
    )
}
