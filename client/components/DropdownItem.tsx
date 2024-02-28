// DropdownItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DropdownItem = ({ label }: { label: string }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.dropdownLabel}>{label}</Text>
            <View style={styles.line}></View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dropdownLabel: {
    fontSize: 18,
    color: 'care-wallet-black',
    marginRight: 10, // Adjust the margin to provide space between text and line
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
});

export default DropdownItem;
