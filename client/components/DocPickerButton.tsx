import React from 'react';
import { Button, View } from 'react-native';

import { getDocumentAsync } from 'expo-document-picker';

import { useCareWalletContext } from '../contexts/CareWalletContext';
import { useFile } from '../services/file';

export function DocPickerButton() {
  const { user, group } = useCareWalletContext();
  const { uploadFileMutation } = useFile();

  const pickDocument = async () => {
    try {
      await getDocumentAsync({
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
}
