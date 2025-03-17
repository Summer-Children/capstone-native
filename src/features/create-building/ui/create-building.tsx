import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from '@/reusables/components/ui/button'
import { GeneralForm } from '@/src/entities/building/ui/general-form'
import { FinancialForm } from '@/src/entities/building/ui/financial-form'
import { useForm, FormProvider } from 'react-hook-form'
import { useCreateBuilding } from '../api/use-create-building'
import { ReactNode, useState } from 'react'
import Header from '@/src/shared/ui/header'
import Footer from '@/src/shared/ui/footer'
import { router, Stack } from 'expo-router'
import { ArrowIcon } from '@/src/shared/ui'

interface CreateBuildingForm {
    name: string
    address: string
    year: number
    strataId: string
    fiscalYear: number
    crfAnnualContribution: number
    crfTotalBalance: number
    crfMinimumBalance: number
}

interface CreateBuildingProps {
    onSuccess: (newBuilding: { id: string }) => void
}

export function CreateBuilding({ onSuccess }: CreateBuildingProps): ReactNode {
    const methods = useForm<CreateBuildingForm>({
        mode: 'onSubmit',
        defaultValues: {}
    })

    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { create } = useCreateBuilding()
    const [step, setStep] = useState<'general' | 'financial'>('general')
    const headerText = step === 'general' ? 'Create a building' : 'Financial details'

    const handleBack = (): void => {
        if (step === 'financial') {
            setStep('general')
        } else {
            router.back()
        }
    }

    const onSubmit = async (data: CreateBuildingForm): Promise<void> => {
        try {
            const buildingId = await create(data)
            if (buildingId) {
                onSuccess({ id: buildingId })
            } else {
                console.error('Building creation failed')
            }
        } catch (error) {
            console.error('Error creating building:', error)
        }
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={handleBack}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: '#F1F1F1',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ArrowIcon />
                        </TouchableOpacity>
                    )
                }}
            />
            <View className="flex-1">
                <Header headerText={headerText} />
                <FormProvider {...methods}>{step === 'general' ? <GeneralForm /> : <FinancialForm />}</FormProvider>
                <Footer>
                    <Button
                        className="bg-eva-blue-500"
                        onPress={
                            step === 'general'
                                ? (): void => setStep('financial')
                                : (): Promise<void> => methods.handleSubmit(onSubmit)()
                        }
                    >
                        <Text className="text-white font-bold text-base">
                            {step === 'general' ? 'Continue' : 'Done'}
                        </Text>
                    </Button>
                </Footer>
            </View>
        </>
    )
}
