import React, { useState } from 'react';
import styled from 'styled-components';

import { COLOR } from 'constants/style';
import Modal from 'components/Modal/Modal';

interface ReportModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReportModal({ isOpen, setIsOpen }: ReportModalProps) {
  const [comment, setComment] = useState<string>('');
  const [isChecked0, setIsChecked0] = useState<boolean>(false);
  const [isChecked1, setIsChecked1] = useState<boolean>(false);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);
  const [isChecked3, setIsChecked3] = useState<boolean>(false);
  const [isChecked4, setIsChecked4] = useState<boolean>(false);
  const [isChecked5, setIsChecked5] = useState<boolean>(false);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <ModalTitle>신고하기</ModalTitle>
        <SubTitle>신고하는 이유를 선택해주세요.</SubTitle>

        <SelectSection>
          <RadioBtn>
            <input type="checkbox" id="louie" checked={isChecked0} onChange={() => setIsChecked0(!isChecked0)} />
            <label htmlFor="louie">허위 매물이에요.</label>
          </RadioBtn>
          <RadioBtn>
            <input type="checkbox" id="louie" checked={isChecked1} onChange={() => setIsChecked1(!isChecked1)} />
            <label htmlFor="louie">도배글이에요.</label>
          </RadioBtn>
          <RadioBtn>
            <input type="checkbox" id="louie" checked={isChecked2} onChange={() => setIsChecked2(!isChecked2)} />
            <label htmlFor="louie">욕설이 포함되어 있어요.</label>
          </RadioBtn>
          <RadioBtn>
            <input type="checkbox" id="louie" checked={isChecked3} onChange={() => setIsChecked3(!isChecked3)} />
            <label htmlFor="louie">동의하지 않은 개인정보가 있어요.</label>
          </RadioBtn>
          <RadioBtn>
            <input type="checkbox" id="louie" checked={isChecked4} onChange={() => setIsChecked4(!isChecked4)} />
            <label htmlFor="louie">선정적(신체노출 등), 차별적 내용(종교, 인종 등)이포함되어 있어요.</label>
          </RadioBtn>
          <RadioBtn>
            <input type="checkbox" id="louie" checked={isChecked5} onChange={() => setIsChecked5(!isChecked5)} />
            <label htmlFor="louie">기타.</label>
          </RadioBtn>
        </SelectSection>

        <CommentWrapper>
          <TextArea
            placeholder="신고 내용을 직접 입력해주세요"
            onChange={e => setComment(e.target.value)}
            value={comment}
            disabled={!isChecked5}
          ></TextArea>
          <WordLimit>({comment.length}/800)</WordLimit>
        </CommentWrapper>

        <SubmitBtn>제출하기</SubmitBtn>
      </ModalContent>
    </Modal>
  );
}

export default ReportModal;

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

const SubTitle = styled.h2`
  margin-top: 8px;
  color: #414c38;
  font-size: 16px;
  font-weight: 400;
`;

const SelectSection = styled.section`
  margin-top: 25px;
  margin-bottom: 10px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RadioBtn = styled.div`
  width: 100%;
  display: flex;

  & > input {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    appearance: none;
    border: 1px solid #d9d9d9;
    border-radius: 50%;
    cursor: pointer;

    &:checked {
      box-shadow: 0 0 0 1px #d9d9d9;
      border: 0.4em solid ${COLOR.BACKGROUND};
      background-color: #afd082;
    }
  }

  & > label {
    margin-left: 8px;
    padding-top: 2px;
    color: #414c38;
    font-size: 14px;
    font-weight: 400;
  }
`;

const CommentWrapper = styled.div`
  position: relative;
  margin-bottom: 60px;
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

  &:disabled {
    background-color: ${COLOR.BACKGROUND};
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
