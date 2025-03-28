import { Button } from '@/reusables/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/reusables/components/ui/tabs'
import { Text } from '@/reusables/components/ui/text'
import { Textarea } from '@/reusables/components/ui/textarea'
import { RecordAudio } from '@/src/features/record-audio/record-audio'
import Footer from '@/src/shared/ui/footer'
import { Href, useRouter } from 'expo-router'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { View } from 'react-native'

type Props = {
    onGoNext: (note: string | null | undefined) => Promise<Href>
    initialValue?: string | null
}

export function AddDescription({ onGoNext, initialValue }: Props): ReactNode {
    const [value, setValue] = useState<string | null | undefined>(initialValue)

    const [tab, setTab] = useState<'audio' | 'text'>('audio')
    const router = useRouter()
    const handleDone = async (): Promise<void> => {
        if (tab === 'audio') {
            // TODO: Save the audio description
        } else {
            // TODO: Save the text description
        }
        const targetPath = await onGoNext(value)

        router.push(targetPath)
    }

    return (
        <View className="flex-1">
            <Tabs value={tab} onValueChange={setTab as (value: string) => void} className="flex flex-col justify-start">
                <TabsList className="w-full flex flex-row bg-eva-white-100 rounded-xl h-10 box-border mb-6">
                    <TabsTrigger value="audio" className="flex-1 w-1/2 rounded-xl px-4 ">
                        <View className="flex flex-col justify-around" style={{ height: '100%' }}>
                            <Text>Record an audio</Text>
                        </View>
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex-1 w-1/2 rounded-xl px-4 ">
                        <View className="flex flex-col justify-around" style={{ height: '100%' }}>
                            <Text>Type your text</Text>
                        </View>
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="audio">
                    <View className="flex flex-col justify-between">
                        <View className="h-auto w-full rounded-md p-4 bg-eva-white-100">
                            <Text className="w-full" style={{ flexWrap: 'wrap' }}>
                                We'll transcribe your record, and style and enhance the transcript using AI ✨
                            </Text>
                        </View>

                        <RecordAudio />
                    </View>
                </TabsContent>
                <TabsContent value="text">
                    <View className="flex flex-col gap-4">
                        <View className="h-auto w-full rounded-md p-4 bg-eva-white-100">
                            <Text className="w-full" style={{ flexWrap: 'wrap' }}>
                                We'll transcribe your record, and style and enhance the transcript using AI ✨
                            </Text>
                        </View>
                        <Textarea
                            placeholder="Write a component description"
                            defaultValue={initialValue ?? ''}
                            onChangeText={setValue}
                            aria-labelledby="textareaLabel"
                            className="min-h-[218px] max-h-[218px]"
                        />
                        <Button variant="link" size="sm" onPress={() => setTab('audio')}>
                            <Text className="font-bold" style={{ fontSize: 16 }}>
                                Don't want to type? Record an audio
                            </Text>
                        </Button>
                    </View>
                </TabsContent>
            </Tabs>

            <Footer>
                <Button onPress={handleDone}>
                    <Text>Done</Text>
                </Button>
            </Footer>
        </View>
    )
}
