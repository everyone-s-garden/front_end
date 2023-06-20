import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

import { COLOR } from 'constants/style';
import closeIcon from 'assets/x-icon.svg';
import { useResetRecoilState } from 'recoil';
import { feedbackCommentAtom, feedbackImgAtom } from 'recoil/atom';

interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  const resetFeedbackComment = useResetRecoilState(feedbackCommentAtom);
  const resetFeedbackImg = useResetRecoilState(feedbackImgAtom);
  const reset = () => {
    setIsOpen(false);
    resetFeedbackComment();
    resetFeedbackImg();
  };
  return (
    <ModalBackground isOpen={isOpen} onClick={reset}>
      <ModalContainer
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <CloseIcon src={closeIcon} alt="close" onClick={reset} />
        {children}
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;

const ModalBackground = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: fixed;
  z-index: 1000;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: ${COLOR.BACKGROUND};
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 340px;
  height: 570px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 18px;
  cursor: pointer;
`;
