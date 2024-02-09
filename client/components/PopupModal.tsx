import React from 'react';
import { styled } from 'nativewind';
import { Modal, Portal } from 'react-native-paper';

interface PopupModalProps {
  isVisible: boolean;
  setVisible: (val: boolean) => void;
  children?: JSX.Element[] | JSX.Element;
}

const StyledModal = styled(Modal, {
  props: {
    contentContainerStyle: true
  }
});

const PopupModal = ({ children, isVisible, setVisible }: PopupModalProps) => {
  return (
    <Portal>
      <StyledModal
        visible={isVisible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle="border-10 rounded-3xl border-white w-[90%] h-[60%] self-center bg-white"
      >
        {children}
      </StyledModal>
    </Portal>
  );
};

export default PopupModal;
