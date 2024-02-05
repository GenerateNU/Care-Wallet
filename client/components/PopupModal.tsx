import { styled } from 'nativewind';
import React from 'react';
import { Modal, Portal } from 'react-native-paper';

interface PopupModalProps {
  isVisible: boolean;
  setVisible: (val: boolean) => void;
  children?: JSX.Element[] | JSX.Element;
}

// rnp requires contentcontainerstyle to style the component, this will integrate native-wind into that
const StyledModal = styled(Modal, {
  props: {
    contentContainerStyle: true
  }
});

export default function PopupModal({
  children,
  isVisible,
  setVisible
}: PopupModalProps) {
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
}
