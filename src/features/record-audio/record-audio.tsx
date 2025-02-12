import { ReactNode, useState } from 'react'
import { View, Text, Button } from 'react-native'
import AudioRecorderPlayer from 'react-native-audio-recorder-player'

export function RecordAudio(): ReactNode {
    const [recorderPlayer] = useState(() => new AudioRecorderPlayer())

    const [isRecording, setIsRecording] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [recordingUri, setRecordingUri] = useState<string | null>(null)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Recorder:</Text>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button
                    title="Record"
                    onPress={async () => {
                        const result = await recorderPlayer.startRecorder()
                        recorderPlayer.addRecordBackListener(console.log)
                        setRecordingUri(result)
                        setIsRecording(true)
                    }}
                    disabled={isRecording}
                />

                <Button
                    title="Pause"
                    onPress={async () => {
                        await recorderPlayer.pauseRecorder()
                        setIsRecording(false)
                    }}
                    disabled={!isRecording}
                />

                <Button
                    title="Resume"
                    onPress={async () => {
                        await recorderPlayer.resumeRecorder()
                        setIsRecording(true)
                    }}
                    disabled={!recordingUri || isRecording}
                />

                <Button
                    title="Stop"
                    onPress={async () => {
                        await recorderPlayer.stopRecorder()
                        setIsRecording(false)
                    }}
                    disabled={!isRecording}
                />

                <Button title="Clear" onPress={() => setRecordingUri(null)} disabled={!recordingUri} />
            </View>

            <Text>Player:</Text>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button
                    title="Play"
                    onPress={async () => {
                        const result = await recorderPlayer.startPlayer(recordingUri!)
                        setRecordingUri(result)
                        setIsPlaying(true)
                    }}
                    disabled={isPlaying}
                />

                <Button
                    title="Pause"
                    onPress={async () => {
                        await recorderPlayer.pausePlayer()
                        setIsPlaying(false)
                    }}
                    disabled={!isPlaying}
                />

                <Button
                    title="Resume"
                    onPress={async () => {
                        await recorderPlayer.resumePlayer()
                        setIsPlaying(true)
                    }}
                    disabled={isPlaying}
                />

                <Button
                    title="Stop"
                    onPress={async () => {
                        await recorderPlayer.stopPlayer()
                        setIsPlaying(false)
                    }}
                    disabled={!isPlaying}
                />
            </View>
        </View>
    )
}
