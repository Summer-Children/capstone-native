import { ApolloProvider } from '@apollo/client'
import { PortalHost } from '@rn-primitives/portal'
import { Slot } from 'expo-router'
import React, { ReactNode } from 'react'
import 'react-native-reanimated'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { apolloClient } from '../shared/api/clients'
import { AuthProvider } from '../shared/lib/auth/provider'
import './index.css'
import { StatusBar } from 'expo-status-bar'
import AppLoading from 'expo-app-loading'
import {
    useFonts,
    Figtree_300Light,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
    Figtree_800ExtraBold,
    Figtree_900Black,
    Figtree_300Light_Italic,
    Figtree_400Regular_Italic,
    Figtree_500Medium_Italic,
    Figtree_600SemiBold_Italic,
    Figtree_700Bold_Italic,
    Figtree_800ExtraBold_Italic,
    Figtree_900Black_Italic
} from '@expo-google-fonts/figtree'

export default function RootLayout(): ReactNode {
    const [fontsLoaded] = useFonts({
        Figtree_300Light,
        Figtree_400Regular,
        Figtree_500Medium,
        Figtree_600SemiBold,
        Figtree_700Bold,
        Figtree_800ExtraBold,
        Figtree_900Black,
        Figtree_300Light_Italic,
        Figtree_400Regular_Italic,
        Figtree_500Medium_Italic,
        Figtree_600SemiBold_Italic,
        Figtree_700Bold_Italic,
        Figtree_800ExtraBold_Italic,
        Figtree_900Black_Italic
    })
    if (!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <>
            <ApolloProvider client={apolloClient}>
                <AuthProvider>
                    <StatusBar style="dark" translucent backgroundColor="transparent" />
                    <SafeAreaProvider>
                        <SafeAreaView className="flex-1" edges={['right', 'bottom', 'left']}>
                            <Slot />
                        </SafeAreaView>
                        <PortalHost />
                    </SafeAreaProvider>
                </AuthProvider>
            </ApolloProvider>
        </>
    )
}
