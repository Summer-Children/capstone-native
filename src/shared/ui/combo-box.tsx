import { View, TextInput, Keyboard, BackHandler, Pressable } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { useEffect, useState } from 'react'
import { SearchIcon } from './icons'

interface ComboBoxProps {
    label?: string
    placeholder: string
    options: { id: string; val: string; fiscalYear?: number }[]
    value?: string
    onChangeText: (text: string) => void
    onSelect: (item: { id: string; val: string; fiscalYear?: number }) => void
    isDropdownVisible?: boolean
    setDropdownVisible?: (visible: boolean) => void
    prefixIcon?: React.ReactNode
    trailingIcon?: React.ReactNode
    notFoundMsg?: string
}

export const ComboBox: React.FC<ComboBoxProps> = ({
    label,
    placeholder,
    options,
    value,
    onChangeText,
    onSelect,
    isDropdownVisible,
    setDropdownVisible,
    prefixIcon,
    trailingIcon,
    notFoundMsg
}) => {
    const filteredOptions = value
        ? options.filter(option => option.val.toLowerCase().includes(value.toLowerCase()))
        : options

    const handleOutsidePress = (): void => {
        Keyboard.dismiss()
        setDropdownVisible?.(false)
    }

    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (isDropdownVisible) {
                handleOutsidePress()
                return true
            }
            return false
        })

        return (): void => backHandler.remove()
    }, [isDropdownVisible])

    return (
        <View className="mb-4">
            {label && <Text className="text-sm text-eva-black-300 mb-1 ">{label}</Text>}
            <View className={`border rounded-xl p-3 bg-white ${isFocused ? 'border-eva-blue-500' : 'border-gray-300'}`}>
                <View className="flex-row items-center gap-2">
                    <SearchIcon size={20} className="text-gray-400" />
                    <TextInput
                        placeholder={placeholder}
                        defaultValue={value}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={text => {
                            onChangeText(text)
                            setDropdownVisible?.(filteredOptions.length > 0)
                        }}
                        onFocus={() => {
                            setIsFocused(true)
                            setDropdownVisible?.(true)
                        }}
                        className="flex-1"
                    />
                </View>
            </View>
            {isDropdownVisible && filteredOptions.length > 0 && (
                <View className="flex flex-col gap-2 rounded-md bg-white mt-2 max-h-80 overflow-hidden">
                    <View className="flex mt-2 flex-row items-center gap-2">
                        <Text className="text-sm text-eva-black-300">Suggested options</Text>
                    </View>

                    {isDropdownVisible && filteredOptions.length > 0 && (
                        <View className="bg-white mt-1 rounded-md shadow-sm">
                            {filteredOptions.slice(0, 3).map((item, index) => (
                                <Pressable
                                    key={`${item.id}-${index}`}
                                    onPress={() => {
                                        onSelect(item)
                                    }}
                                    className="flex flex-row items-center justify-between py-3 px-2 active:bg-gray-100"
                                >
                                    <View className="flex-row items-center gap-2">
                                        {prefixIcon && <View>{prefixIcon}</View>}
                                        <Text>{item.val}</Text>
                                    </View>
                                    {trailingIcon && <View>{trailingIcon}</View>}
                                </Pressable>
                            ))}
                        </View>
                    )}
                </View>
            )}
            {notFoundMsg && filteredOptions.length === 0 && (
                <View className="flex flex-row items-center justify-between py-3 px-2 active:bg-gray-100">
                    <Text>{notFoundMsg}</Text>
                </View>
            )}
        </View>
    )
}
