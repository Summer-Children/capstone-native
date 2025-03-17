import { useState, useEffect } from 'react'

interface Report {
    title: string
    fileType: 'pdf' | 'excel'
    fileSize: string
    date: string
    fileUrl: string
}

export const useFetchReports = (): { reports: Report[] } => {
    const [reports, setReports] = useState<Report[]>([])

    useEffect(() => {
        setReports([
            {
                title: 'Langara College_BAI',
                fileType: 'pdf',
                fileSize: '8.3MB',
                date: '2025-01-16',
                fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
            },
            {
                title: 'Langara College_DPR',
                fileType: 'excel',
                fileSize: '9.3MB',
                date: '2025-01-16',
                fileUrl: 'https://docs.google.com/spreadsheets/d/1XMUUFjKqiHFlBKw64fKHoF5TbCYVAXAY/export?format=xlsx'
            }
        ])
    }, [])

    return { reports }
}
