import { graphql } from '@gqlgen'

export const TRANSCRIBE_AUDIO = graphql(`
    mutation TranscribeAudio($input: TranscribeAudio!) {
        transcribeAudio(input: $input)
    }
`)
