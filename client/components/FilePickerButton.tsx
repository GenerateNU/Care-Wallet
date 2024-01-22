import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function FilePickerButton(){
  const [pickedDocument, setPickedDocument] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      });
      console.log('result', result);

      if (result.canceled === false) {
        setPickedDocument(result.assets[0].name);
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <View>
      <Button title="Pick Document" onPress={pickDocument} />
      {pickedDocument && <Text>Picked Document: {pickedDocument}</Text>}
    </View>
  );
};