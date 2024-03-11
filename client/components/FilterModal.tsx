import React from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native';

import DropdownItem from './DropdownItem';

const windowHeight = Dimensions.get('window').height;

const FilterModal = ({
  isVisible,
  onClose
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Filters</Text>
          <View style={styles.filterOptions}>
            <DropdownItem label="Category" />
            <View style={styles.dropdownSeparator}></View>
            <DropdownItem label="Type" />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start', // Align items to the left
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    height: windowHeight / 2,
    marginTop: windowHeight / 2
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginBottom: 20
  },
  filterOptions: {
    padding: 20
  },
  dropdownSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginVertical: 10
  }
});

export default FilterModal;
