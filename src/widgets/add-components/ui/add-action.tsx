import { Input } from '@/reusables/components/ui/input'
import { Label } from '@/reusables/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/reusables/components/ui/select'
import { Text } from '@/reusables/components/ui/text'
import { ComponentReportPriority, type UpdateComponent, type UpdateComponentReport } from '@/src/_gqlgen/graphql'
import { GET_ASSESSMENT_REPORT_FOR_PREVIEW } from '@/src/entities/assessment-report/hook'
import { GET_COMPONENT_REPORT, UPDATE_COMPONENT_REPORT } from '@/src/entities/component-report/hook/component-report'
import { GET_COMPONENT, UPDATE_COMPONENT } from '@/src/entities/component/hook/components'
import BottomButton from '@/src/shared/ui/bottom-button'
import Footer from '@/src/shared/ui/footer'
import { CustomInput } from '@/src/shared/ui/text-input'
import { useMutation, useQuery } from '@apollo/client'
import DollarSvg from '@assets/images/dollar.svg'
import { GET_BUILDING } from '@entities/building/hook'
import { TagList } from '@shared/ui/tag-list'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect, useState, type ReactNode } from 'react'
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    View,
    ScrollView
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {
    componentReportId: string
    componentId: string
}

type buildingItem = {
    year: number | null | undefined
}

