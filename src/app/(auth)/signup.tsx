import { Button } from '@/reusables/components/ui/button'
import { Input } from '@/reusables/components/ui/input'
import { Text } from '@/reusables/components/ui/text'
import { useMutation } from '@apollo/client'
import { Link, router } from 'expo-router'
import { ReactNode, useState } from 'react'
import { View } from 'react-native'
import { graphql } from '../../_gqlgen'
import Footer from '../../shared/ui/footer'
import Header from '../../shared/ui/header'

const USER_SIGNUP = graphql(`
    mutation SignUp($input: SignUp!) {
        signUp(input: $input)
    }
`)

export default function SignUpPage(): ReactNode {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [signUp] = useMutation(USER_SIGNUP, {
        onError: err => {
            setErrorMessage(err.message)
        }
    })

    const handleChange = (key: string, value: string): void => {
        setValues({ ...values, [key]: value })
    }

    const handleSubmit = async (): Promise<void> => {
        const { data } = await signUp({ variables: { input: values } })
        if (data) router.replace('./login')
    }

    return (
        <View className="flex-1">
            <Header headerText="Sign Up"></Header>
            <View className="flex flex-col gap-4">
                <Input
                    placeholder="Email"
                    value={values.email}
                    onChangeText={text => handleChange('email', text)}
                    aria-labelledby="Email"
                    aria-errormessage="inputError"
                />
                <Input
                    placeholder="Name"
                    value={values.name}
                    onChangeText={text => handleChange('name', text)}
                    aria-labelledby="Name"
                    aria-errormessage="inputError"
                />
                <Input
                    placeholder="Password"
                    value={values.password}
                    onChangeText={text => {
                        handleChange('password', text)
                    }}
                    aria-labelledby="Password"
                    aria-errormessage="inputError"
                />
            </View>

            {errorMessage && <Text className="text-red-500">Error: {errorMessage}</Text>}
            <Footer>
                <Button onPress={handleSubmit}>
                    <Text>Sign Up</Text>
                </Button>
                <Text>
                    Already have an account?{' '}
                    <Link href="./login" className="font-bold underline">
                        Log in
                    </Link>
                </Text>
                <Text>By signing up, you agree to our Terms and Privacy policy</Text>
            </Footer>
        </View>
    )
}
