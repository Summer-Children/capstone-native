import { useMutation } from '@apollo/client'
import { CREATE_BUILDING } from './create-building'
import type { Maybe, CreateBuilding, CreateBuildingMutation } from '@gqlgen/graphql'

interface UseCreateBuilding {
    create(payload: CreateBuilding): Promise<Maybe<string>>
    loading: boolean
    data: Maybe<CreateBuildingMutation['createBuilding']>
}

export function useCreateBuilding(): UseCreateBuilding {
    const [mutation, { data, loading }] = useMutation(CREATE_BUILDING)

    return {
        data: data?.createBuilding ?? null,
        loading,
        create: async (payload): Promise<Maybe<string>> => {
            const res = await mutation({ variables: { input: payload } })
            return res.data?.createBuilding?.id ?? null
        }
    }
}
