// AddNewTaskButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddNewTaskButton: React.FC = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    // Navigate to the AddNewTask screen
    navigation.navigate('AddNewTask');
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>Add New Task</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10 // Add some bottom margin for separation
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default AddNewTaskButton;
