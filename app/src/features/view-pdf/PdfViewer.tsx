
import React, { useState } from "react";
import { View, Button } from "react-native";
import Pdf from "react-native-pdf";

export default function PdfViewer () {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!visible ? (
        <Button title="Open PDF" onPress={() => setVisible(true)} />
      ) : (
        <View style={{ flex: 1, width: "100%", height: "100%" }}>
            {/* TODO: repace the following sample PDF url with the actual url */}
            {/* バックエンドからfPDF ileを送ってきて、それをopenできるようにしたい。  download as a blob and save them somewhere。以下のサンプルURLはhttpだけど、それではなく最終的にfile systemに関するURLを閲覧できるようにしたい。*/}
            {/* PDF開いたときに下部左側に出てくるshareボタンを、react native share libraryを使って追加する*/}
          <Pdf
            source={{ uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", cache: true }}
            style={{ flex: 1 }}
          />
          <Button title="Close PDF" onPress={() => setVisible(false)} />
        </View>
      )}
    </View>
  );
};
