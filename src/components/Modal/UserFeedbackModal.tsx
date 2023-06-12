import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { IFormData, ILen, IUrl } from 'pages/My/RegisterSeller/type';

import { NotiContentAtom } from 'recoil/atom';
import Modal from 'components/Modal/Modal';
import smileIllust from 'assets/modal/smile.svg';
import icon from '../../assets/image_small.svg';
import delete_icon from '../../assets/delete_icon.png';
import { getImages } from 'pages/My/RegisterUser/query';
import { AxiosResponse } from 'axios';
import customAxios from 'utils/token';
interface UserFeedbackModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function UserFeedbackModal({ isOpen, setIsOpen }: UserFeedbackModalProps) {
  const [_, setContent] = useRecoilState(NotiContentAtom);
  const [comment, setComment] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);

  const onSubmit = async () => {
    setIsOpen(false);
    if (comment.length > 2) {
      const feedBackData: { content: string; images: string[] } = {
        content: comment,
        images,
      };
      try {
        const res = await customAxios.post(`v1/feedback`, feedBackData);
        console.log(res);
        setContent('제출되었습니다. 소중한 의견 감사합니다 ♥︎');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length === 10) {
      alert('최대 10장까지 등록할 수 있습니다.');
      return;
    }
    if (event.currentTarget.files) {
      const uploadImg = event.currentTarget.files[0] as File;
      const formData: IFormData = new FormData();
      formData.append('file', uploadImg);
      try {
        const res = (await getImages(formData)) as AxiosResponse;
        const newImage: string[] = [res.data.imageUrl];
        setImages(prevImages => [...newImage, ...prevImages]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
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

        <ImageWrapper>
          <ImageAddBtn>
            <input accept="image/*" type="file" id="file" onChange={addImage} style={{ display: 'none' }} />
            <label htmlFor="file">
              <img src={icon} />
            </label>
            <div>
              <span>{images.length}</span>
              <span>/10</span>
            </div>
          </ImageAddBtn>
          <ScrollBox len={images.length}>
            <ImageList>
              {images.map((image, index) => (
                <ImgBox srcUrl={image} key={index}>
                  <Delete onClick={() => deleteImage(index)} src={delete_icon} />
                </ImgBox>
              ))}
            </ImageList>
          </ScrollBox>
        </ImageWrapper>

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

const ImageWrapper = styled.div`
  display: flex;
`;

const ImageAddBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  flex-direction: column;
  margin-right: 11px;
  margin-top: 5px;
  cursor: pointer;
  img {
    margin-bottom: 2px;
    cursor: pointer;
  }
  span {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    color: #d9d9d9;
  }
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
  margin-bottom: 13px;
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
const ScrollBox = styled.div<ILen>`
  width: calc(100% - 80px);
  height: fit-content;
  padding-bottom: 10px;
  padding-top: 5px;
  display: ${props => (props.len >= 1 ? 'flex' : 'none')};
  align-items: center;
  overflow-x: auto !important;

  scrollbar-width: thin;
  scrollbar-color: #888 #e0ebd4;
  transition: 0.3s ease-in-out;

  &::-webkit-scrollbar {
    display: block !important; /* Chrome, Safari, Opera*/
  }

  &::-webkit-scrollbar {
    height: 7.5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 7px;
  }
  &::-webkit-scrollbar-track {
    background-color: #e0ebd4;
    border-radius: 7px;
  }
  &::-moz-scrollbar {
    height: 7.5px;
  }

  &::-moz-scrollbar-thumb {
    background-color: #888;
    border-radius: 7px;
  }

  &::-moz-scrollbar-track {
    background-color: #e0ebd4;
    border-radius: 7px;
  }
`;

const ImageList = styled.div`
  display: flex;
  width: fit-content;
`;

const ImgBox = styled.div<IUrl>`
  width: 72px;
  height: 72px;
  margin-right: 10px;
  position: relative;
  border-radius: 5px;
  background-image: ${props => props.srcUrl && `url(${props.srcUrl})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Delete = styled.img`
  position: absolute;
  top: -5px;
  right: -5px;
  cursor: pointer;
  width: 13px;
  height: 13px;
`;
