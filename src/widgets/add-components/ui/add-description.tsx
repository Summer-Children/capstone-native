import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/reusables/components/ui/tabs'
import { Text } from '@/reusables/components/ui/text'
import { Textarea } from '@/reusables/components/ui/textarea'
import { TRANSCRIBE_AUDIO } from '@/src/entities/component-report/hook/audio'
import { useMutation } from '@apollo/client'
import { RecordAudio } from '@/src/features/record-audio/record-audio'
import BottomButton from '@/src/shared/ui/bottom-button'
import Footer from '@/src/shared/ui/footer'
import { LoadingOverlay } from '@/src/shared/ui/loading-overlay'
import { ReactNativeFile } from 'apollo-upload-client'
import { Href, useLocalSearchParams, useRouter } from 'expo-router'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { View } from 'react-native'

type Props = {
    onGoNext: (note: string | null | undefined) => Promise<Href>
    initialValue?: string | null
}

export function AddDescription({ onGoNext, initialValue }: Props): ReactNode {
    const [value, setValue] = useState<string | null | undefined>(initialValue)
    const { descriptionType } = useLocalSearchParams<{ descriptionType: 'audio' | 'text' }>()
    const [tab, setTab] = useState<'audio' | 'text'>(descriptionType ?? 'audio')
    const [transcribeAudio, { loading }] = useMutation(TRANSCRIBE_AUDIO)
    const router = useRouter()

    const handleDone = async (): Promise<void> => {
        const targetPath = await onGoNext(value)
        router.push(targetPath)
    }

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <LoadingOverlay>Transcribing audio...</LoadingOverlay>
            </View>
        )
    }

    return (
        <View className="flex-1 overflow-auto">
            <Tabs value={tab} onValueChange={setTab as (value: string) => void} className="flex-1">
                <TabsList className="flex flex-row w-full bg-eva-white-100 rounded-xl h-10 mb-6">
                    <TabsTrigger value="audio" className="flex-1 rounded-xl w-1/2">
                        <Text>Record an audio</Text>
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex-1 rounded-xl w-1/2">
                        <Text>Type your text</Text>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="audio" className="flex-1">
                    <View className="flex-col justify-between">
                        <View className="h-auto w-full rounded-md p-4 bg-eva-white-100 mb-6">
                            <Text className="w-full text-eva-black-900">
                                We'll transcribe your record, and style and enhance the transcript using AI ✨
                            </Text>
                        </View>

                        <RecordAudio
                            onRecord={async uri => {
                                const file = new ReactNativeFile({ uri })
                                await transcribeAudio({
                                    variables: {
                                        input: {
                                            audio: file
                                        }
                                    },
                                    onCompleted: data => {
                                        setValue(data.transcribeAudio)
                                        setTab('text')
                                    },
                                    onError: error => {
                                        console.error('Error transcribing audio', error)
                                    }
                                })
                            }}
                        />
                    </View>
                </TabsContent>
                <TabsContent value="text">
                    <View className="flex-col gap-4">
                        <Textarea
                            placeholder="Write a component description"
                            defaultValue={value ?? ''}
                            onChangeText={setValue}
                            aria-labelledby="textareaLabel"
                            className="min-h-[218px] max-h-[218px]"
                        />
                    </View>
                </TabsContent>
            </Tabs>

            <Footer>
                <BottomButton onPress={handleDone} disabled={!value}>
                    Continue
                </BottomButton>
            </Footer>
        </View>
    )
}
