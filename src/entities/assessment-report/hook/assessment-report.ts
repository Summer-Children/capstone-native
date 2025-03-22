import { graphql } from '@gqlgen'

const CREATE_ASSESSMENT_REPORT = graphql(`
    mutation CreateAssessmentReport($input: CreateAssessmentReport!) {
        createAssessmentReport(input: $input) {
            id
        }
    }
`)

const GET_ASSESSMENT_REPORT = graphql(`
    query GetAssessmentReport($id: ID!) {
        res: assessmentReport(id: $id) {
            id
            building {
                id
                name
                crfAnnualContribution
                crfMinimumBalance
                crfTotalBalance
                components {
                    name
                    unitRate
                    nextActionYear
                    actionFrequency
                }
            }
            fiscalYear
            draft
        }
    }
`)

export { CREATE_ASSESSMENT_REPORT, GET_ASSESSMENT_REPORT }
