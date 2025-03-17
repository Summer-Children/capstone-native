import { useMutation } from '@apollo/client'
import { UPDATE_BUILDING } from './edit-building'
import type { Maybe, UpdateBuildingMutation, UpdateBuilding } from '@gqlgen/graphql'

interface UseUpdateBuilding {
    update(payload: UpdateBuilding): Promise<Maybe<string>>
    data: Maybe<UpdateBuildingMutation['updateBuilding']>
    loading: boolean
}

export function useUpdateBuilding(): UseUpdateBuilding {
    const [mutation, { data, loading }] = useMutation(UPDATE_BUILDING)

    const update = async (payload: UpdateBuilding): Promise<Maybe<string>> => {
        try {
            const res = await mutation({ variables: { input: payload } })
            return res.data?.updateBuilding?.id ?? null
        } catch (error) {
            console.error('Mutation error:', error)
            return null
        }
    }

    return {
        data: data?.updateBuilding ?? null,
        loading,
        update
    }
}
