import { ApolloProvider } from '@apollo/client'
import { Slot } from 'expo-router'
import React, { ReactNode } from 'react'
import 'react-native-reanimated'
import { apolloClient } from '../shared/api/clients'
import { AuthProvider } from '../shared/lib/auth/provider'
import './index.css'

export default function RootLayout(): ReactNode {
    return (
        <>
            <ApolloProvider client={apolloClient}>
                <AuthProvider>
                    <Slot />
                </AuthProvider>
            </ApolloProvider>
        </>
    )
}
