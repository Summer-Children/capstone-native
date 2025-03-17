export interface AssessmentReport {
    id: string
    draft: boolean
    fiscalYear: number
}

export interface Building {
    id: string
    name: string
    address: string
    year: number
    strataId: string
    fiscalYear: number
    crfAnnualContribution: number
    crfTotalBalance: number
    crfMinimumBalance: number
    assessmentReports: AssessmentReport[]
}

export type PartialBuilding = Partial<Building>
