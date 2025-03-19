import { Badge } from '@/reusables/components/ui/badge'
import { Button } from '@/reusables/components/ui/button'
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
import Footer from '@/src/shared/ui/footer'
import { useRouter } from 'expo-router'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { Alert, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ComponentReportPriority, UpdateComponent, UpdateComponentReport } from '@/src/_gqlgen/graphql'
import { useMutation, useQuery } from '@apollo/client'
import { GET_COMPONENT, UPDATE_COMPONENT } from '@/src/entities/component/hook/components'
import { GET_COMPONENT_REPORT, UPDATE_COMPONENT_REPORT } from '@/src/entities/component-report/hook/component-report'

type Props = {
    componentReportId: string
    componentId: string
}

export default function AddAction({ componentReportId, componentId }: Props): ReactNode {
    const insets = useSafeAreaInsets()
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

    if (!componentReportData || !componentData) return <Text>No data found</Text>

    const [componentReportItems, setComponentReportItems] = useState<UpdateComponentReport>({
        id: componentReportData?.componentReport.id.toString(),
        action: componentReportData?.componentReport.action ?? '',
        condition: componentReportData?.componentReport.condition ?? '',
        priority: componentReportData?.componentReport.priority ?? ComponentReportPriority.Low,
        quantityNeeded: componentReportData?.componentReport.quantityNeeded ?? 0,
        yearReviewed: componentReportData?.componentReport.yearReviewed ?? 0,
        note: componentReportData?.componentReport.note ?? ''
    })
    const [componentItems, setComponentItems] = useState<UpdateComponent>({
        id: componentData?.res.id.toString(),
        lastActionYear: componentData?.res.lastActionYear ?? 0,
        nextActionYear: componentData?.res.nextActionYear ?? 0,
        name: componentData?.res.name ?? '',
        category: componentData?.res.category ?? '',
        section: componentData?.res.section ?? '',
        yearInstalled: componentData?.res.yearInstalled ?? 0,
        unitRate: componentData?.res.unitRate ?? 0,
        actionFrequency: componentData?.res.actionFrequency ?? 0
    })

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (!componentReportItems) {
                console.error('No component report items found')
                return
            }
            const { id, action, condition, priority, quantityNeeded, yearReviewed, note } = componentReportItems
            await updateComponentReport({
                variables: {
                    input: {
                        id: id,
                        action: action,
                        condition: condition,
                        priority: priority,
                        quantityNeeded: quantityNeeded,
                        yearReviewed: yearReviewed,
                        note: note
                    }
                }
            })
        }, 2000)
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
                }
            })
        }, 2000)
        return (): void => clearTimeout(timeout)
    }, [componentItems])

    const router = useRouter()

    const contentInsets = {
        top: insets.top,
        bottom: insets.bottom,
        left: 12,
        right: 12
    }

    const [conditionValue] = useState<string | null>(null)

    const conditions = ['Unknown', 'Failed', 'Poor', 'Fair', 'Good', 'Excellent']

    const handleDone = (): void => {
        router.push('./review-component')
    }

    if (componentReportLoading || componentLoading) {
        return <Text>Loading...</Text>
    }

    if (!componentReportItems) {
        return <Text>No component report items found</Text>
    }

    return (
        <View className="flex-1">
            <View className="flex flex-row justify-between items-center">
                <Label>Type of action</Label>
                <Select
                    defaultValue={{
                        value: componentReportItems.action ?? '',
                        label: componentReportItems.action ?? ''
                    }}
                    onValueChange={option => {
                        if (!option?.value) {
                            Alert.alert('No option selected')
                            return
                        }
                        setComponentReportItems({ ...componentReportItems, action: option?.value })
                    }}
                >
                    <SelectTrigger className="w-32">
                        <SelectValue
                            className="text-foreground text-sm native:text-lg"
                            placeholder="Select an action"
                        />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-32">
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

            <Label>Frequency</Label>

            <View className="flex flex-row justify-between items-center">
                <View className="flex flex-col">
                    <Label>Last renovation</Label>
                    <Input
                        placeholder="Write a year"
                        defaultValue={componentItems?.lastActionYear?.toString()}
                        onChangeText={value => {
                            if (!componentItems) {
                                Alert.alert('No value is set')
                                return
                            }
                            setComponentItems({ ...componentItems, lastActionYear: Number(value) })
                        }}
                        aria-labelledby="inputLabel"
                        aria-errormessage="inputError"
                    />
                </View>

                <View className="flex flex-col">
                    <Label>Next renovation</Label>
                    <Input
                        placeholder="Write a year"
                        defaultValue={componentItems?.nextActionYear?.toString()}
                        onChangeText={value => {
                            if (!componentItems) {
                                Alert.alert('No value is set')
                                return
                            }
                            setComponentItems({ ...componentItems, nextActionYear: Number(value) })
                        }}
                        aria-labelledby="inputLabel"
                        aria-errormessage="inputError"
                    />
                </View>
            </View>

            <View>
                <Label>Component condition</Label>
                <View className="flex flex-row gap-x-2 flex-wrap">
                    {conditions.map(condition => (
                        <View key={condition}>
                            <Pressable
                                className="active:bg-grey-500"
                                onPress={() =>
                                    setComponentReportItems({ ...componentReportItems, condition: condition })
                                }
                            >
                                <Badge
                                    variant={condition === conditionValue ? 'default' : 'outline'}
                                    className="px-3 py-1"
                                >
                                    <Text>{condition}</Text>
                                </Badge>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>

            <View>
                <Label>Quantity</Label>
                <View className="flex flex-row">
                    <Input
                        defaultValue={componentReportItems?.quantityNeeded?.toString()}
                        onChangeText={value => {
                            if (!componentReportItems) {
                                Alert.alert('No value is set')
                                return
                            }
                            setComponentReportItems({ ...componentReportItems, quantityNeeded: Number(value) })
                        }}
                        aria-labelledby="inputLabel"
                        aria-errormessage="inputError"
                        className="flex-1"
                    />
                    <Select defaultValue={{ value: 'ft2', label: 'ft2' }}>
                        <SelectTrigger className="w-24">
                            <SelectValue
                                className="text-foreground text-sm native:text-lg"
                                placeholder="Select a quantity"
                            />
                        </SelectTrigger>
                        <SelectContent insets={contentInsets} className="w-24">
                            <SelectGroup>
                                <SelectItem label="ft2" value="ft2">
                                    ft2
                                </SelectItem>
                                <SelectItem label="LF" value="LF">
                                    LF
                                </SelectItem>
                                <SelectItem label="units" value="units">
                                    Units
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </View>
            </View>

            <View>
                <Label>Price per quantity</Label>
                <Input
                    defaultValue={componentItems?.unitRate?.toString()}
                    onChangeText={value => {
                        if (!componentItems) {
                            Alert.alert('No value is set')
                            return
                        }
                        setComponentItems({ ...componentItems, unitRate: Number.parseInt(value) })
                    }}
                    aria-labelledby="inputLabel"
                    aria-errormessage="inputError"
                />
            </View>

            <View className="flex flex-col justify-start">
                <Text>Final Cost</Text>
                <Text>{componentReportItems?.quantityNeeded * (componentItems?.unitRate ?? 0)}</Text>
            </View>

            <Footer>
                <Button onPress={handleDone}>
                    <Text>Continue</Text>
                </Button>
            </Footer>
        </View>
    )
}
