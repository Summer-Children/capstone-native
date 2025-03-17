import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native'
import ReportCard from './report-card'
import { useFetchReports } from '../api/use-fetch-reports'

const ReportList = (): ReactNode => {
    const { reports } = useFetchReports()

    return (
        <ScrollView>
            {reports.map((report, index) => (
                <ReportCard
                    key={index}
                    title={report.title}
                    fileType={report.fileType}
                    fileSize={report.fileSize}
                    date={report.date}
                    fileUrl={report.fileUrl}
                />
            ))}
        </ScrollView>
    )
}

export default ReportList
