import React, { ReactNode } from 'react'
import { TouchableOpacity, Text } from 'react-native'

interface ActionButtonProps {
    label: string
    icon: React.ReactNode
    onPress: () => void
}

export function ActionButton({ label, icon, onPress }: ActionButtonProps): ReactNode {
    return (
        <TouchableOpacity
            className="flex-row gap-1 items-center justify-center bg-eva-white-100 rounded-full px-4 py-3"
            onPress={onPress}
        >
            {icon}
            <Text className="font-bold">{label}</Text>
        </TouchableOpacity>
    )
}
