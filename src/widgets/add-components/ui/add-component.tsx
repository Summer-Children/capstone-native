import { Text } from '@/reusables/components/ui/text'
import { CREATE_COMPONENT } from '@/src/entities/component/hook/components'
import { components as initialComponents } from '@/src/entities/component/model/components-list'
import BottomButton from '@/src/shared/ui/bottom-button'
import { ComboBox } from '@/src/shared/ui/combo-box'
import Footer from '@/src/shared/ui/footer'
import Header from '@/src/shared/ui/header'
import { ArrowIcon } from '@/src/shared/ui/icons'
import { useMutation } from '@apollo/client'
import { Stack, useRouter } from 'expo-router'
import { default as React, type ReactNode, useState } from 'react'
import { Alert, Keyboard, TouchableWithoutFeedback, View } from 'react-native'

type Props = {
    buildingId: string
    assessmentReportId: string
}

export function AddComponent({ buildingId, assessmentReportId }: Props): ReactNode {
    const [components] = useState(initialComponents)
    const [componentInput, setComponentInput] = useState<{ id: string; name: string }>({ id: '', name: '' })
    const [searchComponent, setSearchComponent] = useState<string>('')
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
                    buildingId: buildingId,
                    actionFrequency: selectedComponent.actionFrequency,
                    unitRate: selectedComponent.unitRate
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

    const componentNames = components.map(comp => comp.name)

    const isRegisteredComponent =
        componentInput && componentNames.some(name => name.toLowerCase() === componentInput.name.toLowerCase())

    const router = useRouter()

    return (
        <>
            <Stack.Screen options={{ headerBackVisible: false }} />
            <View className="flex-1">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View>
                        <Header headerText="Add a component" />
                        <ComboBox
                            label="Component name"
                            placeholder="Enter component name"
                            options={components.map(comp => ({ id: comp.id, val: comp.name }))}
                            value={searchComponent}
                            onChangeText={text => setSearchComponent(text)}
                            onSelect={item => {
                                setComponentInput({ id: item.id, name: item.val })
                                setSearchComponent(item.val)
                            }}
                            isDropdownVisible={componentDropdownVisible}
                            setDropdownVisible={setComponentDropdownVisible}
                            trailingIcon={<ArrowIcon direction="outward" color="#1c1d1f" width={18} height={18} />}
                            notFoundMsg={`${searchComponent} wasn’t found, double check your component name and try again`}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <Footer>
                    <BottomButton
                        variant="default"
                        disabled={!isRegisteredComponent && !componentInput}
                        onPress={async () => {
                            await handleCreateComponent()
                        }}
                    >
                        <Text>Continue</Text>
                    </BottomButton>
                </Footer>
            </View>
        </>
    )
}
