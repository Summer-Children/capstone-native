import React, { ReactNode, useState } from 'react'
import { ScrollView } from 'react-native'
import ReportItem from './report-item'
import FileViewer from '@/src/features/view-file/ui/file-viewer'

interface ReportListProps {
    pdfUrl: string
    excelUrl: string
}

const ReportList = ({ pdfUrl, excelUrl }: ReportListProps): ReactNode => {
    const [selectedFile, setSelectedFile] = useState<{ url: string; type: 'pdf' | 'xlsx' } | null>(null)
    const [triggerOpen, setTriggerOpen] = useState(false)

    const handlePreview = (fileUrl: string, fileType: 'pdf' | 'xlsx'): void => {
        setSelectedFile({ url: fileUrl, type: fileType })
        setTriggerOpen(prev => !prev)
    }

    return (
        <>
            <ScrollView>
                {pdfUrl && (
                    <ReportItem
                        title="Building Assessment Inventory"
                        fileType="pdf"
                        fileUrl={pdfUrl}
                        onPreview={() => handlePreview(pdfUrl, 'pdf')}
                    />
                )}

                {excelUrl && (
                    <ReportItem
                        title="Depreciation Report"
                        fileType="xlsx"
                        fileUrl={excelUrl}
                        onPreview={() => handlePreview(excelUrl, 'xlsx')}
                    />
                )}
            </ScrollView>
            {selectedFile && (
                <FileViewer fileUrl={selectedFile.url} fileType={selectedFile.type} triggerOpen={triggerOpen} />
            )}
        </>
    )
}

export default ReportList
