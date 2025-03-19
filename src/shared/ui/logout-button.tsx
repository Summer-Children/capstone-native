import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { tokenVar } from '@shared/lib/auth/provider'
import * as SecureStore from 'expo-secure-store'
import { ReactNode } from 'react'

export default function LogoutButton(): ReactNode {
    const logout = async (): Promise<void> => {
        tokenVar(null)
        await SecureStore.deleteItemAsync('authToken')
    }

    return (
        <>
            <Button onPress={logout}>
                <Text>Log out</Text>
            </Button>
        </>
    )
}
