import { Text } from '@/reusables/components/ui/text'
import { BottomNavigation } from '@/src/shared/ui'
import { useReactiveVar } from '@apollo/client'
import { AuthContext, tokenVar } from '@shared/lib/auth/provider'
import { Redirect, Stack, usePathname } from 'expo-router'
import { ReactNode, useContext } from 'react'

export default function AppLayout(): ReactNode {
    const { isTokenLoading } = useContext(AuthContext)
    const token = useReactiveVar(tokenVar)
    const pathname = usePathname()
    const hiddenPaths = ['/buildings', '/building/create', '/building/detail', '/building/edit', '/building/success']
    const shouldShowBottomNavigation = !hiddenPaths.some(path => pathname.startsWith(path))

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
            >
                <Stack.Screen name="home" />
                <Stack.Screen name="assessment" />
                <Stack.Screen name="building" />
            </Stack>
            {shouldShowBottomNavigation && <BottomNavigation />}
        </>
    )
}
