import { graphql } from '@gqlgen'

export const CREATE_BUILDING = graphql(`
    mutation CreateBuilding($input: CreateBuilding!) {
        createBuilding(input: $input) {
            id
            name
            address
            year
            strataId
            fiscalYear
            crfAnnualContribution
            crfTotalBalance
            crfMinimumBalance
        }
    }
`)
