import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { uploadFile } from '../services/file';
import { useCareWalletContext } from '../contexts/CareWalletContext';

export default function DocPickerButton() {
  const [pickedDocument, setPickedDocument] = useState<string | null>(null);
  const { user, group } = useCareWalletContext();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      });
      console.log('result', result);

      if (result.canceled === false) {
        // TODO get userID and groupID
        const userID = user.userID;
        const groupID = group.groupID;
        await uploadFile(result.assets[0], userID, groupID);
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
}
