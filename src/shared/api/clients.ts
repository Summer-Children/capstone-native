import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onError } from "@apollo/client/link/error";


const API_URL = Constants.expoConfig?.extra?.API_URL ?? '';

const httpLink = createHttpLink({
    uri: API_URL,
});

const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('authToken');
    return {
        headers: {
            ...(headers as Record<string, string>),
            Authorization: token ?? ''
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path, extensions }) =>
            console.error(`[GraphQL error]: Message: ${message}, Extensions: ${JSON.stringify(extensions)}, Location: ${locations}, Path: ${path}`)
        );
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
});


export const apolloClient = new ApolloClient({
    link: authLink.concat(errorLink).concat(httpLink),
    cache: new InMemoryCache(),
});
