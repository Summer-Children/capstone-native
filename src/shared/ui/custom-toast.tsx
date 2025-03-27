import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { View, TouchableOpacity, Animated, LayoutChangeEvent } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import Toast, { ToastConfig } from 'react-native-toast-message'
import { CloseIcon } from './icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const showToast = (message: string, type: 'success', duration = 3000): void => {
    Toast.show({
        type,
        text1: message,
        visibilityTime: duration,
        position: 'bottom',
        autoHide: true
    })
}

export const hideToast = (): void => {
    Toast.hide()
}

const ToastContainer = ({
    text1,
    onPress,
    duration = 3000
}: {
    text1: string
    onPress: () => void
    duration?: number
}): ReactNode => {
    const progress = useRef(new Animated.Value(1)).current
    const [containerWidth, setContainerWidth] = useState(0)
    const insets = useSafeAreaInsets()

    const handleLayout = (e: LayoutChangeEvent): void => {
        const { width } = e.nativeEvent.layout
        setContainerWidth(width)
    }

    useEffect(() => {
        if (containerWidth > 0) {
            progress.setValue(1)
            Animated.timing(progress, {
                toValue: 0,
                duration,
                useNativeDriver: false
            }).start()
        }
    }, [containerWidth, duration])

    const animatedWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, containerWidth]
    })

    return (
        <View
            className="absolute rounded-xl mb-3 bg-[#E4FFF4] flex justify-between overflow-hidden"
            style={{
                bottom: insets.bottom + 8
            }}
            onLayout={handleLayout}
        >
            <View className="flex-1 flex-row justify-between items-center px-4 pt-3">
                <Text className="text-base font-semibold text-eva-black-900">{text1}</Text>
                <TouchableOpacity onPress={onPress} className="ml-3">
                    <CloseIcon color="#1B3224" size={20} />
                </TouchableOpacity>
            </View>

            <View className="h-1 mt-3">
                <Animated.View className="bg-[#489766] h-full rounded-full" style={{ width: animatedWidth }} />
            </View>
        </View>
    )
}

export const toastConfig: ToastConfig = {
    success: (toast): ReactNode => (
        <ToastContainer text1={toast.text1 ?? ''} onPress={() => toast.hide?.()} duration={3000} />
    )
}

export const AppToast = (): ReactNode => <Toast config={toastConfig} />
