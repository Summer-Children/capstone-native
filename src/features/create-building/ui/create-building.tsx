import { View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { GeneralForm } from '@/src/entities/building/ui/general-form'
import { FinancialForm } from '@/src/entities/building/ui/financial-form'
import { useForm, FormProvider } from 'react-hook-form'
import { useCreateBuilding } from '../api/use-create-building'
import { ReactNode, useState } from 'react'
import Header from '@/src/shared/ui/header'
import Footer from '@/src/shared/ui/footer'
import { router, Stack } from 'expo-router'
import { ArrowIcon } from '@/src/shared/ui'
import { ReactNativeFile } from 'apollo-upload-client'
import CloseButton from '@/src/shared/ui/close-button'
import BottomButton from '@/src/shared/ui/bottom-button'

interface CreateBuildingForm {
    name: string
    address: string
    year: number
    strataId: string
    fiscalYear: number
    crfAnnualContribution: number
    crfTotalBalance: number
    crfMinimumBalance: number
    coverImage?: string
    fileName?: string
    fileType?: string
}

interface CreateBuildingProps {
    onSuccess: (newBuilding: { id: string }) => void
}

export function CreateBuilding({ onSuccess }: CreateBuildingProps): ReactNode {
    const methods = useForm<CreateBuildingForm>({
        mode: 'onSubmit',
        defaultValues: {
            name: '',
            address: '',
            year: undefined,
            strataId: '',
            fiscalYear: undefined,
            crfAnnualContribution: undefined,
            crfTotalBalance: undefined,
            crfMinimumBalance: undefined,
            coverImage: '',
            fileName: '',
            fileType: ''
        }
    })
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const { create } = useCreateBuilding()
    const [step, setStep] = useState<'general' | 'financial'>('general')
    const headerText = step === 'general' ? 'Create a building profile' : 'Financial details'

    const handleBack = (): void => {
        if (step === 'financial') {
            setStep('general')
        } else {
            router.back()
        }
    }

    const onSubmit = async (data: CreateBuildingForm): Promise<void> => {
        try {
            const { coverImage, fileName, fileType, ...rest } = data
            const payload = {
                ...rest,
                image:
                    coverImage && coverImage.startsWith('file://') && fileName && fileType
                        ? new ReactNativeFile({
                              uri: coverImage,
                              name: fileName,
                              type: fileType
                          })
                        : undefined
            }

            const buildingId = await create(payload)
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
                        <TouchableOpacity onPress={handleBack} className="bg-eva-white-100 rounded-full p-2">
                            <ArrowIcon color="#1C1D1F" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => <CloseButton />
                }}
            />
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View className="flex-1">
                    <Header headerText={headerText} />
                    <ScrollView
                        className="flex-1"
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ flexGrow: 1 }}
                    >
                        <FormProvider {...methods}>
                            {step === 'general' ? <GeneralForm mode="create" /> : <FinancialForm />}
                        </FormProvider>

                        <Footer>
                            <BottomButton
                                onPress={
                                    step === 'general'
                                        ? (): void => setStep('financial')
                                        : (): Promise<void> => methods.handleSubmit(onSubmit)()
                                }
                            >
                                {step === 'general' ? 'Continue' : 'Done'}
                            </BottomButton>
                        </Footer>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
