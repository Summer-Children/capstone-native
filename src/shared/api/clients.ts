import { ApolloClient, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { tokenVar } from '@shared/lib/auth/provider'
import * as SecureStore from 'expo-secure-store'
import { createUploadLink } from 'apollo-upload-client'

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? ''
console.log('API_URL:', API_URL)

const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync('authToken')
    return {
        headers: {
            ...(headers as Record<string, string>),
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        for (const { extensions } of graphQLErrors) {
            if (extensions?.code === 'UNAUTHENTICATED') {
                tokenVar(null)
                void SecureStore.deleteItemAsync('authToken').then(() => window.location.reload())
            }
        }
    }
    if (networkError) console.error(`[Network error]: ${networkError}`)
})

const uploadLink = createUploadLink({ uri: API_URL, fetch })

export const apolloClient = new ApolloClient({
    link: from([authLink, errorLink, uploadLink]),
    cache: new InMemoryCache()
})
