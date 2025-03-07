import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { Stack, useRouter } from 'expo-router'
import React, { ReactNode, useState } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { components as initialComponents } from '../../../entities/components/model/components-list'
import { ComboBox } from '../../../shared/ui/combo-box'

export function AddComponent(): ReactNode {
    const [components] = useState(initialComponents)
    const [componentInput, setComponentInput] = useState<string>('')
    const [categoryInput, setCategoryInput] = useState<string>('')
    const [sectionInput, setSectionInput] = useState<string>('')

    const [componentDropdownVisible, setComponentDropdownVisible] = useState(false)
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false)
    const [sectionDropdownVisible, setSectionDropdownVisible] = useState(false)

    const componentNames = components.map(comp => comp.name)
    const categories = Array.from(new Set(components.map(comp => comp.category)))
    const sections = Array.from(new Set(components.map(comp => comp.section)))

    const isRegisteredComponent =
        componentInput && componentNames.some(name => name.toLowerCase() === componentInput.toLowerCase())
    const isRegisteredCategory =
        categoryInput && categories.some(category => category.toLowerCase() === categoryInput.toLowerCase())
    const isRegisteredSection =
        sectionInput && sections.some(section => section.toLowerCase() === sectionInput.toLowerCase())

    const router = useRouter()

    return (
        <>
            <Stack.Screen options={{ headerBackVisible: false }} />
            <View className="flex-1">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Header headerText="Add a building component" headerDescription="Enter your component name" />
                        <ComboBox
                            label="Component name"
                            placeholder="Enter component name"
                            options={componentNames}
                            value={componentInput}
                            onChangeText={text => setComponentInput(text)}
                            onSelect={item => setComponentInput(item)}
                            isDropdownVisible={componentDropdownVisible}
                            setDropdownVisible={setComponentDropdownVisible}
                        />

                        {componentInput && !componentDropdownVisible && !isRegisteredComponent && (
                            <>
                                <ComboBox
                                    label="Category"
                                    placeholder="Select a category"
                                    options={categories}
                                    value={categoryInput ?? undefined}
                                    onChangeText={text => setCategoryInput(text)}
                                    onSelect={item => setCategoryInput(item)}
                                    isDropdownVisible={categoryDropdownVisible}
                                    setDropdownVisible={setCategoryDropdownVisible}
                                />
                                {!isRegisteredCategory && categoryInput && !categoryDropdownVisible && (
                                    <Text className="text-red-500">Select a category</Text>
                                )}
                                <ComboBox
                                    label="Section"
                                    placeholder="Select a section"
                                    options={sections}
                                    value={sectionInput ?? undefined}
                                    onChangeText={text => setSectionInput(text)}
                                    onSelect={item => setSectionInput(item)}
                                    isDropdownVisible={sectionDropdownVisible}
                                    setDropdownVisible={setSectionDropdownVisible}
                                />
                                {!isRegisteredSection && sectionInput && !sectionDropdownVisible && (
                                    <Text className="text-red-500">Select a section</Text>
                                )}
                            </>
                        )}
                    </View>
                </TouchableWithoutFeedback>

                <Footer>
                    <Button
                        variant="default"
                        disabled={
                            !isRegisteredComponent && (!componentInput || !isRegisteredCategory || !isRegisteredSection)
                        }
                        onPress={() => {
                            const selectedComponent = components.find(
                                comp => comp.name.toLowerCase() === componentInput.toLowerCase()
                            )
                            const componentId = selectedComponent ? selectedComponent.id : ''
                            router.push(`./${componentId}/add-description`)
                        }}
                    >
                        <Text>Save component</Text>
                    </Button>
                </Footer>
            </View>
        </>
    )
}
