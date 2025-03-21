import { graphql } from '@gqlgen'
import { ApolloError, useMutation, useQuery } from '@apollo/client'
import { ComponentReportPriority, GetComponentReportQuery, UpdateComponentReport } from '@/src/_gqlgen/graphql'

type UseUpdateComponentReport = {
    updateComponentReportMutation: (
        input: UpdateComponentReport,
        onCompleted?: (data: UpdateComponentReport) => void
    ) => Promise<UpdateComponentReport | undefined>
}

type UseGetComponentReport = {
    componentReport: GetComponentReportQuery | undefined
    componentReportLoading: boolean
    componentReportError: ApolloError | undefined
}

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
            images {
                id
                url
            }
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
            images {
                id
                url
            }
        }
    }
`)

const useUpdateComponentReport = (): UseUpdateComponentReport => {
    const [updateComponentReport] = useMutation(UPDATE_COMPONENT_REPORT)
    const updateComponentReportMutation = async (
        input: UpdateComponentReport,
        onCompleted?: (data: UpdateComponentReport) => void
    ): Promise<UpdateComponentReport | undefined> => {
        const res = await updateComponentReport({
            variables: {
                input: {
                    id: input.id.toString() || '',
                    action: input.action || '',
                    note: input.note || '',
                    priority: input.priority || ComponentReportPriority.Low,
                    quantityNeeded: input.quantityNeeded || 0,
                    yearReviewed: input.yearReviewed || 0,
                    condition: input.condition || 'good',
                    images: input.images || [],
                    removeImages: input.removeImages || []
                }
            },
            onCompleted: d => {
                onCompleted?.(d.res)
            },
            onError: e => {
                console.error('Error updating component report', e)
            }
        })
        return res.data?.res
    }
    return { updateComponentReportMutation }
}

const useGetComponentReport = (
    componentReportId: string,
    onCompleted?: (data: UpdateComponentReport) => void
): UseGetComponentReport => {
    const {
        data: componentReport,
        loading: componentReportLoading,
        error: componentReportError
    } = useQuery(GET_COMPONENT_REPORT, {
        variables: {
            componentReportId: componentReportId
        },
        onCompleted: d => {
            onCompleted?.(d.componentReport)
        },
        onError: e => {
            console.error('Error getting component report', e)
        }
    })

    return {
        componentReport,
        componentReportLoading,
        componentReportError
    }
}

export {
    CREATE_COMPONENT_REPORT,
    GET_COMPONENT_REPORT,
    UPDATE_COMPONENT_REPORT,
    useGetComponentReport,
    useUpdateComponentReport
}
