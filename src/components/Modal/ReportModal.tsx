import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { COLOR } from 'constants/style';
import { NotiContentAtom, reportPostIdAtom } from 'recoil/atom';
import Modal from 'components/Modal/Modal';
import customAxios from 'utils/token';
import { getItem } from 'utils/session';
import { ReportApi } from '../../api/ReportAPI';

interface ReportModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReportModal({ isOpen, setIsOpen }: ReportModalProps) {
  const [reportPostId, setReportPostId] = useRecoilState(reportPostIdAtom);
  const setContent = useSetRecoilState(NotiContentAtom);
  const [selected, setSelected] = useState<string>('허위매물');
  const [comment, setComment] = useState<string>('');

  const onSubmit = async () => {
    const isLogin = Boolean(getItem('isLogin'));

    if (!isLogin) {
      setContent('로그인이 필요한 서비스입니다.');
      return;
    }

    if (!reportPostId) return;

    // const reportResult = ReportApi({
    //   postId: reportPostId,
    //   content:
    // })

    console.log('~~~call~~~');
    console.log(selected, comment);

    await customAxios.post('/v1/report', {
      item: selected,
      content: comment,
      postId: reportPostId,
    });

    setReportPostId(null);
    setIsOpen(false);
    setContent('신고가 접수되었습니다. 신속하게 처리하겠습니다.');
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <ModalTitle>신고하기</ModalTitle>
        <SubTitle>신고하는 이유를 선택해주세요.</SubTitle>

        <SelectSection>
          <RadioBtn>
            <input
              type="radio"
              name="violation"
              id="scam"
              checked={selected === '허위매물'}
              onChange={() => setSelected('허위매물')}
            />
            <label htmlFor="scam">허위 매물이에요.</label>
          </RadioBtn>
          <RadioBtn>
            <input
              type="radio"
              name="violation"
              id="spam"
              checked={selected === '도배글'}
              onChange={() => setSelected('도배글')}
            />
            <label htmlFor="spam">도배글이에요.</label>
          </RadioBtn>
          <RadioBtn>
            <input
              type="radio"
              name="violation"
              id="insult"
              checked={selected === '욕설'}
              onChange={() => setSelected('욕설')}
            />
            <label htmlFor="insult">욕설이 포함되어 있어요.</label>
          </RadioBtn>
          <RadioBtn>
            <input
              type="radio"
              name="violation"
              id="privacy"
              checked={selected === '개인정보노출'}
              onChange={() => setSelected('개인정보노출')}
            />
            <label htmlFor="privacy">동의하지 않은 개인정보가 있어요.</label>
          </RadioBtn>
          <RadioBtn>
            <input
              type="radio"
              name="violation"
              id="sexual"
              checked={selected === '선정성'}
              onChange={() => setSelected('선정성')}
            />
            <label htmlFor="sexual">선정적(신체노출 등), 차별적 내용(종교, 인종 등)이포함되어 있어요.</label>
          </RadioBtn>
          <RadioBtn>
            <input
              type="radio"
              name="violation"
              id="etc"
              checked={selected === '기타'}
              onChange={() => setSelected('기타')}
            />
            <label htmlFor="etc">기타</label>
          </RadioBtn>
        </SelectSection>

        <CommentWrapper>
          <TextArea
            placeholder="신고 내용을 직접 입력해주세요"
            onChange={e => setComment(e.target.value)}
            value={comment}
            disabled={selected !== '기타'}
          ></TextArea>
          <WordLimit>({comment.length}/800)</WordLimit>
        </CommentWrapper>

        <SubmitBtn onClick={onSubmit}>제출하기</SubmitBtn>
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

const SelectSection = styled.fieldset`
  margin-top: 25px;
  margin-bottom: 10px;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: none;
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
