import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import addIcon from 'assets/my/register/add-icon.svg';
import Form from './Form';
import { BREAK_POINT, COLOR } from 'constants/style';
import { IImage, IFormData, IMyGarden } from './type';
import { getImages } from 'utils/getImages';
import { useMatch } from 'react-router-dom';
import customAxios from 'utils/token';
import { AxiosResponse } from 'axios';
import { ReactComponent as MenuIcon } from 'assets/three-dot-icon.svg';
import { formDataHandler } from '../RegisterSeller/query';
import imageCompression from 'browser-image-compression';

const RegisterUser = () => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [image, setImage] = useState<IImage | null>(null);
  const editMatch = useMatch('/my/garden/edit');
  const [myGarden, setMyGarden] = useState<IMyGarden | undefined>(undefined);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const onImgRegisterClicked = (e: React.MouseEvent<HTMLDivElement>) => {
    labelRef.current?.click();
  };
  const handleImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
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
          setImage(res.data.imageUrl);
        };
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

  const removeImage = () => {
    setImage(null);
    setMenuOpen(false);
  };
  return (
    <Container>
      <Title>{editMatch ? '나의 텃밭 수정하기' : '나의 텃밭 등록하기'}</Title>

      <ImgRegister onClick={onImgRegisterClicked}>
        {editMatch && (
          <>
            <EditBtn onClick={() => setMenuOpen(prev => !prev)}>
              <MenuIcon width="3" height="18" fill="#FFFFFF" />
            </EditBtn>
            <MenuDropdown isOpen={menuOpen}>
              <DropDownBtn onClick={removeImage}>사진 삭제</DropDownBtn>
            </MenuDropdown>
          </>
        )}
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
    width: 96vw;
    height: calc(var(--vh, 1vh) * 100 - 100px);
    padding: 0;
    margin: 0 auto;
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
  position: relative;

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
  border-radius: 10px;
`;

const AddIcon = styled.img`
  margin-bottom: 10px;
  cursor: pointer;
`;

const EditBtn = styled.button`
  position: absolute;
  z-index: 99;
  height: 20%;
  top: 23px;
  right: 26px;
  display: flex;
  justify-content: end;
  img {
    z-index: 9999;
    height: 30px;
    width: 30px;
  }
`;
const MenuDropdown = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: absolute;
  top: 23%;
  right: 5%;
  width: 135px;
  border: 1px solid #d9d9d9;
  background-color: ${COLOR.BACKGROUND};
  transition: all 0.1s ease-in;
  overflow: hidden;
  border-radius: 9px;
`;

const DropDownBtn = styled.button`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a9b6a9;
  font-size: 16px;
  font-weight: 400;
  transition: 0.3s ease-in-out;
  :hover {
    background-color: grey;
    color: white;
  }
`;
