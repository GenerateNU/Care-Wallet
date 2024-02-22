// TaskInfoComponent.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskInfoComponent = ({ name, label, category, type }: 
  { name: string, label: string, category: string, type: string }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.label}>{label}</Text>
            <Text>{`Category: ${category}`}</Text>
            <Text>{`Type: ${type}`}</Text>
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
      backgroundColor: '#D9D9D9',
    },
    name: {
      fontWeight: 'bold',
      alignSelf: 'flex-end',
    },
    label: {
      alignSelf: 'flex-start',
    },
  });
  
export default TaskInfoComponent;
