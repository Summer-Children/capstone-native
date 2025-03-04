import { Redirect, Slot, Stack } from 'expo-router'
import React, { ReactNode } from 'react'
import 'react-native-reanimated'
import { useReactiveVar } from '@apollo/client'
import { tokenVar } from '@shared/lib/auth/provider'

export default function RootLayout(): ReactNode {
    const token = useReactiveVar(tokenVar)
    if (token) {
        return <Redirect href="/(app)" />
    }

    return (
        <>
            <Stack screenOptions={{ headerTitle: '' }}>
                <Slot />
            </Stack>
        </>
    )
}
