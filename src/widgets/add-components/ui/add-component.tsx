import { Button } from '@/reusables/components/ui/button'
import { Text } from '@/reusables/components/ui/text'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { type ReactNode, useState } from 'react'
import { Alert, Keyboard, TouchableWithoutFeedback, View } from 'react-native'
import { components as initialComponents } from '@/src/entities/component/model/components-list'
import { ComboBox } from '@/src/shared/ui/combo-box'
import { useMutation } from '@apollo/client'
import { CREATE_COMPONENT } from '@/src/entities/component/hook/components'
import React from 'react'

export function AddComponent(): ReactNode {
    const { buildingId, assessmentReportId } = useLocalSearchParams()
    const [components] = useState(initialComponents)
    const [componentInput, setComponentInput] = useState<{ id: string; name: string }>({ id: '', name: '' })
    const [searchComponent, setSearchComponent] = useState<string>('')
    // const [categoryInput, setCategoryInput] = useState<string>('')
    // const [sectionInput, setSectionInput] = useState<string>('')
    const [createComponent] = useMutation(CREATE_COMPONENT)

    const handleCreateComponent = async (): Promise<void> => {
        if (!componentInput) return
        const selectedComponent = components.find(comp => comp.id === componentInput.id)
        if (!selectedComponent) {
            Alert.alert('Component not found')
            return
        }

        await createComponent({
            variables: {
                component: {
                    name: selectedComponent.name,
                    category: selectedComponent.category,
                    section: selectedComponent.section,
                    buildingId: buildingId as string
                }
            },
            onCompleted: data => {
                router.push(
                    `/buildings/${buildingId}/assessments/${assessmentReportId}/components/${data.res.id}/add-component-report`
                )
            }
        })
    }

    const [componentDropdownVisible, setComponentDropdownVisible] = useState(false)
    // const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false)
    // const [sectionDropdownVisible, setSectionDropdownVisible] = useState(false)

    const componentNames = components.map(comp => comp.name)
    // const categories = Array.from(new Set(components.map(comp => comp.category)))
    // const sections = Array.from(new Set(components.map(comp => comp.section)))

    const isRegisteredComponent =
        componentInput && componentNames.some(name => name.toLowerCase() === componentInput.name.toLowerCase())
    // const isRegisteredCategory = useMemo(
    //     () => categoryInput && categories.some(category => category.toLowerCase() === categoryInput.toLowerCase()),
    //     [categoryInput, categories]
    // )
    // const isRegisteredSection = useMemo(
    //     () => sectionInput && sections.some(section => section.toLowerCase() === sectionInput.toLowerCase()),
    //     [sectionInput, sections]
    // )

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
                            options={components.map(comp => ({ id: comp.id, name: comp.name }))}
                            value={searchComponent}
                            onChangeText={text => setSearchComponent(text)}
                            onSelect={item => setComponentInput({ id: item.id, name: item.name })}
                            isDropdownVisible={componentDropdownVisible}
                            setDropdownVisible={setComponentDropdownVisible}
                        />

                        {/* {componentInput && !componentDropdownVisible && !isRegisteredComponent && (
                            <>
                                <ComboBox
                                    label="Category"
                                    placeholder="Select a category"
                                    options={categories.map(category => ({ id: category, name: category }))}
                                    value={categoryInput ?? undefined}
                                    onChangeText={text => setCategoryInput(text)}
                                    onSelect={item => setCategoryInput(item.name)}
                                    isDropdownVisible={categoryDropdownVisible}
                                    setDropdownVisible={setCategoryDropdownVisible}
                                />
                                {!isRegisteredCategory && categoryInput && !categoryDropdownVisible && (
                                    <Text className="text-red-500">Select a category</Text>
                                )}
                                <ComboBox
                                    label="Section"
                                    placeholder="Select a section"
                                    options={sections.map(section => ({ id: section, name: section }))}
                                    value={sectionInput ?? undefined}
                                    onChangeText={text => setSectionInput(text)}
                                    onSelect={item => setSectionInput(item.name)}
                                    isDropdownVisible={sectionDropdownVisible}
                                    setDropdownVisible={setSectionDropdownVisible}
                                />
                                {!isRegisteredSection && sectionInput && !sectionDropdownVisible && (
                                    <Text className="text-red-500">Select a section</Text>
                                )}
                            </>
                        )} */}
                    </View>
                </TouchableWithoutFeedback>

                <Footer>
                    <Button
                        variant="default"
                        disabled={!isRegisteredComponent && !componentInput}
                        onPress={async () => {
                            await handleCreateComponent()
                        }}
                    >
                        <Text>Save component</Text>
                    </Button>
                </Footer>
            </View>
        </>
    )
}
