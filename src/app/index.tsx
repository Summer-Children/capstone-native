import React, { useState, useEffect } from "react";
import { Button, View, Pressable } from "react-native";
import Pdf from "react-native-pdf";
import Share from "react-native-share";
import Icon from "@react-native-vector-icons/evil-icons";
import RNFS from "react-native-fs";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [pdfPath, setPdfPath] = useState<string | null>(null);

  // TODO: Replace the following sample PDF url with the actual pdf data fetched from the backend once the backend is ready(Eventually, the backend server will send the PDF file data and the app will save it as a blob and save them somewhere, probably react-native-fs.)
  const fetchedPdf =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const downloadPdf = async () => {
    // TODO: Update the following "/dummy.pdf" once the backend is ready
    const localFilePath = `${RNFS.DocumentDirectoryPath}/dummy.pdf`;

    const fileExists = await RNFS.exists(localFilePath);
    if (!fileExists) {
      await RNFS.downloadFile({
        fromUrl: fetchedPdf,
        toFile: localFilePath,
      }).promise;
    }
    setPdfPath(localFilePath);
  };

  useEffect(() => {
    (async () => {
      await downloadPdf();
    })();
  }, []);

  const handleShare = async () => {
    if (!pdfPath) return;

    await Share.open({
      // url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      url: `file://${pdfPath}`,
      type: "application/pdf",
      failOnCancel: false,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!visible ? (
        <Button title="View PDF" onPress={() => setVisible(true)} />
      ) : (
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
          <Pdf
            source={{
              uri: pdfPath || "",
              cache: true,
            }}
            style={{ flex: 1 }}
          />
          <Pressable onPress={handleShare}>
            <Icon name="share-apple" size={50} />
          </Pressable>
          <Button title="Close PDF" onPress={() => setVisible(false)} />
        </View>
      )}
    </View>
  );
}
