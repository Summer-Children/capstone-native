import { ApolloProvider } from '@apollo/client'
import { PortalHost } from '@rn-primitives/portal'
import { Slot } from 'expo-router'
import React, { ReactNode } from 'react'
import 'react-native-reanimated'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { apolloClient } from '../shared/api/clients'
import { AuthProvider } from '../shared/lib/auth/provider'
import './index.css'

export default function RootLayout(): ReactNode {
    return (
        <>
            <ApolloProvider client={apolloClient}>
                <AuthProvider>
                    <SafeAreaProvider>
                        <SafeAreaView className="flex-1">
                            <Slot />
                        </SafeAreaView>
                        <PortalHost />
                    </SafeAreaProvider>
                </AuthProvider>
            </ApolloProvider>
        </>
    )
}
