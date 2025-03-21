import { graphql } from '@gqlgen'

export const GENERATE_ASSESSMENT_REPORT = graphql(`
    mutation generateAssessmentReport($input: GenerateAssessmentReport!) {
        res: generateAssessmentReport(input: $input) {
            pdfUrl
            assessmentReportId
            excelUrl
        }
    }
`)
