import { useRouter, useSegments } from 'expo-router'
import { ReactNode } from 'react'
import { Pressable } from 'react-native'
import { Text } from '@/reusables/components/ui/text'

export default function CloseButton(): ReactNode {
    const router = useRouter()
    const segments = useSegments()

    const handleClose = (): void => {
        if (segments.length > 1) {
            router.push('/(app)')
        } else {
            router.push('../')
        }
    }

    return (
        <Pressable onPress={handleClose}>
            <Text className="text-eva-blue-500 text-xl">Close</Text>
        </Pressable>
    )
}
