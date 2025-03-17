import { forwardRef, type ComponentPropsWithRef, type ReactNode } from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Label } from '@rn-primitives/context-menu'
import { Input } from '@/reusables/components/ui/input'
import { cn } from '@/reusables/lib/utils'
import { CloseIcon } from './icons'

type CustomInputProps = {
    label?: string | JSX.Element
    disabled?: boolean
    suffix?: JSX.Element | null
    clearable?: boolean
    value?: string | number
    onChangeText: (text: string) => void
    labelClassName?: string
} & ComponentPropsWithRef<typeof TextInput>

export const CustomInput = forwardRef<TextInput, CustomInputProps>(function CustomInput(props, ref): ReactNode {
    const { label, disabled, labelClassName, suffix, clearable, value, onChangeText, ...rest } = props

    return (
        <View className="flex flex-col gap-2 w-full">
            {Boolean(label) && <Label className={cn('text-eva-black-300', labelClassName)}>{label}</Label>}

            <View className="relative w-full">
                <Input
                    ref={ref}
                    value={value !== undefined && value !== null ? String(value) : ''}
                    onChangeText={onChangeText}
                    className={cn(
                        'h-11 border-2 border-eva-white-500 text-eva-black-300 rounded-xl py-2 pl-4 pr-12 focus:border-eva-blue-500'
                    )}
                    editable={!disabled}
                    {...rest}
                />

                <View className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    {clearable && !!value && (
                        <TouchableOpacity onPress={() => onChangeText('')}>
                            <CloseIcon size={20} className="text-eva-black-300" />
                        </TouchableOpacity>
                    )}
                    {suffix}
                </View>
            </View>
        </View>
    )
})
