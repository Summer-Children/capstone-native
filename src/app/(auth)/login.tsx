import { Input } from '@/reusables/components/ui/input'
import { Text } from '@/reusables/components/ui/text'
import BottomButton from '@/src/shared/ui/bottom-button'
import { useMutation } from '@apollo/client'
import { tokenVar } from '@shared/lib/auth/provider'
import { Link, router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { ReactNode, useState } from 'react'
import { View } from 'react-native'
import { graphql } from '../../_gqlgen'
import Footer from '../../shared/ui/footer'
import Header from '../../shared/ui/header'

const USER_LOGIN = graphql(`
    mutation SignIn($input: SignIn!) {
        signIn(input: $input)
    }
`)

export default function LoginPage(): ReactNode {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [signIn] = useMutation(USER_LOGIN, {
        onError: err => {
            setErrorMessage(err.message)
        }
    })

    const handleChange = (key: string, value: string): void => {
        setValues({ ...values, [key]: value })
    }

    const handleSubmit = async (): Promise<void> => {
        const data = await signIn({ variables: { input: values } })

        if (!data.data?.signIn) {
            setErrorMessage('Failed to get token')
            return
        }

        tokenVar(data.data.signIn)
        await SecureStore.setItemAsync('authToken', data.data.signIn)
        router.replace('/(app)')
    }

    return (
        <View className="flex-1 flex-col gap-4 px-6 ">
            <Header headerText="Log In"></Header>
            <Input
                placeholder="Email address"
                value={values.email}
                onChangeText={text => handleChange('email', text)}
                keyboardType="email-address"
            />
            <Input
                placeholder="Password"
                value={values.password}
                onChangeText={text => handleChange('password', text)}
                secureTextEntry
            />

            {errorMessage && <Text className="text-red-500">Error: {errorMessage}</Text>}
            <Footer className="px-6">
                <BottomButton onPress={handleSubmit}>
                    <Text>Login</Text>
                </BottomButton>
                <Text>
                    Don't have an account?{' '}
                    <Link href="./signup" className="font-bold underline">
                        Sign up
                    </Link>
                </Text>
                <Text>By signing up, you agree to our Terms and Privacy policy</Text>
            </Footer>
        </View>
    )
}
