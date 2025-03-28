import { Button } from '@/reusables/components/ui/button'
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

    const [isAudioDescription, setIsAudioDescription] = useState<boolean>(true)
    const router = useRouter()
    const handleDone = async (): Promise<void> => {
        if (isAudioDescription) {
            // TODO: Save the audio description
        } else {
            // TODO: Save the text description
        }
        const targetPath = await onGoNext(value)

        router.push(targetPath)
    }

    return (
        <View className="flex-1">
            {isAudioDescription && (
                <View className="flex flex-col justify-around" style={{ height: '100%' }}>
                    <View className="h-auto w-full rounded-md p-4 bg-gray-200">
                        <Text className="w-full" style={{ flexWrap: 'wrap' }}>
                            We will transcribe the recording while you take the pictures in the next step.
                        </Text>
                    </View>

                    <RecordAudio />

                    <Button variant="link" size="sm" onPress={() => setIsAudioDescription(false)}>
                        <Text className="font-bold" style={{ fontSize: 16 }}>
                            Can't record? Enter text
                        </Text>
                    </Button>
                </View>
            )}

            {!isAudioDescription && (
                <View className="flex flex-col gap-4">
                    <Textarea
                        placeholder="Write a component description"
                        defaultValue={initialValue ?? ''}
                        onChangeText={setValue}
                        aria-labelledby="textareaLabel"
                        className="min-h-[218px] max-h-[218px]"
                    />
                    <Button variant="link" size="sm" onPress={() => setIsAudioDescription(true)}>
                        <Text className="font-bold" style={{ fontSize: 16 }}>
                            Don't want to type? Record an audio
                        </Text>
                    </Button>
                </View>
            )}

            <Footer>
                <Button onPress={handleDone}>
                    <Text>Done</Text>
                </Button>
            </Footer>
        </View>
    )
}
