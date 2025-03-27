import { Waveform, type IWaveformRef } from '@simform_solutions/react-native-audio-waveform'
import { Circle, CirclePause, CircleStop, RotateCcw, Undo2 } from 'lucide-react-native'
import React from 'react'
import { ReactNode, useRef, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'
import { Text } from '@/reusables/components/ui/text'
export function RecordAudio(): ReactNode {
    const [isRecording, setIsRecording] = useState(false)
    const [recorderPlayer] = useState(() => new AudioRecorderPlayer())
    const [recordingUri, setRecordingUri] = useState<string | null>(null)
    const [isRecorderMode, setIsRecorderMode] = useState(true)
    const waveformRef = useRef<IWaveformRef>(null)

    return (
        <>
            <View className="justify-center items-center">
                <Waveform mode="live" ref={waveformRef} candleSpace={2} candleWidth={4} />
                <Text className="text-lg font-bold mb-5">{isRecorderMode ? 'Recorder' : 'Player'}</Text>

                <View className="flex-row items-center">
                    {/* Left-side button (Clear or Go Back to Record Mode) */}
                    <TouchableOpacity
                        onPress={() => {
                            if (isRecorderMode) {
                                setRecordingUri(null)
                                return
                            }
                            setIsRecorderMode(true)
                        }}
                        disabled={isRecorderMode && !recordingUri}
                        className="items-center flex-1"
                    >
                        {isRecorderMode ? <RotateCcw size={32} /> : <Undo2 size={32} />}
                        <Text className="text-center break-words">{isRecorderMode ? 'Clear' : 'Record'}</Text>
                    </TouchableOpacity>

                    {/* Center button (Record / Pause / Resume / Play) */}
                    <TouchableOpacity
                        onPress={async () => {
                            if (!isRecording) {
                                await recorderPlayer.startRecorder()
                                await waveformRef.current?.startRecord({
                                    encoder: 1,
                                    sampleRate: 44100,
                                    bitRate: 128000,
                                    fileNameFormat: 'recording.wav',
                                    useLegacy: false
                                })
                                setIsRecording(true)
                                return
                            }
                            await recorderPlayer.stopRecorder()
                            await waveformRef.current?.stopRecord()
                            setIsRecording(false)
                        }}
                        className="items-center flex-1"
                    >
                        {isRecording ? <CirclePause size={64} color="red" /> : <Circle size={64} color="red" />}
                        <Text>{isRecording ? 'Stop' : 'Record'}</Text>
                    </TouchableOpacity>

                    {/* Right-side button (Stop) */}
                    <TouchableOpacity
                        onPress={async () => {
                            if (isRecorderMode) {
                                await recorderPlayer.stopRecorder()
                                setIsRecording(false)
                                setIsRecorderMode(false)
                                return
                            }
                            await recorderPlayer.stopPlayer()
                        }}
                        className="items-center flex-1"
                    >
                        <CircleStop size={32} />
                        <Text>Stop</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
