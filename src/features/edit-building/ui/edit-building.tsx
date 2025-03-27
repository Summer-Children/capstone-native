import { View, ScrollView } from 'react-native'
import { Text } from '@/reusables/components/ui/text'
import { GeneralForm } from '@/src/entities/building/ui/general-form'
import { FinancialForm } from '@/src/entities/building/ui/financial-form'
import { useForm, FormProvider } from 'react-hook-form'
import { useUpdateBuilding } from '../api/use-edit-building'
import { useQuery } from '@apollo/client'
import { ReactNode, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/reusables/components/ui/tabs'
import { Button } from '@/reusables/components/ui/button'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { GET_BUILDING } from '@/src/entities/building'
import { UpdateBuilding } from '@/src/_gqlgen/graphql'
import Footer from '@/src/shared/ui/footer'
import { getBuildingImageUrl } from '@/src/entities/building/hook/get-building-image-url'

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
    coverImage?: string
}

interface EditBuildingProps {
    id: string
    onSuccess: () => void
}

export function EditBuilding({ id, onSuccess }: EditBuildingProps): ReactNode {
    const { coverImage: newCoverImage } = useLocalSearchParams()
    const { data } = useQuery(GET_BUILDING, {
        variables: { id },
        skip: !id,
        fetchPolicy: 'network-only'
    })
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { update } = useUpdateBuilding()
    const building = data?.res
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
            crfMinimumBalance: building?.crfMinimumBalance || undefined,
            coverImage: building?.id ? getBuildingImageUrl(building.id) : undefined
        }
    })

    const { reset, setValue, handleSubmit } = methods
    const [formKey] = useState(0)

    useEffect(() => {
        if (building) {
            reset({
                name: building.name || '',
                address: building.address || '',
                year: building.year ?? undefined,
                strataId: building.strataId || '',
                fiscalYear: building.fiscalYear ?? undefined,
                crfAnnualContribution: building.crfAnnualContribution ?? undefined,
                crfTotalBalance: building.crfTotalBalance ?? undefined,
                crfMinimumBalance: building.crfMinimumBalance ?? undefined,
                coverImage: getBuildingImageUrl(building.id)
            })
        }
    }, [building, reset])

    useEffect(() => {
        if (newCoverImage && typeof newCoverImage === 'string') {
            setValue('coverImage', newCoverImage)
        }
    }, [newCoverImage, setValue])

    const onSubmit = async (formData: Partial<Building>): Promise<void> => {
        try {
            if (!id) {
                console.error('Building ID is required')
                return
            }

            const { coverImage, ...rest } = formData
            const updateData: UpdateBuilding = {
                id,
                ...rest,
                image: coverImage?.startsWith('file://') ? { uri: coverImage } : undefined
            }

            const updatedId = await update(updateData)
            if (updatedId) {
                onSuccess()
                router.push(`/buildings/${id}/detail`)
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
                    <TabsList className="flex-row w-full bg-eva-white-100 rounded-2xl mb-6 h-14">
                        <TabsTrigger
                            value="general"
                            className={`flex-1 rounded-xl h-10 ${activeTab === 'general' ? 'border border-eva-white-100' : 'border-none'}`}
                        >
                            <Text
                                className={`font-bold ${activeTab === 'general' ? 'text-[#1C1D1F]' : 'text-[#5D6368]'}`}
                            >
                                General
                            </Text>
                        </TabsTrigger>
                        <TabsTrigger
                            value="financial"
                            className={`flex-1 rounded-xl h-10 ${activeTab === 'financial' ? 'border border-eva-white-100' : 'border-none'}`}
                        >
                            <Text
                                className={`font-bold ${activeTab === 'financial' ? 'text-[#1C1D1F]' : 'text-[#5D6368]'}`}
                            >
                                Financial
                            </Text>
                        </TabsTrigger>
                    </TabsList>
                    <ScrollView>
                        <TabsContent value="general">
                            <GeneralForm mode="edit" buildingId={id} />
                        </TabsContent>
                        <TabsContent value="financial">
                            <FinancialForm />
                        </TabsContent>
                    </ScrollView>
                </Tabs>
                <Footer>
                    <Button className="bg-eva-blue-500" onPress={handleSubmit(onSubmit)}>
                        <Text className="text-white font-bold text-base">Update</Text>
                    </Button>
                </Footer>
            </FormProvider>
        </View>
    )
}
