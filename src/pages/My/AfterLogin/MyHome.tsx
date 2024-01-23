import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BREAK_POINT, COLOR } from 'constants/style';
import testImg from 'assets/garden-image1.jpg';
import btnIcon1 from 'assets/my/my-garden-btn-icon1.svg';
import btnIcon2 from 'assets/my/my-garden-btn-icon2.svg';
import btnIcon3 from 'assets/my/my-garden-btn-icon3.svg';
import btnIcon4 from 'assets/my/my-garden-btn-icon4.svg';
import { AxiosResponse } from 'axios';
import customAxios from 'utils/token';
import { getItem } from 'utils/session';
import { useRecoilState } from 'recoil';
import { hasMyGardenAtom, isMyPostOpenAtom } from 'recoil/atom';

const MyHome = () => {
  const nav = useNavigate();
  const [hasMyGarden, setHasMyGarden] = useRecoilState(hasMyGardenAtom);
  const [isGardenMenuOpen, setIsGardenMenuOpen] = useRecoilState(isMyPostOpenAtom);
  const userName = getItem('name')?.replaceAll('"', '');
  const init = async () => {
    try {
      const res: AxiosResponse = await customAxios.get('/v2/gardens/my-managed');
      setHasMyGarden(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    init();
  }, []);

  const calculateRemainingDays = (endDate: string) => {
    const today = new Date();
    const end = new Date(endDate);
    const timeDiff = end.getTime() - today.getTime();
    const remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return remainingDays;
  };
  return (
    <Container>
      {hasMyGarden !== null && hasMyGarden !== undefined && (
        <MyGardenSection>
          <SectionTitle>나의 텃밭</SectionTitle>
          <GardenImgContainer>
            <GardenImage src={hasMyGarden?.image || testImg} alt="텃밭 이미지" />
            <GardenTitle>{userName}님의 텃밭</GardenTitle>

            <Menu>
              <Edit onClick={() => nav('/my/garden/edit')}>수정</Edit>
              <Remove onClick={() => setIsGardenMenuOpen(true)}>삭제</Remove>
            </Menu>
          </GardenImgContainer>
        </MyGardenSection>
      )}

      <ContentWrapper hasMyGarden={hasMyGarden !== null}>
        {hasMyGarden === null || hasMyGarden === undefined ? (
          <>
            <Content onClick={() => nav('/my/garden-register-user')}>
              <ImgBox src={btnIcon1} alt="버튼 아이콘" />
              <span>나의 텃밭 등록하기</span>
            </Content>
            <Content onClick={() => nav('/my/garden-register-seller')}>
              <ImgBox src={btnIcon2} alt="버튼 아이콘" />
              <span>판매하는 밭 등록하기</span>
            </Content>
          </>
        ) : (
          <>
            <AfterContent>
              <ImgBox src={btnIcon3} alt="버튼 아이콘" />
              <span>{hasMyGarden?.name}</span>
            </AfterContent>
            <AfterContent>
              <ImgBox src={btnIcon4} alt="버튼 아이콘" />
              {calculateRemainingDays(hasMyGarden?.useEndDate!) >= 0 && (
                <span>{calculateRemainingDays(hasMyGarden?.useEndDate!)}일 남았습니다.</span>
              )}
              {calculateRemainingDays(hasMyGarden?.useEndDate!) < 0 && <span>만료</span>}
            </AfterContent>
          </>
        )}
      </ContentWrapper>
      {hasMyGarden !== null && hasMyGarden !== undefined && (
        <AddPostWrapper>
          <Span>판매하고 싶은 밭이 있나요? </Span>
          <AddPost onClick={() => nav('/my/garden-register-seller')}> 분양 글 등록하기</AddPost>
        </AddPostWrapper>
      )}
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
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 1);
`;

const ContentWrapper = styled.div<{ hasMyGarden: boolean }>`
  margin-top: ${props => (props.hasMyGarden ? '20px' : '40px')};
  width: 100%;
  height: 120px;
  display: flex;
  column-gap: 50px;
  margin-bottom: 15px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 20px;
    column-gap: 20px;
  }
`;

const Span = styled.span`
  color: #afafaf;
  margin-right: 5px;
`;
const AddPost = styled.span`
  color: #afafaf;
  text-decoration: underline;
  cursor: pointer;
`;

const Content = styled.button`
  flex-grow: 1;
  padding: 15px;
  height: 100%;
  width: 310px;
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

    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      font-size: 14px;
    }
  }
`;

const AfterContent = styled.div`
  flex-grow: 1;
  padding: 15px;
  height: 100%;
  width: 310px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border: 1px solid #e1e1e1;
  border-radius: 9px;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.03));
  transition: all 0.1s ease-in;

  span {
    font-size: 16px;
    font-weight: 500;

    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      font-size: 14px;
    }
  }
`;

const ImgBox = styled.img`
  width: 44px;
  height: 42px;
  border-radius: 4px;
`;

const AddPostWrapper = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`;

const Menu = styled.div`
  display: flex;
  width: 84px;
  height: 26px;
  position: absolute;
  z-index: 99;
  top: 14px;
  right: 14px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 6px;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #818181;
    font-size: 13px;
    font-family: Acme;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: 1px solid #d5d5d5;
    background: rgba(255, 255, 255, 0.9);
    width: 50%;
    transition: 0.3s ease-in-out;
    :hover {
      border: 1px solid #d5d5d5;
      background: #d5d5d5;
      color: #818181;
    }
  }
`;
const Edit = styled.div`
  border-radius: 6px 0px 0px 6px;
  border-right: none;
`;

const Remove = styled.div`
  border-radius: 0px 6px 6px 0px;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0.550000011920929;
  background: #000;
  position: absolute;
  top: 0;
  left: 0;
`;
