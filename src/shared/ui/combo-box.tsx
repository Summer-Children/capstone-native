import React from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'

interface ComboBoxProps {
    label?: string
    placeholder: string
    options: string[]
    value?: string
    onChangeText?: (text: string) => void
    onSelect: (item: string) => void
    isDropdownVisible?: boolean
    setDropdownVisible?: (visible: boolean) => void
}

export const ComboBox: React.FC<ComboBoxProps> = ({
    label,
    placeholder,
    options,
    value,
    onChangeText,
    onSelect,
    isDropdownVisible,
    setDropdownVisible
}) => {
    const filteredOptions = value
        ? options.filter(option => option.toLowerCase().includes(value.toLowerCase()))
        : options

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss()
                setDropdownVisible?.(false)
            }}
        >
            <View className="mb-4">
                {label && <Text className="text-sm font-bold">{label}</Text>}
                <View className="border border-gray-300 rounded-md p-3 bg-white">
                    <TextInput
                        placeholder={placeholder}
                        value={value}
                        onChangeText={text => {
                            onChangeText?.(text)
                            setDropdownVisible?.(filteredOptions.length > 0)
                        }}
                        onFocus={() => setDropdownVisible?.(true)}
                    />
                </View>

                {isDropdownVisible && filteredOptions.length > 0 && (
                    <View className="border border-gray-300 rounded-md bg-white mt-2 max-h-40 overflow-hidden">
                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            style={{ maxHeight: 160 }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    className="p-3 border-b border-gray-200"
                                    onPress={() => {
                                        onSelect(item)
                                        onChangeText?.(item)
                                        setDropdownVisible?.(false)
                                    }}
                                >
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
        </TouchableWithoutFeedback>
    )
}
