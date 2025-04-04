import { Button } from '@/reusables/components/ui/button'
import BottomButton from '@/src/shared/ui/bottom-button'
import React, { forwardRef, useRef } from 'react'
import { View, TouchableOpacity, ViewStyle } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet'

interface Props {
    title: string
    children: React.ReactNode
    onApply: () => void
    onReset: () => void
    containerStyle?: ViewStyle
}

export const CustomActionSheet = forwardRef<ActionSheetRef, Props>(
    ({ title, children, onApply, onReset, containerStyle }, ref) => {
        const actionSheetRef = useRef<ActionSheetRef>(null)
        React.useImperativeHandle(ref, () => actionSheetRef.current as ActionSheetRef)

        return (
            <ActionSheet ref={actionSheetRef} containerStyle={containerStyle} gestureEnabled>
                <View className="flex gap-8 px-5 py-2">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-2xl font-semibold text-eva-black-900">{title}</Text>
                        <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
                            <Text className="text-eva-blue-500 font-semibold">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="gap-2">{children}</View>
                    <View className="flex gap-2 mb-4">
                        <BottomButton
                            onPress={() => {
                                onApply()
                                actionSheetRef.current?.hide()
                            }}
                        >
                            Apply
                        </BottomButton>

                        <Button className="bg-white" onPress={onReset}>
                            <Text className="text-eva-blue-500 font-semibold">Reset</Text>
                        </Button>
                    </View>
                </View>
            </ActionSheet>
        )
    }
)
