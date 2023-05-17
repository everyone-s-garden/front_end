import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Icon from 'assets/add_img.png';

const RegisterSeller = () => {
  const [images, setImages] = useState<number[]>([]);
  const [count, setCount] = useState(0);

  const addImage = () => {
    if (count === 19) {
      alert('최대 20장까지 등록할 수 있습니다.');
    } else {
      setCount(prevCount => prevCount + 1);
      setImages(prevImages => [...prevImages, count]);
    }
  };
  return (
    <Container>
      <H1>판매 텃밭 등록하기</H1>
      <ImgContainer>
        <ImgAddBtn>
          <ImgAddIcon src={Icon} onClick={addImage} />
          <span>사진 등록</span>
          <span>(최대 20장)</span>
        </ImgAddBtn>

        {count >= 1 && (
          <ScrollBox>
            <ImageList>
              {images.map((image, index) => (
                <ImgBox key={index} />
              ))}
            </ImageList>
          </ScrollBox>
        )}
      </ImgContainer>
    </Container>
  );
};

export default RegisterSeller;

const Container = styled.div`
  width: fit-content;
  margin: 0 auto;
  height: 100vh;
`;

const H1 = styled.h1`
  margin: 0 auto;
  font-family: 'Abril Fatface';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  color: #414c38;
  margin-bottom: 20px;
  margin-top: 80px;
`;

const ImgContainer = styled.div`
  width: fit-content;
  height: 200px;
  display: flex;
`;

const ImgAddBtn = styled.div`
  width: 166px;
  height: 166px;
  background-color: #f0fbe4;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 10px;
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

const ScrollBox = styled.div`
  width: 480px;
  height: 200px;

  overflow-x: auto !important;
  scrollbar-width: thin;
  scrollbar-color: #888 #e0ebd4;
  box-shadow: inset 0px 0px 12px black;
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

const ImgBox = styled.div`
  background-color: red;
  width: 166px;
  height: 166px;
  margin-right: 10px;
`;
