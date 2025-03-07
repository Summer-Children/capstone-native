import { useRouter, useSegments } from 'expo-router'
import { Pressable, Text } from 'react-native'
import { X } from 'lucide-react-native'
import { ReactNode } from 'react'

export default function XButton(): ReactNode {
    const router = useRouter()
    const segments = useSegments()

    const handleClose = (): void => {
        if (segments.length > 1) {
            router.push('/(app)')
        } else {
            router.push('../')
        }
    }

    console.log('segments', segments)

    return (
        <Pressable onPress={handleClose}>
            <Text>
                <X />
            </Text>
        </Pressable>
    )
}
