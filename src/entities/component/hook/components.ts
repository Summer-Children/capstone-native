import { graphql } from '@gqlgen'

const GET_COMPONENTS = graphql(`
    query Components($buildingId: ID!) {
        res: components(buildingId: $buildingId) {
            id
            buildingId
            name
            category
            section
            actionFrequency
            nextActionYear
            yearInstalled
            unitRate
            lastActionYear
        }
    }
`)

const CREATE_COMPONENT = graphql(`
    mutation CreateComponent($component: CreateComponent!) {
        res: createComponent(input: $component) {
            id
            name
            category
            section
            actionFrequency
            nextActionYear
            yearInstalled
            unitRate
        }
    }
`)
const GET_COMPONENT = graphql(`
    query Component($componentId: ID!) {
        res: component(componentId: $componentId) {
            id
            buildingId
            name
            category
            section
            actionFrequency
            nextActionYear
            yearInstalled
            unitRate
            lastActionYear
        }
    }
`)

const UPDATE_COMPONENT = graphql(`
    mutation UpdateComponent($component: UpdateComponent!) {
        res: updateComponent(input: $component) {
            id
            name
            category
            section
            actionFrequency
            nextActionYear
            lastActionYear
            yearInstalled
            unitRate
        }
    }
`)

export { GET_COMPONENTS, GET_COMPONENT, UPDATE_COMPONENT, CREATE_COMPONENT }
