import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { useReactiveVar } from '@apollo/client'
import LogoSvg from '@assets/images/logo.svg'
import { tokenVar } from '@shared/lib/auth/provider'
import { Redirect, router } from 'expo-router'
import React, { ReactNode } from 'react'
import { View } from 'react-native'
import BottomButton from '../shared/ui/bottom-button'
import Footer from '../shared/ui/footer'

export default function App(): ReactNode {
    const token = useReactiveVar(tokenVar)
    if (token) {
        return <Redirect href="/(app)" />
    }
    return (
        <View className="flex-1 flex flex-col items-center my-7">
            <View>
                <LogoSvg />
            </View>

            <Footer className="flex flex-col gap-4 px-6">
                <BottomButton onPress={() => router.replace('./(auth)/signup')}>
                    <Text>Sign Up</Text>
                </BottomButton>
                <Button
                    onPress={() => {
                        router.replace('./(auth)/login')
                    }}
                    variant="outline"
                    className="border-eva-blue-500"
                >
                    <Text style={{ color: '#0251FF' }}>Log in</Text>
                </Button>
            </Footer>
        </View>
    )
}
