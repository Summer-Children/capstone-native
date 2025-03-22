import { BuildingsIcon } from '@/src/shared/ui'
import React, { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { ActionButton } from './action-button'

interface BlankStateProps {
    title: string
    description: string
    icon?: ReactNode
    buttons?: { label: string; icon?: ReactNode; onPress: () => void }[]
}

export function BlankState({ title, description, icon, buttons }: BlankStateProps): ReactNode {
    return (
        <View className="flex-1 items-center justify-center m-4 rounded-2xl p-8 gap-4 bg-[#F9F9F9]">
            {icon || <BuildingsIcon size={85} color="#EAEBED" />}
            <Text className="text-2xl font-bold text-center">{title}</Text>
            <Text className="text-center mb-8">{description}</Text>

            {buttons?.map((button, index) => (
                <ActionButton key={index} label={button.label} icon={button.icon} onPress={button.onPress} />
            ))}
        </View>
    )
}
