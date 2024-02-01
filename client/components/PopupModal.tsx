import React from 'react';
import {
  Modal,
  Portal,
  Text,
  Button,
  Provider as PaperProvider
} from 'react-native-paper';

interface PopupModalProps {
  med: Medication[];
  onPress: () => void;
  buttonStyle?: object;
  modalStyle?: object;
  modalContent?: React.ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({
  med,
  onPress,
  buttonStyle,
  modalStyle,
  modalContent
}) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    ...modalStyle
  };

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {modalContent || <Text>Default Modal Content</Text>}
        </Modal>
      </Portal>
      <Button
        style={{ marginTop: 30, ...buttonStyle, width: 200, maxHeight: 200 }}
        onPress={showModal}
      >
        {med[0].medication_name}
      </Button>
    </PaperProvider>
  );
};

export default PopupModal;
