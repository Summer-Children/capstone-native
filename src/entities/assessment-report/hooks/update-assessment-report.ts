import { graphql } from '@gqlgen'

export const UPDATE_ASSESSMENT_REPORT = graphql(`
    mutation UpdateAssessmentReport($input: UpdateAssessmentReport!) {
        updateAssessmentReport(input: $input) {
            id
            draft
        }
    }
`)
