import { View, Text, ScrollView } from 'react-native'
import { GeneralForm } from '@/src/entities/building/ui/general-form'
import { FinancialForm } from '@/src/entities/building/ui/financial-form'
import { useForm, FormProvider } from 'react-hook-form'
import { useUpdateBuilding } from '../api/use-edit-building'
import { useQuery } from '@apollo/client'
import { ReactNode, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/reusables/components/ui/tabs'
import { Button } from '@/reusables/components/ui/button'
import { useRouter } from 'expo-router'
import { GET_BUILDING } from '@/src/entities/building'
import { UpdateBuilding } from '@/src/_gqlgen/graphql'

interface Building {
    id: string
    name: string
    address: string
    year: number
    strataId: string
    fiscalYear: number
    crfAnnualContribution: number
    crfTotalBalance: number
    crfMinimumBalance: number
}

interface EditBuildingProps {
    id: string
    onSuccess: () => void
}

export function EditBuilding({ id, onSuccess }: EditBuildingProps): ReactNode {
    const { data } = useQuery<{ building: Building }, { id: string }>(GET_BUILDING, {
        variables: { id },
        skip: !id
    })

    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { update } = useUpdateBuilding()
    const building = data?.building
    const [activeTab, setActiveTab] = useState<'general' | 'financial'>('general')

    const methods = useForm<Building>({
        defaultValues: {
            name: building?.name || '',
            address: building?.address || '',
            year: building?.year || undefined,
            strataId: building?.strataId || '',
            fiscalYear: building?.fiscalYear || undefined,
            crfAnnualContribution: building?.crfAnnualContribution || undefined,
            crfTotalBalance: building?.crfTotalBalance || undefined,
            crfMinimumBalance: building?.crfMinimumBalance || undefined
        }
    })

    const { reset, handleSubmit } = methods
    const [formKey] = useState(0)

    useEffect(() => {
        if (data?.building) {
            reset(data.building)
        }
    }, [building, reset])

    const onSubmit = async (formData: Partial<Building>): Promise<void> => {
        try {
            if (!id) {
                console.error('Building ID is required')
                return
            }

            const updateData: UpdateBuilding = {
                id,
                ...formData
            }

            const updatedId = await update(updateData)
            if (updatedId) {
                onSuccess()
                router.push(`/building/detail/${id}`)
            } else {
                console.error('Update failed: No ID returned')
            }
        } catch (err) {
            console.error('Update failed:', err)
        }
    }

    return (
        <View className="px-4 flex-1">
            <FormProvider {...methods} key={formKey}>
                <Tabs
                    value={activeTab}
                    onValueChange={val => setActiveTab(val as 'general' | 'financial')}
                    className="w-full"
                >
                    <TabsList className="flex-row w-full bg-base-100 rounded-xl mb-6">
                        <TabsTrigger
                            value="general"
                            className={`flex-1 rounded-lg h-10 ${activeTab === 'general' ? 'border border-base-200' : 'border-none'}`}
                        >
                            <Text className={`text-[#002855] ${activeTab === 'general' ? 'font-bold' : 'font-normal'}`}>
                                General
                            </Text>
                        </TabsTrigger>
                        <TabsTrigger
                            value="financial"
                            className={`flex-1 rounded-lg h-10 ${activeTab === 'financial' ? 'border border-base-200' : 'border-none'}`}
                        >
                            <Text
                                className={`text-[#002855] ${activeTab === 'financial' ? 'font-bold' : 'font-normal'}`}
                            >
                                Financial
                            </Text>
                        </TabsTrigger>
                    </TabsList>
                    <ScrollView>
                        <TabsContent value="general">
                            <GeneralForm />
                        </TabsContent>
                        <TabsContent value="financial">
                            <FinancialForm />
                        </TabsContent>
                    </ScrollView>
                </Tabs>
                <Button className="absolute bottom-0 left-4 right-4 bg-base-800" onPress={handleSubmit(onSubmit)}>
                    <Text className="text-white font-bold text-base">Update</Text>
                </Button>
            </FormProvider>
        </View>
    )
}
