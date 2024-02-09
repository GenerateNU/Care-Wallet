import React from 'react';
import { View, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useFile } from '../services/file';

const DocPickerButton = () => {
  const { user, group } = useCareWalletContext();
  const { uploadFileMutation } = useFile();

  const pickDocument = async () => {
    try {
      await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: false
      }).then((res) => {
        if (!res.canceled) {
          uploadFileMutation({
            file: res.assets[0],
            userId: user.userID,
            groupId: group.groupID
          });
        }
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <View>
      <Button title="Pick Document" onPress={pickDocument} />
    </View>
  );
};

export default DocPickerButton;
