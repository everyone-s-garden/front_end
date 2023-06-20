import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';

import { BREAK_POINT } from '../../../constants/style';
import Form from './Form';
import addIcon from '../../../assets/my/register/add-icon.svg';
import delete_icon from 'assets/delete_icon.svg';
import { getImages } from '../../../utils/getImages';
import { IFormData, ILocation, IUrl, ILen } from './type';
import { useMatch } from 'react-router-dom';
import { formDataHandler } from './query';
import { AxiosResponse } from 'axios';
const RegisterSeller = () => {
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<ILocation>({
    address: '',
    lat: '',
    lng: '',
  });
  const match = useMatch('/my/post/edit/:id');
  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length === 20) {
      alert('최대 20장까지 등록할 수 있습니다.');
      return;
    }
    if (event.currentTarget.files) {
      const uploadImg = event.currentTarget.files[0] as File;
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(uploadImg, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = async () => {
          const base64data = reader.result;
          const formData = await formDataHandler(base64data);
          const res = (await getImages(formData)) as AxiosResponse;
          const newImage: string[] = [res.data.imageUrl];
          setImages(prevImages => [...newImage, ...prevImages]);
        };
      } catch (err) {
        console.log(err);
      }
    }
  };

  const deleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <H1>{match ? '판매 텃밭 수정하기' : ' 판매 텃밭 등록하기'}</H1>
      <ImgContainer>
        <ImgAddBtnBox len={images.length}>
          <ImgAddBtn len={images.length}>
            <input accept="image/*" type="file" id="fileInput" onChange={addImage} style={{ display: 'none' }} />
            <label htmlFor="fileInput">
              <ImgAddIcon src={addIcon} />
            </label>
            <span>사진 등록</span>
            <span>(최대 20장)</span>
          </ImgAddBtn>
        </ImgAddBtnBox>
        <ScrollBox len={images.length}>
          <ImageList>
            {images.map((image, index) => (
              <ImgBox srcUrl={image} key={index}>
                <Delete onClick={() => deleteImage(index)} src={delete_icon} />
              </ImgBox>
            ))}
          </ImageList>
        </ScrollBox>
        <ShadowBox len={images.length} />
      </ImgContainer>
      <Form setImages={setImages} match={match} location={location} setLocation={setLocation} images={images} />
    </Container>
  );
};

export default RegisterSeller;

const Container = styled.div`
  width: fit-content;
  margin: 0 auto;
  height: fit-content;
  position: relative;
  text-align: center;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
  }
`;

const H1 = styled.h1`
  margin: 0 auto;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  color: #414c38;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const ImgContainer = styled.div`
  width: fit-content;
  height: 200px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 30px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0;
    align-items: center;
  }
`;
const ImgAddBtnBox = styled.div<ILen>`
  height: ${props => (props.len >= 3 ? '200px' : '220px')};
  display: flex;
  align-items: center;
`;
const ImgAddBtn = styled.div<ILen>`
  width: 166px;
  height: 166px;
  background-color: #f0fbe4;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: ${props => (props.len >= 1 ? '21px' : '0px')};
  transition: 0.3s ease-in-out;
  cursor: pointer;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #afd082;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-right: 13px;
  }
`;

const ImgAddIcon = styled.img`
  width: 33px;
  height: 33px;
  margin-top: 8px;
  margin-bottom: 7px;
`;

const ScrollBox = styled.div<ILen>`
  width: 480px;
  height: 220px;
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
    width: 16px;
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
    width: 16px;
  }

  &::-moz-scrollbar-thumb {
    background-color: #888;
    border-radius: 7px;
  }

  &::-moz-scrollbar-track {
    background-color: #e0ebd4;
    border-radius: 7px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    align-items: center;
    height: 200px;
    width: 175px;

    &::-webkit-scrollbar {
      display: none !important; /* Chrome, Safari, Opera*/
    }
  }
`;

const ImageList = styled.div`
  display: flex;
  width: fit-content;
`;
const ShadowBox = styled.div<ILen>`
  display: ${props => (props.len >= 3 ? 'block' : 'none')};
  box-shadow: 0px 0px 25px 30px white;
  width: 10px;
  height: 160px;
  z-index: 99;
  margin: auto 0px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    visibility: hidden;
  }
`;

const ImgBox = styled.div<IUrl>`
  width: 166px;
  height: 166px;
  margin-right: 21px;
  position: relative;
  border-radius: 17px;
  background-image: ${props => props.srcUrl && `url(${props.srcUrl})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-right: 10px;
  }
`;

const Delete = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
`;
