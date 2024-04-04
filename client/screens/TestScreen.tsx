import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import * as DocumentPicker from 'expo-document-picker';

import { useFile } from '../services/file';

// Make sure the path is correct for your project structure

function TestScreen() {
  const { uploadFileMutation, removeFileMutation, getFileMutation } = useFile();

  function handleRemove() {
    removeFileMutation({
      groupId: 5, // Replace with actual group ID
      fileName: '2.png' // Replace with actual file name
    });
  }

  function handleGetFile() {
    getFileMutation({
      groupId: 5, // Replace with actual group ID
      fileName: '2.png' // Replace with actual file name
    });
  }

  return (
    <View style={styles.container}>
      <Button title="Remove File" onPress={handleRemove} />
      <Button title="Get File" onPress={handleGetFile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default TestScreen;
