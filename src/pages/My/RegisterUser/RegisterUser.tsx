import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import addIcon from 'assets/my/register/add-icon.svg';
import Form from './Form';
import { BREAK_POINT } from 'constants/style';
import { IImage, IFormData, IMyGarden } from './type';
import { getImages } from 'utils/getImages';
import { useMatch } from 'react-router-dom';
import customAxios from 'utils/token';
import { AxiosResponse } from 'axios';

const RegisterUser = () => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [image, setImage] = useState<IImage | null>(null);
  const editMatch = useMatch('/my/edit');
  const [myGarden, setMyGarden] = useState<IMyGarden | undefined>(undefined);
  const onImgRegisterClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    labelRef.current?.click();
  };
  const handleImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const uploadImg = event.currentTarget.files[0] as File;
      const formData: IFormData = new FormData();
      formData.append('file', uploadImg);

      try {
        const res: AxiosResponse = await getImages(formData);
        setImage(res.data.imageUrl);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const getMyGarden = async () => {
    const res = await customAxios('/v1/garden/using');
    setMyGarden(res.data[0]);
    setImage(res.data[0].image);
  };
  useEffect(() => {
    if (editMatch) {
      getMyGarden();
    }
  }, []);
  return (
    <Container>
      <Title>{editMatch ? '나의 텃밭 수정하기' : '나의 텃밭 등록하기'}</Title>

      <ImgRegister onClick={onImgRegisterClicked}>
        {image ? (
          <AddImage src={`${image}`} />
        ) : (
          <>
            <input accept="image/*" type="file" id="fileInput" onChange={handleImg} style={{ display: 'none' }} />
            <label onClick={e => e.stopPropagation()} ref={labelRef} htmlFor="fileInput">
              <AddIcon src={addIcon} />
            </label>
            <span>사진등록</span>
          </>
        )}
      </ImgRegister>

      <Form editMatch={editMatch} myGarden={myGarden} image={image} />
    </Container>
  );
};

export default RegisterUser;

const Container = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding-bottom: 40px;
    width: 100vw;
    height: calc(100vh - 100px);
  }
`;

const Title = styled.h1`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 18px;
  color: #414c38;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const ImgRegister = styled.div`
  width: 100%;
  height: 166px;
  background: #f0fbe4;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 43px;
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    background: #e7fad1;
  }

  span {
    font-weight: 500;
    font-size: 16px;
    color: #afd082;
  }

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    height: 182px;
  }
`;

const AddImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const AddIcon = styled.img`
  margin-bottom: 10px;
  cursor: pointer;
`;
