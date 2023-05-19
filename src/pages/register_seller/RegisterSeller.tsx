import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from 'assets/add_img.png';
import Form from './Form';
import delete_icon from 'assets/delete_icon.png';
import { BREAK_POINT } from 'constants/style';

const RegisterSeller = () => {
  const [images, setImages] = useState<number[]>([]);
  const [count, setCount] = useState<number>(0);

  const addImage = () => {
    if (count === 19) {
      alert('최대 20장까지 등록할 수 있습니다.');
    } else {
      setCount(prevCount => prevCount + 1);
      setImages(prevImages => [...prevImages, count]);
    }
  };
  const deleteImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
    setCount(prevCount => prevCount - 1);
  };
  return (
    <Container>
      <H1>판매 텃밭 등록하기</H1>
      <ImgContainer>
        <ImgAddBtnBox count={count}>
          <ImgAddBtn count={count}>
            <ImgAddIcon src={Icon} onClick={addImage} />
            <span>사진 등록</span>
            <span>(최대 20장)</span>
          </ImgAddBtn>
        </ImgAddBtnBox>
        <ScrollBox count={count}>
          <ImageList>
            {images.map((image, index) => (
              <ImgBox key={index}>
                {image}
                <Delete onClick={() => deleteImage(index)} src={delete_icon} />
              </ImgBox>
            ))}
          </ImageList>
        </ScrollBox>
        <ShadowBox count={count} />
      </ImgContainer>

      <Form />
    </Container>
  );
};

export default RegisterSeller;

interface ICount {
  count: number;
}
const Container = styled.div`
  width: fit-content;
  margin: 0 auto;
  height: fit-content;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 80px;
  }
`;

const H1 = styled.h1`
  margin: 0 auto;
  font-family: 'Abril Fatface';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  margin-bottom: 20px;
  margin-top: 80px;
  text-align: center;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const ImgContainer = styled.div`
  width: fit-content;
  height: 200px;
  display: flex;
  margin: 0 auto;
  margin-bottom: 72px;
`;
const ImgAddBtnBox = styled.div<ICount>`
  height: ${props => (props.count >= 3 ? '200px' : '220px')};
  display: flex;
  align-items: center;
`;
const ImgAddBtn = styled.div<ICount>`
  width: 166px;
  height: 166px;
  background-color: #f0fbe4;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: ${props => (props.count >= 1 ? '21px' : '0px')};
  transition: 0.3s ease-in-out;
  cursor: pointer;
  span {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #afd082;
  }
`;

const ImgAddIcon = styled.img`
  width: 33px;
  height: 33px;
  margin-top: 8px;
  margin-bottom: 7px;
`;

const ScrollBox = styled.div<ICount>`
  width: 480px;
  height: 220px;
  display: ${props => (props.count >= 1 ? 'flex' : 'none')};
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
`;

const ImageList = styled.div`
  display: flex;
  width: fit-content;
`;
const ShadowBox = styled.div<ICount>`
  display: ${props => (props.count >= 3 ? 'block' : 'none')};
  box-shadow: -6px 0px 25px 30px white;
  width: 10px;
  height: 180px;
  z-index: 99;
`;

const ImgBox = styled.div`
  width: 166px;
  height: 166px;
  margin-right: 21px;
  background-color: green;
  position: relative;
  border-radius: 17px;
`;

const Delete = styled.img`
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
`;
