import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from '../../../../constants/style';

interface ModalProperties {
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProperties) => {
  return (
    <Dimmed onClick={onClose}>
      <Container onClick={e => e.stopPropagation()}>{children}</Container>
    </Dimmed>
  );
};

export default Modal;

const Dimmed = styled.div`
  position: fixed;
  opacity: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in;
  z-index: 1001;
`;

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1002;
  transform: translateY(-50%);
`;
