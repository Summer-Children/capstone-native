import { ReactNode } from 'react'
import { View, Text } from 'react-native'

interface BadgeProps {
    state: 'pending' | 'in progress' | 'complete'
}

const buildingState = {
    pending: {
        label: 'Pending',
        color: '#DC2626',
        textColor: '#7F1D1D',
        bgColor: '#FEE2E2'
    },
    'in progress': {
        label: 'In progress',
        color: '#FB954B',
        textColor: '#6C3813',
        bgColor: '#FFF4ED'
    },
    complete: {
        label: 'Complete',
        color: '#348352',
        textColor: '#14532D',
        bgColor: '#E4FFF4'
    }
}

export function Badge({ state }: BadgeProps): ReactNode {
    const { label, color, textColor, bgColor } = buildingState[state]

    return (
        <View className="flex-row items-center gap-1 px-2 py-1 rounded-full" style={{ backgroundColor: bgColor }}>
            <View className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <Text className="text-xs font-bold" style={{ color: textColor }}>
                {label}
            </Text>
        </View>
    )
}
