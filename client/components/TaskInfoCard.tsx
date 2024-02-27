// TaskInfoComponent.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function TaskInfoComponent({
  name,
  label,
  category,
  type
}: {
  name: string;
  label: string;
  category: string;
  type: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.taskNumber}>{`Task #${name}`}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.categoryType}>{`${category} - ${type}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    margin: 10,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  taskNumber: {
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },
  label: {
    alignSelf: 'flex-start'
  },
  categoryType: {
    marginTop: 10
  }
});
