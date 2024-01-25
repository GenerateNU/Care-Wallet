import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from '../services/file';
import { useMutation } from '@tanstack/react-query';

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
        handleFileUpload.mutate(result.assets[0], {
          onSuccess: () => {
            console.log("lets go, file uploaded successfully");
          },
          onError: (error) => {
            console.log('file failed to upload', error);}
        });
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleFileUpload = useMutation({
    mutationFn: async (file: DocumentPicker.DocumentPickerAsset) => {
      const userID = 100;
      await uploadFile(file, userID)
    }
  });

  return (
    <View>
      <Button title="Pick Document" onPress={pickDocument} />
      {pickedDocument && <Text>Picked Document: {pickedDocument}</Text>}
    </View>
  );
};