import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { useReactiveVar } from '@apollo/client'
import { tokenVar } from '@shared/lib/auth/provider'
import { Redirect, router } from 'expo-router'
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import Footer from '../shared/ui/footer'

export default function App(): ReactNode {
    const token = useReactiveVar(tokenVar)
    if (token) {
        return <Redirect href="/(app)" />
    }
    return (
        <View className="flex-1">
            <Footer className="flex flex-col gap-4">
                <Button onPress={() => router.replace('./(auth)/signup')}>
                    <Text>Sign Up</Text>
                </Button>
                <Button
                    onPress={() => {
                        router.replace('./(auth)/login')
                    }}
                >
                    <Text>Log</Text>
                </Button>
            </Footer>
        </View>
    )
}
