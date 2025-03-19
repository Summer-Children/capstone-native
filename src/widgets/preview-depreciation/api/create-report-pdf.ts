import { graphql } from '@gqlgen'

export const CREATE_ASSESSMENT_REPORT_PDF = graphql(`
    mutation CreateAssessmentReportPDF($input: CreateAssessmentReportPDF!) {
        res: createAssessmentReportPDF(input: $input) {
            pdfUrl
            assessmentReportId
        }
    }
`)
