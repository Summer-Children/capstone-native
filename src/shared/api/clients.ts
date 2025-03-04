import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { tokenVar } from '@shared/lib/auth/provider'
import * as SecureStore from 'expo-secure-store'

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? ''
console.log('API_URL:', API_URL)

const httpLink = createHttpLink({
    uri: API_URL
})

const authLink = setContext(async (_, { headers }) => {
    const token = await SecureStore.getItemAsync('authToken')
    return {
        headers: {
            ...(headers as Record<string, string>),
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const errorLink = onError( ({ graphQLErrors, networkError }) => {

    if (graphQLErrors) {
        for (const { extensions } of graphQLErrors) {
            if (extensions?.code === 'UNAUTHENTICATED') {
                tokenVar(null)
                SecureStore.deleteItemAsync('authToken').then(() => { window.location.reload()})
            }
        }
    }
    if (networkError) console.error(`[Network error]: ${networkError}`)
})

export const apolloClient = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache()
})
