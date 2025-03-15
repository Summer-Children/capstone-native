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
        assessmentReport(id: $id) {
            id
            building {
                id
                name
            }
            fiscalYear
            draft
            componentReports {
                id
                assessmentReportId
                componentId
                action
                condition
                note
                priority
                quantityNeeded
                yearReviewed
                component {
                    id
                    name
                }
            }
        }
    }
`)
export { CREATE_ASSESSMENT_REPORT, GET_ASSESSMENT_REPORT }
