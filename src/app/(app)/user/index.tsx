/* eslint-disable @typescript-eslint/no-require-imports */
import React, { ReactNode } from 'react'
import { Image, View, TextInput } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import * as SecureStore from 'expo-secure-store'
import { tokenVar } from '@shared/lib/auth/provider'
import Footer from '@/src/shared/ui/footer'
import BottomButton from '@/src/shared/ui/bottom-button'
import Header from '@/src/shared/ui/header'

export default function UserProfile(): ReactNode {
    const handleLogout = async (): Promise<void> => {
        tokenVar(null)
        await SecureStore.deleteItemAsync('authToken')
    }

    return (
        <>
            <Header headerText="User Profile" />
            <View className="flex-1 gap-4">
                <View className="items-center">
                    <Image
                        source={require('@/assets/images/avatar.png')}
                        className="w-20 h-20 rounded-full"
                        resizeMode="contain"
                    />
                </View>
                {/* TODO: get uset account name and email */}
                <View className="flex gap-2">
                    <View className="flex gap-1">
                        <Text className="font-semibold text-eva-black-900">Name</Text>
                        <TextInput
                            value="Carolina"
                            className="px-4 py-3 rounded-md bg-eva-white-50 border border-eva-black-50 text-eva-black-500"
                            editable={false}
                        />
                    </View>

                    <View className="flex gap-1">
                        <Text className="font-semibold text-eva-black-900">Email</Text>
                        <TextInput
                            value="Carolina@masterbuildings.com"
                            className="px-4 py-3 rounded-md bg-eva-white-50 border border-eva-black-50 text-eva-black-500"
                            editable={false}
                        />
                    </View>
                </View>

                <Footer>
                    <BottomButton onPress={handleLogout}>
                        <Text>Log out</Text>
                    </BottomButton>
                </Footer>
            </View>
        </>
    )
}
