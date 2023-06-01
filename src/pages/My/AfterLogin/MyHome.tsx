import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BREAK_POINT, COLOR } from 'constants/style';
import testImg from 'assets/garden-image1.jpg';
import btnIcon1 from 'assets/my/my-garden-btn-icon1.svg';
import btnIcon2 from 'assets/my/my-garden-btn-icon2.svg';
import menuIcon from 'assets/my/three-dot-icon.svg';
import customAxios from 'utils/token';
import { AxiosResponse } from 'axios';

const MyHome = () => {
  const nav = useNavigate();
  const [hasMyGarden, setHasMyGarden] = useState([1]);
  const [isGardenMenuOpen, setIsGardenMenuOpen] = useState<boolean>(false);
  const init = async () => {
    const res: AxiosResponse = await customAxios.get('/v1/garden/using');
    setHasMyGarden(res.data);
  };

  useEffect(() => {
    init();
  }, []);

  const myGardenDelete = async () => {
    const res: AxiosResponse = await customAxios.delete(`/v1/garden/using/{gardenId}`);
    console.log(res);
    if (res.status === 204) nav('/my');
  };
  return (
    <Container>
      {hasMyGarden.length !== 0 && (
        <MyGardenSection>
          <SectionTitle>나의 텃밭</SectionTitle>
          <GardenImgContainer>
            <GardenImage src={testImg} alt="텃밭 이미지" />
            <GardenTitle>유미애님의 텃밭</GardenTitle>

            <MenuIcon onClick={() => setIsGardenMenuOpen(!isGardenMenuOpen)}>
              <img src={menuIcon} alt="메뉴" />
            </MenuIcon>
            <MenuDropdown isOpen={isGardenMenuOpen}>
              <DropDownBtn>수정하기</DropDownBtn>
              <DropDownBtn onClick={myGardenDelete}>삭제하기</DropDownBtn>
            </MenuDropdown>
          </GardenImgContainer>
        </MyGardenSection>
      )}

      <ContentWrapper hasMyGarden={hasMyGarden.length !== 0}>
        <Content onClick={() => nav('/my/garden-register-user')}>
          <ImgBox src={btnIcon1} alt="버튼 아이콘" />
          <span>나의 텃밭 등록하기</span>
        </Content>
        <Content onClick={() => nav('/my/garden-register-seller')}>
          <ImgBox src={btnIcon2} alt="버튼 아이콘" />
          <span>판매하는 밭 등록하기</span>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

export default MyHome;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const MyGardenSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h1`
  color: #414c38;
  font-size: 18px;
  font-weight: 500;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const GardenImgContainer = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 170px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    opacity: 0.9;
  }

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0;
    height: 150px;
  }
`;

const GardenImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const GardenTitle = styled.h2`
  position: absolute;
  bottom: 20px;
  left: 24px;
  color: ${COLOR.BACKGROUND};
  font-size: 18px;
  font-weight: 500;
`;

const MenuIcon = styled.button`
  position: absolute;
  top: 20px;
  right: 24px;
  width: 28px;
  height: 28px;
  transition: all 0.1s ease-in;

  &:hover {
    transform: scale(1.1);
  }
`;

const MenuDropdown = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: absolute;
  top: 50px;
  right: 24px;
  width: 200px;
  background-color: #f4f4f4;
  border-radius: 14px;
  transition: all 0.1s ease-in;
  overflow: hidden;

  button:nth-child(1) {
    border-bottom: 1px solid #d0d0d0;
  }
`;

const DropDownBtn = styled.button`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  transition: all 0.1s ease-in;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const ContentWrapper = styled.div<{ hasMyGarden: boolean }>`
  margin-top: ${props => (props.hasMyGarden ? '20px' : '40px')};
  width: 100%;
  height: 120px;
  display: flex;
  column-gap: 50px;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 20px;
    column-gap: 20px;
  }
`;

const Content = styled.button`
  flex-grow: 1;
  padding: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid #e1e1e1;
  border-radius: 9px;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.03));
  transition: all 0.1s ease-in;

  &:hover {
    background-color: #f4f4f4;
  }

  span {
    font-size: 16px;
    font-weight: 500;
  }
`;

const ImgBox = styled.img`
  width: 44px;
  height: 42px;
  border-radius: 4px;
`;
