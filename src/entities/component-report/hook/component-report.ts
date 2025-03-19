import { graphql } from '@gqlgen'

const CREATE_COMPONENT_REPORT = graphql(`
    mutation CreateComponentReport($input: CreateComponentReport!) {
        createComponentReport(input: $input) {
            id
            componentId
            assessmentReportId
            action
            condition
            priority
            note
            quantityNeeded
            yearReviewed
        }
    }
`)

const GET_COMPONENT_REPORT = graphql(`
    query GetComponentReport($componentReportId: ID!) {
        componentReport(componentReportId: $componentReportId) {
            id
            componentId
            assessmentReportId
            action
            condition
            priority
            note
            quantityNeeded
            yearReviewed
        }
    }
`)

export const GET_COMPONENT_REPORTS_BY_ASSESSMENT_REPORT_ID = graphql(`
    query GetComponentReports($assessmentReportId: ID!) {
        componentReports(assessmentReportId: $assessmentReportId) {
            id
            componentId
            action
            condition
            priority
            note
            quantityNeeded
            yearReviewed
            assessmentReportId
        }
    }
`)

const UPDATE_COMPONENT_REPORT = graphql(`
    mutation UpdateComponentReport($input: UpdateComponentReport!) {
        res: updateComponentReport(input: $input) {
            id
            condition
            priority
            note
            quantityNeeded
            yearReviewed
            action
        }
    }
`)

export { CREATE_COMPONENT_REPORT, GET_COMPONENT_REPORT, UPDATE_COMPONENT_REPORT }
