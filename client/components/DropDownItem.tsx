import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DropdownItem = ({ label }: { label: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dropdownLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  dropdownLabel: {
    fontSize: 18,
    color: 'care-wallet-black',
    marginRight: 10
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray'
  }
});

export default DropdownItem;
