import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import { Redirect, router, Stack } from 'expo-router'
import { useReactiveVar } from '@apollo/client'
import { tokenVar } from '@shared/lib/auth/provider'

export default function App() {
    const token = useReactiveVar(tokenVar)
     if (token) {
            return <Redirect href="/(app)" />
        }

    return (
        <>
            <Stack.Screen  />
            <Button onPress={() => router.replace('./(auth)/signup')}>
                <Text>Sign Up</Text>
            </Button>
            <Button
                onPress={() => {
                    router.replace('./(auth)/login')
                }}
            >
                <Text>Log In</Text>
            </Button>
        </>
    )
}
