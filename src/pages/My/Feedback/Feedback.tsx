import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isFeedbackOpenAtom } from 'recoil/atom';
import styled from 'styled-components';
import { ReactComponent as FeedBackIcon } from 'assets/my/feedback-icon.svg';
import { ReactComponent as ArrowIcon } from 'assets/my/arrow-icon.svg';
import useSelect from 'hooks/useSelect';
import FeedbackImageInput from './FeedbackImageInput';
import { useCreateFeedback } from 'api/UserAPI';

const TypeSelect = ['텃밭 분양', '작물 판매', '속닥속닥', '채팅 관련', '마이페이지', '기타'];

const Feedback = () => {
  const { mutate: createFeedback } = useCreateFeedback();
  const [isFeedbackOpen, setIsFeedbackOpen] = useRecoilState(isFeedbackOpenAtom);
  const [type, setType] = useState<string>('의견 유형');
  const { isOpen, toggleSelect } = useSelect();
  const [content, setContent] = useState<string>('');
  const [images, setImages] = useState<
    {
      file: Blob;
      src: string;
    }[]
  >([]);

  const handleFeedbackBackgroundClick = () => {
    setIsFeedbackOpen(false);
  };

  if (!isFeedbackOpen) return null;

  const isValidateForm = type !== '의견 유형' && content.length > 0;

  const handleSubmit = () => {
    if (!isValidateForm) return;

    let feedbackType = '';
    switch (type) {
      case '텃밭 분양':
        feedbackType = 'GARDEN';
        break;
      case '작물 판매':
        feedbackType = 'CROP';
        break;
      case '속닥속닥':
        feedbackType = 'COMMUNITY';
        break;
      case '채팅 관련':
        feedbackType = 'CHAT';
        break;
      case '마이페이지':
        feedbackType = 'MYPAGE';
        break;
      case '기타':
        feedbackType = 'ETC';
        break;
      default:
        break;
    }
    const formData = new FormData();

    if (!feedbackType) return;

    formData.append('feedbackType', feedbackType);
    formData.append('content', content);
    formData.append(
      'texts',
      new Blob(
        [
          JSON.stringify({
            content: content,
            feedbackType: feedbackType,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    images.forEach(image => {
      formData.append('images', image.file);
    });
    createFeedback(formData, {
      onSuccess: () => {
        setType('의견 유형');
        setContent('');
        setImages([]);
        setIsFeedbackOpen(false);
      },
    });
  };

  return (
    <FeedbackBackground onClick={handleFeedbackBackgroundClick}>
      <FeedbackWrapper onClick={e => e.stopPropagation()}>
        <TitleWrapper>
          <Title>유저의 소리함</Title>
        </TitleWrapper>
        <DescriptionWrapper>
          <FeedBackIcon />
          <Description>
            안녕하세요. 모두의 텃밭입니다.
            <br />
            의견 및 제안사항, 오류가 있다면
            <br />
            남겨주세요.
          </Description>
        </DescriptionWrapper>
        <TypeSelectWrapper onClick={toggleSelect}>
          <Type>{type}</Type>
          <StyledArrowIcon isOpen={isOpen} />
          {isOpen && (
            <SelectContainer>
              {TypeSelect.map(type => (
                <SelectItem key={type} onClick={() => setType(type)}>
                  {type}
                </SelectItem>
              ))}
            </SelectContainer>
          )}
        </TypeSelectWrapper>
        <Content placeholder="문의사항을 입력해주세요." value={content} onChange={e => setContent(e.target.value)} />
        <FeedbackImageInput images={images} setImages={setImages} />
        <Button onClick={handleSubmit} isValidateForm={isValidateForm}>
          등록하기
        </Button>
      </FeedbackWrapper>
    </FeedbackBackground>
  );
};

const FeedbackBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedbackWrapper = styled.div`
  position: relative;
  height: 100px;
  width: 100%;
  max-width: 340px;
  margin: 0 15px;
  height: 518px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px 15px;
  gap: 20px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const Description = styled.p`
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.green[100]};
  padding: 10px 15px;
  border-radius: 10px;
  line-height: 1.5;
`;

const TypeSelectWrapper = styled.div`
  height: 36px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green[500]};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  position: relative;
`;

const StyledArrowIcon = styled(ArrowIcon)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.1s ease-in;
`;

const Type = styled.div`
  font-size: 14px;
`;

const SelectContainer = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 10px;
  width: 100%;
  left: 0;
  top: 40px;
  z-index: 1001;

  & > div:last-child {
    border: none;
    border-radius: 0 0 10px 10px;
  }

  & > div:first-child {
    border-radius: 10px 10px 0 0;
  }
`;

const SelectItem = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  cursor: pointer;
  transition: background-color 0.2s ease-in;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
`;

const Content = styled.textarea`
  width: 100%;
  height: 105px;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 10px;
  padding: 10px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const Button = styled.button<{ isValidateForm: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 57px;
  background-color: ${({ theme }) => theme.colors.green[500]};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  border-radius: 0 0 10px 10px;
  opacity: ${({ isValidateForm }) => (isValidateForm ? 1 : 0.5)};
`;

export default Feedback;
