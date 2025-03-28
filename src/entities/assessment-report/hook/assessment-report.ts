import { graphql } from '@gqlgen'

const CREATE_ASSESSMENT_REPORT = graphql(`
    mutation CreateAssessmentReport($input: CreateAssessmentReport!) {
        createAssessmentReport(input: $input) {
            id
        }
    }
`)

const GET_ASSESSMENT_REPORTS_BY_BUILDINGID = graphql(`
    query GetAssessmentReports($buildingId: ID!) {
        res: assessmentReports(buildingId: $buildingId) {
            id
            fiscalYear
        }
    }
`)

const GET_ASSESSMENT_REPORT_FOR_PREVIEW = graphql(`
    query GetAssessmentReportForPreview($id: ID!) {
        res: assessmentReport(id: $id) {
            id
            fiscalYear
            draft
            componentReports {
                quantityNeeded
                component {
                    id
                }
            }
            building {
                id
                name
                components {
                    id
                    name
                    unitRate
                    nextActionYear
                    actionFrequency
                }
            }
            crfAnnualContribution
            crfMinimumBalance
            crfTotalBalance
        }
    }
`)

export { CREATE_ASSESSMENT_REPORT, GET_ASSESSMENT_REPORTS_BY_BUILDINGID, GET_ASSESSMENT_REPORT_FOR_PREVIEW }
