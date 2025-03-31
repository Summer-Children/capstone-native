import { Waveform, type IWaveformRef } from '@simform_solutions/react-native-audio-waveform'
import React from 'react'
import { ReactNode, useRef, useState, useEffect } from 'react'
import { TouchableOpacity, View } from 'react-native'
import AudioRecorderPlayer, { AVEncodingOption } from 'react-native-audio-recorder-player'
import { Text } from '@/reusables/components/ui/text'
import { PauseIcon, RestartIcon, StopIcon } from '@/src/shared/ui'

type Props = {
    onRecord: (uri: string) => Promise<void>
}

export function RecordAudio({ onRecord }: Props): ReactNode {
    const [isRecording, setIsRecording] = useState(false)
    const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentPosition, setCurrentPosition] = useState(0)
    const waveformRef = useRef<IWaveformRef>(null)

    useEffect(() => {
        return (): void => {
            void stopEverything()
        }
    }, [])

    const stopEverything = async (): Promise<void> => {
        try {
            await audioRecorderPlayer.stopPlayer()
            await audioRecorderPlayer.stopRecorder()
            audioRecorderPlayer.removePlayBackListener()
            audioRecorderPlayer.removeRecordBackListener()
        } catch (error) {
            console.error('Cleanup error:', error)
        }
    }

    const handleRecord = async (): Promise<void> => {
        try {
            if (isRecording) {
                const uri = await audioRecorderPlayer.stopRecorder()
                await waveformRef.current?.stopRecord()
                await onRecord(uri)
                audioRecorderPlayer.removeRecordBackListener()
                setIsRecording(false)
                console.log('Recording stopped, URI:', uri)
            } else {
                console.log('Starting recording...')
                const uri = await audioRecorderPlayer.startRecorder(undefined, {
                    AVFormatIDKeyIOS: AVEncodingOption.flac,
                    AVSampleRateKeyIOS: 16000,
                    AVNumberOfChannelsKeyIOS: 1
                    // AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high
                })
                await waveformRef.current?.startRecord({
                    encoder: 1,
                    sampleRate: 44100,
                    bitRate: 128000,
                    fileNameFormat: 'recording.wav',
                    useLegacy: false
                })

                audioRecorderPlayer.addRecordBackListener(e => {
                    setCurrentPosition(e.currentPosition)
                })

                setIsRecording(true)
                console.log('Recording started, URI:', uri)
            }
        } catch (error) {
            console.error('Recording error:', error)
            setIsRecording(false)
        }
    }

    const handleStop = async (): Promise<void> => {
        try {
            if (isRecording) {
                const uri = await audioRecorderPlayer.stopRecorder()
                await waveformRef.current?.stopRecord()
                await onRecord(uri)
                setIsRecording(false)
            }
            if (isPlaying) {
                await audioRecorderPlayer.stopPlayer()
                setIsPlaying(false)
            }
            setCurrentPosition(0)
            audioRecorderPlayer.removePlayBackListener()
            audioRecorderPlayer.removeRecordBackListener()
        } catch (error) {
            console.error('Stop error:', error)
        }
    }

    const handleRestart = async (): Promise<void> => {
        await stopEverything()
        setCurrentPosition(0)
        setIsRecording(false)
        setIsPlaying(false)
    }

    const formatTime = (milliseconds: number): string => {
        const seconds = Math.floor(milliseconds / 1000)
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    return (
        <View className="mb-4">
            <View className="h-32 justify-center items-center mb-6">
                <Waveform mode="live" ref={waveformRef} candleSpace={2} candleWidth={4} />
            </View>

            <View className="w-full flex-row justify-center items-center mb-1">
                <Text className="text-eva-black-300">{formatTime(currentPosition)}</Text>
            </View>

            <View className="flex-row justify-between items-center py-4">
                <>
                    <TouchableOpacity
                        onPress={handleRestart}
                        className="items-center justify-center w-16 h-16"
                        disabled={!isRecording}
                    >
                        <View className="w-10 h-10 rounded-full bg-eva-white-100 items-center justify-center">
                            <RestartIcon size={24} color="#1C1D1F" />
                        </View>
                        <Text className="text-xs mt-1 text-eva-black-300">Restart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleRecord} className="items-center justify-center">
                        <View className="w-16 h-16 rounded-full bg-red-600 items-center justify-center">
                            {isRecording ? (
                                <PauseIcon size={24} color="#FFFFFF" />
                            ) : (
                                <View className="w-6 h-6 rounded-full bg-white" />
                            )}
                        </View>
                        <Text className="text-xs mt-1 text-eva-black-300">{isRecording ? 'Stop' : 'Record'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleStop} className="items-center justify-center w-16 h-16">
                        <View className="w-10 h-10 rounded-full bg-eva-white-100 items-center justify-center">
                            <StopIcon size={20} color="#1C1D1F" variant="solid" />
                        </View>
                        <Text className="text-xs mt-1 text-eva-black-300">Stop</Text>
                    </TouchableOpacity>
                </>
            </View>
        </View>
    )
}
