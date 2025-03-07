import { Stack } from 'expo-router'
import { AddComponent } from '@widgets/add-components/ui/add-component'
import XButton from '@/src/shared/ui/x-button'
import { ReactNode } from 'react'

export default function AddComponentPage(): ReactNode {
    return (
        <>
            <Stack.Screen options={{ headerRight: () => <XButton /> }} />
            <AddComponent />
        </>
    )
}
