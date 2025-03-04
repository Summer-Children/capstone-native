import { createContext, useContext, useEffect, useCallback, useState, type PropsWithChildren } from 'react'
import { makeVar, useReactiveVar } from '@apollo/client'
import * as SecureStore from 'expo-secure-store'
import { User } from '@/src/_gqlgen/graphql'
import { graphql } from '@gqlgen'
import { useQuery } from '@apollo/client'
import { Redirect, router } from 'expo-router'
// TODO: Replace the commented out user related code when the user query is implemented

// Use Apollo reactive variable to make the authToken globally available in the app
export const tokenVar = makeVar<string | null>(null)

export type AuthContextType = {
    isTokenLoading: boolean
    // user: User | null
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

// const FETCH_USER = graphql(`
//   query User {
//       user {
//           id
//           name
//           email
//       }
//   }
// `)

export function AuthProvider({ children }: PropsWithChildren) {
    const [isTokenLoading, setIsTokenLoading] = useState(true)

    // const { data } = useQuery(FETCH_USER, {
    //   fetchPolicy: 'cache-and-network',
    //   onCompleted: async (data) => {
    //       if (!dataF.user.id) {
    //        await SecureStore.deleteItemAsync("authToken")
    //         tokenVar(null)
    //           return <Redirect href="/log-in" />
    //       }
    //   }
    // })

    useEffect(() => {
        SecureStore.getItemAsync('authToken').then(value => {
            tokenVar(value)
        })
        setIsTokenLoading(false)
    }, [])

    return (
        <AuthContext.Provider
            value={{
                isTokenLoading,
                // user: data?.user || null,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
