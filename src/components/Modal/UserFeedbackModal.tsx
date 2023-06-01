import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { NotiContentAtom } from 'recoil/atom';
import Modal from 'components/Modal/Modal';
import smileIllust from 'assets/modal/smile.svg';

interface UserFeedbackModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserFeedbackModal({ isOpen, setIsOpen }: UserFeedbackModalProps) {
  const [_, setContent] = useRecoilState(NotiContentAtom);
  const [comment, setComment] = useState<string>('');

  const onSubmit = () => {
    setIsOpen(false);
    setContent('제출되었습니다. 소중한 의견 감사합니다 ♥︎');
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <ModalTitle>유저의 소리함</ModalTitle>
        <IntroSection>
          <SmileIllust src={smileIllust} alt="아이콘" />
          <Speech>안녕하세요. 모두의 텃밭팀 입니다. 문의 및 제안 사항, 오류가 있다면 남겨주세요.</Speech>
        </IntroSection>

        <CommentWrapper>
          <TextArea placeholder="입력해주세요" onChange={e => setComment(e.target.value)} value={comment}></TextArea>
          <WordLimit>({comment.length}/1500)</WordLimit>
        </CommentWrapper>

        <SubmitBtn onClick={onSubmit}>제출하기</SubmitBtn>
      </ModalContent>
    </Modal>
  );
}

export default UserFeedbackModal;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ModalTitle = styled.h1`
  color: #414c38;
  font-size: 18px;
  font-weight: 500;
`;

const IntroSection = styled.section`
  margin-top: 15px;
  margin-bottom: 20px;
  width: 100%;
  height: 100px;
  display: flex;
`;

const SmileIllust = styled.img`
  margin-right: 5px;
  width: 50px;
`;

const Speech = styled.div`
  padding: 12px 14px;
  color: #5a8534;
  font-size: 16px;
  font-weight: 400;
  line-height: 22px;
  background-color: #f1f7e8;
  border-radius: 12px;
`;

const CommentWrapper = styled.div`
  position: relative;
  padding: 10px 15px;
  padding-bottom: 24px;
  width: 100%;
  height: 120px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: #d9d9d9;
    font-size: 14px;
    font-weight: 300;
  }
`;

const WordLimit = styled.span`
  position: absolute;
  bottom: 5px;
  right: 10px;
  color: #afafaf;
  font-size: 12px;
  font-weight: 400;
`;

const SubmitBtn = styled.button`
  margin-top: auto;
  width: 100%;
  height: 48px;
  color: #ffffff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  background-color: #86bf60;
  border-radius: 6px;
`;
