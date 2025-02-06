import React, { useState, useEffect } from "react";
import { Button, View, Alert } from "react-native";
import RNFS from "react-native-fs";
import { viewDocument } from "@react-native-documents/viewer";

interface FileViewerProps {
    fetchedFileUrl: string;
    fileType:"pdf" | "excel";
    buttonText?: string;
}

export default function FileViewer({ fetchedFileUrl, fileType, buttonText }: FileViewerProps) {
    const [filePath, setFilePath] = useState<string | null>(null);

    const downloadFile = async () => {
        const localFilePath = `${RNFS.DocumentDirectoryPath}/dummy.${fileType === "pdf" ? "pdf" : "xlsx"}`;

        try {
            const fileExists = await RNFS.exists(localFilePath);
            if (!fileExists) {
                const options = {
                    fromUrl: fetchedFileUrl,
                    toFile: localFilePath,
                };
                await RNFS.downloadFile(options).promise;
            }
            setFilePath(localFilePath);
        } catch (err) {
            Alert.alert("Download Failed", "Could not download the Excel file.");
        }
    };

    useEffect(() => {
        (async () => {
            await downloadFile();
        })();
    }, []);

    const handleOpenFile = async () => {
        if (!filePath) {
            Alert.alert(
                "No File Found",
                "The file is not available. Please try again.",
            );
            return;
        }

        try {
            await viewDocument({
                uri: `file://${filePath}`,
                mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                presentationStyle: "fullScreen",
            });
        } catch (err) {
            Alert.alert("Error", "Failed to open the file.");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Button title={buttonText || "Open File"} onPress={handleOpenFile} />
        </View>
    );
}
