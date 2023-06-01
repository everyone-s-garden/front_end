import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { NotiContentAtom } from 'recoil/atom';

function Notification() {
  const [content, setContent] = useRecoilState(NotiContentAtom);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (content === '') return;

    setIsOpen(true);
    let timer1 = setTimeout(() => {
      setIsOpen(false);
    }, 3000);
    let timer2 = setTimeout(() => {
      setContent('');
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [content, setContent]);

  return <NotiContainer isOpen={isOpen}>{content}</NotiContainer>;
}

export default Notification;

const NotiContainer = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: fixed;
  z-index: 1000;
  margin: auto;
  padding: 16px 30px;
  bottom: 100px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background-color: #9acd79;
  height: 50px;
  font-size: 15px;
  font-weight: 400;
  border-radius: 10px;
  transition: all 0.2s ease-in;
`;
