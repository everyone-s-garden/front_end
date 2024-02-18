import React, { ReactNode, useCallback, useState } from 'react';
import Modal from 'pages/Trading/components/Modal/Modal';

interface ModalProperties {
  children: ReactNode;
}

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기
  const open = useCallback(() => {
    setIsOpen(() => true);
  }, []);

  // 모달 닫기
  const close = useCallback(() => {
    setIsOpen(() => false);
  }, []);

  // isOpen이 true라면 modal 컴포넌트를 반환, false라면 null을 반환
  return {
    Modal: isOpen ? ({ children }: ModalProperties) => <Modal onClose={close}>{children}</Modal> : () => <></>,
    open,
    close,
  };
};

export default useModal;
