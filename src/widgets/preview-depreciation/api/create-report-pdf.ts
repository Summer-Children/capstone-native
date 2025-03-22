import { graphql } from '@gqlgen'

export const GENERATE_PDF_AND_EXCEL = graphql(`
    mutation GenerateExcel($input: GenerateAssessmentReport!) {
        res: generateAssessmentReport(input: $input) {
            pdfUrl
            excelUrl
            assessmentReportId
        }
    }
`)
