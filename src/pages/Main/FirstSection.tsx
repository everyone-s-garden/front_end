import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { searchTypeAtom } from 'recoil/atom';
import { BREAK_POINT, COLOR, FONT_WEIGHT } from 'constants/style';
import illurstation from 'assets/main/illust_1.svg';

function FirstSection() {
  const navigate = useNavigate();
  const setSearchType = useSetRecoilState(searchTypeAtom);

  return (
    <Container>
      <Image src={illurstation} alt="배너 이미지" />
      <Content>
        <Heading>내 주변 텃밭분양을 한 눈에</Heading>
        <SubHeading>
          가장 가까운 소규모 텃밭을
          <br />
          손쉽게 확인해보세요
        </SubHeading>
        <Buttons>
          <Button
            style={{ marginRight: '20px' }}
            onClick={() => {
              setSearchType(1);
              navigate('/map');
            }}
          >
            공공
            <br /> 분양
          </Button>
          <Button
            onClick={() => {
              setSearchType(2);
              navigate('/map');
            }}
          >
            개인
            <br /> 분양
          </Button>
        </Buttons>
      </Content>

      <Ground />
    </Container>
  );
}

export default FirstSection;

const Container = styled.section`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 85px);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  color: white;
  background-color: #f0fbe4;
  overflow: hidden;
  @media (min-width: ${BREAK_POINT.LABTOP}) {
    height: calc(var(--vh, 1vh) * 100 - 106px);
    flex-direction: row;
    align-items: flex-end;
  }
`;

const Image = styled.img`
  z-index: 1;
  margin-left: 0;
  height: 60%;

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    margin-left: 100px;
    width: 50%;
    height: auto;
  }
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    margin-left: 30px;
  }
`;

const Heading = styled.h2`
  font-size: 26px;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    font-size: 38px;
  }
`;

const SubHeading = styled.h4`
  margin-top: 10px;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
  text-align: center;
  line-height: 28px;

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    font-size: 20px;
    text-align: start;
  }
`;

const Buttons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  width: 70px;
  height: 70px;
  font-size: 12px;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  line-height: 16px;
  border-radius: 50%;
  color: ${COLOR.BACKGROUND};
  background-color: #414c38;

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    width: 100px;
    height: 100px;
    font-size: 20px;
    line-height: 28px;
  }

  &:hover {
    transform: scale(1.05);
    transition: all 0.2s ease-in;
  }
`;

const Ground = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 62px;
  background-color: #dceac8;
`;
