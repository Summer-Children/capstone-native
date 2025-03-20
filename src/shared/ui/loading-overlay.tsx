import { Text } from '@/reusables/components/ui/text'
import { ReactNode } from 'react'
import { Image, View } from 'react-native'
import logoGif from '@assets/images/logo.gif'

type LoadingOverlayProps = {
    children: React.ReactNode
}

export const LoadingOverlay = ({ children }: LoadingOverlayProps): ReactNode => (
    <View className="absolute inset-0  bg-white flex items-center justify-center">
        <Image source={logoGif} className="w-32 h-32 rounded-full" alt="loading" />
        <Text className="text-3xl font-bold">{children}</Text>
    </View>
)
