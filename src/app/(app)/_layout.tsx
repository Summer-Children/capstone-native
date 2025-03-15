import { Text } from '@/reusables/components/ui/text'
import { useReactiveVar } from '@apollo/client'
import { AuthContext, tokenVar } from '@shared/lib/auth/provider'
import { Redirect, Stack } from 'expo-router'
import React from 'react'
import { type ReactNode, useContext } from 'react'

export default function AppLayout(): ReactNode {
    const { isTokenLoading } = useContext(AuthContext)
    const token = useReactiveVar(tokenVar)

    if (isTokenLoading) {
        return <Text>Loading...</Text>
    }

    if (!token) {
        return <Redirect href="/login" />
    }

    return (
        <>
            <Stack
                screenOptions={{ headerTitle: '', contentStyle: { paddingHorizontal: 16, backgroundColor: 'white' } }}
            />
        </>
    )
}
