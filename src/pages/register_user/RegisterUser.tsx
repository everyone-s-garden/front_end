import React, { useState } from 'react';
import styled from 'styled-components';
import add from 'assets/add_img.png';
import Form from './Form';
import { BREAK_POINT } from 'constants/style';
import customAxios from 'utils/token';

interface IImage {
  id: string;
  imageUrl: string;
}
const RegisterUser = () => {
  const [img, setImg] = useState<IImage>();
  const handleImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files) {
      const uploadImg = event.currentTarget.files[0];
      const formData = new FormData();
      formData.append('file', uploadImg);
      try {
        const res = await customAxios.post(`/v1/garden/images`, formData);
        console.log(res.data);

        setImg(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  console.log(img);
  return (
    <Container>
      <H1>나의 텃밭 등록하기</H1>
      <ImgRegister>
        <input accept="image/*" type="file" id="fileInput" onChange={handleImg} style={{ display: 'none' }} />
        <label htmlFor="fileInput">
          <AddImg src={add} />
        </label>
        <span>사진등록</span>
      </ImgRegister>
      <Tip>텃밭을 검색해서 등록하면 기한, 위치가 자동으로 불러와져요</Tip>
      <Form img={img} setImg={setImg} />
    </Container>
  );
};

export default RegisterUser;

const Container = styled.div`
  margin: 0 auto;
  margin-top: 54px;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    align-items: end;
    margin-top: 75px;
  }
`;
const H1 = styled.h1`
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: #414c38;
  margin-bottom: 20px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const ImgRegister = styled.div`
  width: 642px;
  height: 166px;
  background: #f0fbe4;
  border-radius: 17px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 43px;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #afd082;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 346px;
    height: 182px;
  }
`;
const AddImg = styled.img`
  width: 33px;
  height: 33px;
  margin-bottom: 5px;
  cursor: pointer;
`;
const Tip = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #414c38;
  margin-bottom: 6px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    font-size: 10px;
  }
`;
