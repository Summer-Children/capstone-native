import Header from '@/src/shared/ui/header'
import DepreciationPreview from '@/src/widgets/preview-depreciation/ui/preview-depreciation'
import { useLocalSearchParams } from 'expo-router'
import { ReactNode } from 'react'

export default function DepreciationPreviewPage(): ReactNode {
    const assessmentReportId = useLocalSearchParams()['assessmentReportId'] as string

    return (
        <>
            <Header
                headerText="Depreciation preview"
                headerDescription="Preview your depreciation report. Progressive Annual Increase is 3.0% every year."
            ></Header>
            <DepreciationPreview assessmentReportId={assessmentReportId} />
        </>
    )
}
