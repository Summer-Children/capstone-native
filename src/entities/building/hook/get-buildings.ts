import { graphql } from '@gqlgen'

const GET_BUILDINGS = graphql(`
    query Buildings {
        res: buildings {
            id
            userId
            name
            address
            year
            crfTotalBalance
            crfMinimumBalance
            crfAnnualContribution
            fiscalYear
        }
    }
`)

const GET_BUILDING = graphql(`
    query Building($id: ID!) {
        res: building(id: $id) {
            id
            name
            address
            year
        }
    }
`)

export { GET_BUILDINGS, GET_BUILDING }
