import { Text } from '@/reusables/components/ui/text'
import { BottomNavigation } from '@/src/shared/ui'
import { ArrowIcon } from '@/src/shared/ui/icons'
import { useReactiveVar } from '@apollo/client'
import { AuthContext, tokenVar } from '@shared/lib/auth/provider'
import { Redirect, router, Stack, usePathname } from 'expo-router'
import React, { ReactNode, useContext } from 'react'
import { TouchableOpacity } from 'react-native'

export default function AppLayout(): ReactNode {
    const { isTokenLoading } = useContext(AuthContext)
    const token = useReactiveVar(tokenVar)
    const pathname = usePathname()
    const shouldShowBottomNavigation = pathname === '/' || pathname === '/buildings/archive-list'

    if (isTokenLoading) {
        return <Text>Loading...</Text>
    }

    if (!token) {
        return <Redirect href="/login" />
    }

    return (
        <>
            <Stack
                screenOptions={{
                    headerTitle: '',
                    contentStyle: { paddingHorizontal: 16, backgroundColor: 'white' },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <TouchableOpacity className="bg-eva-white-100 rounded-full p-2" onPress={router.back}>
                            <ArrowIcon color="#1C1D1F" />
                        </TouchableOpacity>
                    )
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="buildings/index" />
                <Stack.Screen name="buildings/archive-list" />
            </Stack>
            {shouldShowBottomNavigation && <BottomNavigation />}
        </>
    )
}
