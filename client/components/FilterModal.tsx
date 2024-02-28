// FilterModal.js
import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View, Dimensions } from 'react-native';
import DropdownItem from './DropdownItem';

const windowHeight = Dimensions.get('window').height;

const FilterModal = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Filter Options</Text>
        {/* Add your filter options components here */}
        <View style={styles.filterOptions}>
          {/* Example dropdown menu */}
          <DropdownItem label="Category" />
          {/* Add more dropdown menus as needed */}
        </View>
        <Pressable onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center', // Center the modal vertically
    alignItems: 'center', // Center the modal horizontally
    backgroundColor: 'white', // White background
    borderRadius: 20,
    height: windowHeight / 2, // Set the height to half of the screen
    marginTop: windowHeight / 2, // Adjust marginTop to make it centered
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
    color: 'black', // Black text
    marginBottom: 20,
  },
  filterOptions: {
    // Style for filter options container
    padding: 20, // Add padding for better spacing
  },
  closeButtonText: {
    fontSize: 18,
    color: 'care-wallet-black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FilterModal;
