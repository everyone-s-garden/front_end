import React, { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

import { BREAK_POINT, COLOR } from 'constants/style';
import { useRecoilState } from 'recoil';
import { hasMyGardenAtom } from 'recoil/atom';
import customAxios from 'utils/token';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MyPostRemoveModal({ isOpen, setIsOpen }: ModalProps) {
  const [hasMyGarden, setHasMyGarden] = useRecoilState(hasMyGardenAtom);
  const nav = useNavigate();
  const reset = () => {
    setIsOpen(false);
  };
  const myGardenDelete = async () => {
    if (hasMyGarden) {
      try {
        const res: AxiosResponse = await customAxios.delete(`v2/gardens/my-managed/${hasMyGarden.myManagedGardenId}`);
        if (res.status === 204) {
          nav('/');
          setIsOpen(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <ModalBackground isOpen={isOpen} onClick={reset}>
      <ModalContainer
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <Question>삭제하시겠습니까?</Question>
        <Response>
          <div onClick={() => setIsOpen(false)}>취소</div>
          <div onClick={myGardenDelete}>확인</div>
        </Response>
      </ModalContainer>
    </ModalBackground>
  );
}

export default MyPostRemoveModal;

const ModalBackground = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: fixed;
  z-index: 1000;
  padding-top: 300px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding-top: 250px;
  }
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: ${COLOR.BACKGROUND};
  margin: auto;
  border: 1px solid #888;
  width: 341px;
  height: 142px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: #414c38;
  font-size: 18px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Question = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px 6px 0px 0px;
  border-bottom: 1px solid #d9d9d9;
`;

const Response = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  border-radius: 6px 6px 6px 6px;
  div:nth-child(1) {
    border-right: 1px solid #d9d9d9;
  }
  div {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    transition: 0.3s ease-in-out;
    :hover {
      color: var(--point-1, #f77800);
    }
  }
`;
