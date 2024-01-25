import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from '../services/file';

export default function DocPickerButton(){
  const [pickedDocument, setPickedDocument] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      });
      console.log('result', result);

      if (result.canceled === false) {
        handleFileUpload(result.assets[0]);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleFileUpload = async (doc: DocumentPicker.DocumentPickerAsset) => {
    // TODO access userID somehow
    const userID = 100;
    await uploadFile(doc, userID);
  };

  return (
    <View>
      <Button title="Pick Document" onPress={pickDocument} />
      {pickedDocument && <Text>Picked Document: {pickedDocument}</Text>}
    </View>
  );
};