import React from 'react';
import {Text} from 'react-native';
import FileViewer from '../features/view-file/ui/FileViewer';

export default function App() {
  return (
    <>
      <FileViewer fetchedFileUrl='https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' fileType='pdf' buttonText='View Pdf File'/>
      <FileViewer fetchedFileUrl='https://docs.google.com/spreadsheets/d/1XMUUFjKqiHFlBKw64fKHoF5TbCYVAXAY/export?format=xlsx' fileType='excel' buttonText='View Excel File'/>
    </>


  );
}
