import React from 'react';
import { Button, Dimensions, Image, StyleSheet, View } from 'react-native';

import { useFile, useFileByGroup } from '../services/file';

// Make sure the path is correct for your project structure

function TestScreen() {
  const { removeFileMutation } = useFile();
  const { file } = useFileByGroup(5, 'test_2.png');

  function handleRemove() {
    removeFileMutation({
      groupId: 5,
      fileName: 'test_2.png'
    });
  }

  return (
    <View style={styles.container}>
      {file && (
        <Image
          source={{
            uri: file,
            width: Dimensions.get('window').width / 2,
            height: Dimensions.get('window').height / 3
          }}
        />
      )}
      <Button title="Remove File" onPress={handleRemove} />
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
