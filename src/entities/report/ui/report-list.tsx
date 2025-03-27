import React, { ReactNode, useState } from 'react'
import { ScrollView } from 'react-native'
import ReportItem from './report-item'
import FileViewer from '@/src/features/view-file/ui/file-viewer'

interface ReportListProps {
    pdfUrl: string
    excelUrl: string
}

const ReportList = ({ pdfUrl, excelUrl }: ReportListProps): ReactNode => {
    const [selectedFile, setSelectedFile] = useState<{ url: string; type: 'pdf' | 'xlsx'; name: string } | null>(null)
    const [triggerOpen, setTriggerOpen] = useState(false)

    const handlePreview = (fileUrl: string, fileType: 'pdf' | 'xlsx', fileName: string): void => {
        setSelectedFile({ url: fileUrl, type: fileType, name: fileName })
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
                        onPreview={() => handlePreview(pdfUrl, 'pdf', 'Building Assessment Inventory')}
                    />
                )}

                {excelUrl && (
                    <ReportItem
                        title="Depreciation Report"
                        fileType="xlsx"
                        fileUrl={excelUrl}
                        onPreview={() => handlePreview(excelUrl, 'xlsx', 'Depreciation Report')}
                    />
                )}
            </ScrollView>
            {selectedFile && (
                <FileViewer
                    fileUrl={selectedFile.url}
                    fileType={selectedFile.type}
                    fileName={selectedFile.name}
                    triggerOpen={triggerOpen}
                />
            )}
        </>
    )
}

export default ReportList
