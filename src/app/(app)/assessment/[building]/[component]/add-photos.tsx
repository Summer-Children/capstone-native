import { Button } from '@/reusables/components/ui/button'
import { AddPhoto } from '@/src/features/add-photo/ui'
import Header from '@/src/shared/ui/header'
import XButton from '@/src/shared/ui/x-button'
import { Stack, useRouter } from 'expo-router'
import React, { ReactNode } from 'react'
import { Text } from 'reusables/components/ui/text'

export default function AddPhotosPage(): ReactNode {
    const router = useRouter()

    const handleContinue = (): void => {
        try {
            router.push(`./add-action`)
        } catch (error) {
            console.error('Error saving photos:', error)
        }
    }

    return (
        <>
            <Stack.Screen options={{ headerRight: () => <XButton /> }} />
            <Header headerText="Add Component photos"></Header>
            <AddPhoto maxSelection={5} onSelectPhotos={() => {}}></AddPhoto>

            <Button onPress={handleContinue}>
                <Text>Continue</Text>
            </Button>
        </>
    )
}
