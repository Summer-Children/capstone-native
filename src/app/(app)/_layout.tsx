import { Redirect, Stack } from 'expo-router'
import { Text } from '@/reusables/components/ui/text'
import { useContext } from 'react'
import { useReactiveVar } from '@apollo/client'
import { tokenVar } from '@shared/lib/auth/provider'
import { AuthContext } from '@shared/lib/auth/provider'

export default function AppLayout() {
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
            <Stack screenOptions={{ headerTitle: '', headerShown: false }}></Stack>
        </>
    )
}
