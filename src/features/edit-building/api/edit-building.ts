import { graphql } from '@gqlgen'

export const UPDATE_BUILDING = graphql(`
    mutation UpdateBuilding($input: UpdateBuilding!) {
        updateBuilding(input: $input) {
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
