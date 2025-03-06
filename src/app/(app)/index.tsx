import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { tokenVar } from '@shared/lib/auth/provider'
import * as SecureStore from 'expo-secure-store'
import { ReactNode } from 'react'
import { View } from 'react-native'

export default function Homepage(): ReactNode {
    const logout = async (): Promise<void> => {
        tokenVar(null)
        await SecureStore.deleteItemAsync('authToken')
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>This is a home page</Text>
            </View>
            <Button onPress={logout}>
                <Text>Log out</Text>
            </Button>
        </>
    )
}
