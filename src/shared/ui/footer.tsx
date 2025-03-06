import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { clsx } from 'clsx'

interface FooterProps {
    children: ReactNode
    className?: string
}

export default function Footer({ children, className }: FooterProps): ReactNode {
    return <View className={clsx('absolute bottom-0 right-0 left-0 ', className)}>{children}</View>
}
