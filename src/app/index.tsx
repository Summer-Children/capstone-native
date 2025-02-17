import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../../src/shared/api/clients'
import React, { ReactNode } from 'react'
// import FileViewer from '../features/view-file/ui/file-viewer'
import { AddPhoto } from '../features/add-photo/ui'

const AppContent = (): ReactNode => {
    return (
        <>
            {/* <FileViewer
                fetchedFileUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                fileType="pdf"
                buttonText="View Pdf File"
            />
            <FileViewer
                fetchedFileUrl="https://docs.google.com/spreadsheets/d/1XMUUFjKqiHFlBKw64fKHoF5TbCYVAXAY/export?format=xlsx"
                fileType="excel"
                buttonText="View Excel File"
            /> */}

            <AddPhoto maxSelection={5} onSelectPhotos={() => {}} />
        </>
    )
}

export default function App(): ReactNode {
    return (
        <ApolloProvider client={apolloClient}>
            <AppContent />
        </ApolloProvider>
    )
}
