// TaskInfoComponent.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskInfoComponent = ({ name, label, category, type, date }: 
  { name: string, label: string, category: string, type: string, date: Date }) => {

  const formattedStartDate = date ? new Date(date).toLocaleDateString() : 'N/A';
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.taskNumber}>{`Task #${name}`}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.categoryType}>{`${category} | ${type}`}</Text>
      <Text style={styles.categoryType}>{`${formattedStartDate}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#000000',
      padding: 10,
      margin: 10,
      backgroundColor: '#FFFFFF',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    taskNumber: {
      fontWeight: 'bold',
      alignSelf: 'flex-end',
    },
    label: {
      alignSelf: 'flex-start',
    },
    categoryType: {
      marginTop: 10,
    },
  });
  
export default TaskInfoComponent;