export default function AddAction({ componentReportId, componentId }: Props): ReactNode {
    const [componentReportItems, setComponentReportItems] = useState<UpdateComponentReport>()
    const [componentItems, setComponentItems] = useState<UpdateComponent>()
    const [buildingItem, setBuildingItem] = useState<buildingItem>()
    const [quantityUnit, setQuantityUnit] = useState<string>('Unit')

    const insets = useSafeAreaInsets()

    const { buildingId, assessmentReportId } = useLocalSearchParams()

    const { data: componentReportData, loading: componentReportLoading } = useQuery(GET_COMPONENT_REPORT, {
        variables: {
            componentReportId: componentReportId.toString()
        },
        onCompleted: d => {
            setComponentReportItems({
                id: d?.componentReport.id,
                action: d?.componentReport.action ?? '',
                condition: d?.componentReport.condition ?? '',
                priority: d?.componentReport.priority ?? ComponentReportPriority.Low,
                quantityNeeded: d?.componentReport.quantityNeeded ?? 0,
                yearReviewed: d?.componentReport.yearReviewed ?? 0,
                note: d?.componentReport.note ?? ''
            })
        },
        onError: e => {
            console.error('Error fetching component report', e)
        }
    })
    const { data: componentData, loading: componentLoading } = useQuery(GET_COMPONENT, {
        variables: {
            componentId: componentId
        },
        onCompleted: d => {
            setComponentItems(d?.res)
        },
        onError: e => {
            console.error('Error fetching component', e)
        }
    })
    const [updateComponentReport] = useMutation(UPDATE_COMPONENT_REPORT)
    const [updateComponent] = useMutation(UPDATE_COMPONENT)
    const { data: buildingData, loading: buildingDataLoading } = useQuery(GET_BUILDING, {
        variables: {
            id: buildingId as string
        },
        onCompleted: d => {
            setBuildingItem({
                year: d?.res.year
            })
        },
        onError: e => {
            console.error('Error fetching building', e)
        }
    })

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (!componentReportItems) {
                console.error('No component report items found')
                return
            }
            const { id, action, condition, priority, quantityNeeded, yearReviewed, note } = componentReportItems
            try {
                const res = await updateComponentReport({
                    variables: {
                        input: {
                            id,
                            action,
                            condition,
                            priority,
                            quantityNeeded,
                            yearReviewed,
                            note
                        }
                    },
                    // NOTE: I added the following refetchQueries because I need to reflect the latest changes in this GET_ASSESSMENT_REPORT_FOR_PREVIEW query, which will be called in the review-depreviation screen
                    refetchQueries: [
                        {
                            query: GET_ASSESSMENT_REPORT_FOR_PREVIEW,
                            variables: {
                                id: assessmentReportId
                            }
                        }
                    ]
                })
                // Please leave this console log for later debugging purposes
                console.log('Successfully updated component report items:', res.data)
            } catch (error) {
                console.error('Error updating component report:', error)
            }
        }, 600)
        return (): void => clearTimeout(timeout)
    }, [componentReportItems])

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (!componentItems) {
                console.error('No component items found')
                return
            }
            const {
                id,
                lastActionYear,
                nextActionYear,
                name,
                category,
                section,
                yearInstalled,
                unitRate,
                actionFrequency
            } = componentItems

            try {
                await updateComponent({
                    variables: {
                        component: {
                            id: id,
                            lastActionYear: lastActionYear,
                            nextActionYear: nextActionYear,
                            name: name,
                            category: category,
                            section: section,
                            yearInstalled: yearInstalled,
                            unitRate: unitRate,
                            actionFrequency: actionFrequency
                        }
                    },
                    // NOTE: I added the following refetchQueries because I need to reflect the latest changes in this GET_ASSESSMENT_REPORT_FOR_PREVIEW query, which will be called in the review-depreviation screenB
                    refetchQueries: [
                        {
                            query: GET_ASSESSMENT_REPORT_FOR_PREVIEW,
                            variables: {
                                id: assessmentReportId
                            }
                        }
                    ]
                })
                // Please leave this console log for later debugging purposes
                console.log('Successfully updated componentItems:', componentItems)
            } catch (error) {
                console.error('Error updating componentItems:', error)
            }
        }, 600)
        return (): void => clearTimeout(timeout)
    }, [componentItems])

    useEffect(() => {
        if (!componentItems?.id || !buildingItem?.year) return

        // The followins code is necessary to avoid having the infinite loop of updating the component items
        const calculatedLastActionYear = buildingItem.year
        const calculatedNextActionYear = componentItems.actionFrequency
            ? calculatedLastActionYear + componentItems.actionFrequency
            : undefined
        if (
            componentItems.lastActionYear === calculatedLastActionYear &&
            componentItems.nextActionYear === calculatedNextActionYear
        ) {
            return
        }

        setComponentItems({
            ...componentItems,
            lastActionYear: buildingItem.year,
            nextActionYear: componentItems.actionFrequency
                ? buildingItem.year + componentItems.actionFrequency
                : undefined
        })
    }, [componentItems, buildingItem])

    const router = useRouter()

    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12
    }

    const handleDone = (): void => {
        router.push('./review-component')
    }

    if (componentReportLoading || componentLoading || buildingDataLoading) return <Text>Loading...</Text>
    if (!componentReportData || !componentData || !buildingData) return <Text>No data found</Text>
    if (!componentReportItems) return <Text>No component report items found</Text>

    const finalCost = (componentReportItems.quantityNeeded ?? 0) * (componentItems?.unitRate ?? 0)

    return (
        <View className="flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        className="flex-1 "
                        keyboardShouldPersistTaps="handled"
                        automaticallyAdjustKeyboardInsets={true}
                    >
                        <View className="flex-1 flex flex-col gap-5">
                            <View className="flex flex-row justify-between items-center">
                                <Label className="font-bold text-eva-black-900" style={{ fontSize: 20 }}>
                                    Type of action
                                </Label>
                                <Select
                                    defaultValue={{
                                        value: componentReportItems.action ?? '',
                                        label:
                                            componentReportItems.action === 'TBD'
                                                ? 'Select action'
                                                : (componentReportItems.action ?? '')
                                    }}
                                    onValueChange={option => {
                                        if (!option?.value) {
                                            Alert.alert('No option selected')
                                            return
                                        }
                                        setComponentReportItems({ ...componentReportItems, action: option?.value })
                                    }}
                                    className="pl-3 pr-2 py-[9px]"
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            className="text-foreground text-md font-semibold"
                                            placeholder="Select an action"
                                        />
                                    </SelectTrigger>
                                    <SelectContent insets={contentInsets}>
                                        <SelectGroup>
                                            <SelectItem label="Renewal" value="renewal">
                                                Renewal
                                            </SelectItem>
                                            <SelectItem label="Repair" value="repair">
                                                Repair
                                            </SelectItem>
                                            <SelectItem label="Maintenance" value="maintenance">
                                                Maintenance
                                            </SelectItem>
                                            <SelectItem label="Monitor" value="monitor">
                                                Monitor
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </View>

                            <View>
                                <Label className="text-eva-black-300">Frequency</Label>
                                <CustomInput
                                    value={componentItems?.actionFrequency?.toString() ?? ''}
                                    onChangeText={value => {
                                        if (!componentItems) {
                                            Alert.alert('No value is set')
                                            return
                                        }
                                        if (value === '') {
                                            setComponentItems({ ...componentItems, actionFrequency: null })
                                        } else {
                                            const parsed = Number.parseInt(value)
                                            if (!isNaN(parsed)) {
                                                setComponentItems({ ...componentItems, actionFrequency: parsed })
                                            }
                                        }
                                    }}
                                    clearable={true}
                                />
                            </View>

                            <View className="flex flex-row gap-4 justify-stretch items-center">
                                <View className="flex-1 flex flex-col gap-1">
                                    <Label className="text-eva-black-300">Last renovation</Label>
                                    <CustomInput
                                        placeholder="Write a year"
                                        value={
                                            componentItems?.lastActionYear != null
                                                ? componentItems.lastActionYear < 0
                                                    ? '0'
                                                    : componentItems.lastActionYear.toString()
                                                : ''
                                        }
                                        onChangeText={value => {
                                            if (!componentItems) {
                                                Alert.alert('No value is set')
                                                return
                                            }
                                            setBuildingItem({ year: Number(value) })
                                        }}
                                        clearable={true}
                                    />
                                </View>

                                <View className="flex-1 flex flex-col gap-1">
                                    <Label className="text-eva-black-300">Next renovation</Label>
                                    <CustomInput
                                        placeholder="Write a year"
                                        value={componentItems?.nextActionYear?.toString() ?? ''}
                                        onChangeText={value => {
                                            if (!componentItems) {
                                                Alert.alert('No value is set')
                                                return
                                            }
                                            setBuildingItem({
                                                year: Number(value) - Number(componentItems.actionFrequency)
                                            })
                                        }}
                                        clearable={true}
                                    />
                                </View>
                            </View>

                            <View className="flex flex-col gap-1">
                                <Label className="text-eva-black-300">Component condition</Label>
                                <View>
                                    <TagList
                                        options={['Unknown', 'Failed', 'Poor', 'Fair', 'Good', 'Excellent']}
                                        selected={componentReportItems?.condition ?? ''}
                                        onSelect={condition =>
                                            setComponentReportItems({ ...componentReportItems, condition })
                                        }
                                        gap={8}
                                    />
                                </View>
                            </View>

                            <View className="flex flex-col gap-1">
                                <Label className="text-eva-black-300">Quantity</Label>
                                <View className="relative">
                                    <Input
                                        defaultValue={componentReportItems?.quantityNeeded?.toString() ?? ''}
                                        onChangeText={value => {
                                            if (!componentReportItems) {
                                                Alert.alert('No value is set')
                                                return
                                            }
                                            if (value === '') {
                                                setComponentReportItems({
                                                    ...componentReportItems,
                                                    quantityNeeded: null
                                                })
                                            } else {
                                                const parsed = Number.parseInt(value)
                                                if (!isNaN(parsed)) {
                                                    setComponentReportItems({
                                                        ...componentReportItems,
                                                        quantityNeeded: parsed
                                                    })
                                                }
                                            }
                                        }}
                                        aria-labelledby="inputLabel"
                                        aria-errormessage="inputError"
                                    />
                                    <Select
                                        defaultValue={{ value: 'Unit', label: 'Unit' }}
                                        onValueChange={option => {
                                            if (!option?.value) {
                                                Alert.alert('No option selected')
                                                return
                                            }
                                            setQuantityUnit(option?.value)
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2"
                                    >
                                        <SelectTrigger className="w-24">
                                            <SelectValue
                                                className="text-foreground text-md font-semibold"
                                                placeholder="Select a quantity"
                                            />
                                        </SelectTrigger>
                                        <SelectContent insets={contentInsets} className="w-24">
                                            <SelectGroup>
                                                <SelectItem label="Ft2" value="Ft2">
                                                    Ft2
                                                </SelectItem>
                                                <SelectItem label="LF" value="LF">
                                                    LF
                                                </SelectItem>
                                                <SelectItem label="Unit" value="Unit">
                                                    Unit
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </View>
                            </View>

                            <View className="flex flex-col gap-1">
                                <Label className="text-eva-black-300">Price per {quantityUnit}</Label>
                                <View className="relative">
                                    <CustomInput
                                        value={componentItems?.unitRate?.toString() ?? ''}
                                        onChangeText={value => {
                                            if (!componentItems) {
                                                Alert.alert('No value is set')
                                                return
                                            }
                                            if (value === '') {
                                                setComponentItems({ ...componentItems, unitRate: null })
                                            } else {
                                                const parsed = Number.parseInt(value)
                                                if (!isNaN(parsed)) {
                                                    setComponentItems({ ...componentItems, unitRate: parsed })
                                                }
                                            }
                                        }}
                                        className="pl-10"
                                        clearable={true}
                                    />
                                    <View className="absolute left-2 top-1/2 -translate-y-1/2">
                                        <DollarSvg />
                                    </View>
                                </View>
                            </View>
                            <View className="flex flex-row gap-2 justify-between items-center">
                                <Text className="font-semibold text-lg text-eva-black-900">Final Cost:</Text>
                                <Text className="font-semibold text-lg text-eva-black-300">
                                    {finalCost > 0 ? finalCost.toLocaleString() : 'To be calculated'}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <Footer>
                <BottomButton onPress={handleDone}>Continue</BottomButton>
            </Footer>
        </View>
    )
}
