import { graphql } from '@gqlgen'

const GET_BUILDINGS_ON_FIRST_LOAD = graphql(`
    query BuildingsOnFirstLoad {
        res: buildings {
            id
            userId
            name
            address
            year
            strataId
            crfTotalBalance
            crfMinimumBalance
            crfAnnualContribution
            fiscalYear
        }
    }
`)

const GET_BUILDINGS = graphql(`
    query Buildings {
        res: buildings {
            id
            userId
            name
            address
            year
            strataId
            crfTotalBalance
            crfMinimumBalance
            crfAnnualContribution
            fiscalYear
            assessmentReports {
                id
                fiscalYear
                draft
            }
        }
    }
`)

const GET_BUILDING = graphql(`
    query GetBuilding($id: ID!) {
        res: building(id: $id) {
            id
            name
            year
            address
            strataId
            crfTotalBalance
            crfMinimumBalance
            crfAnnualContribution
            fiscalYear
            assessmentReports {
                id
                fiscalYear
                draft
            }
        }
    }
`)

export { GET_BUILDINGS, GET_BUILDING, GET_BUILDINGS_ON_FIRST_LOAD }
