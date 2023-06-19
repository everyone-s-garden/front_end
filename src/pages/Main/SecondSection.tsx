import React from 'react';
import styled from 'styled-components';

import { BREAK_POINT, COLOR, FONT_WEIGHT } from 'constants/style';
import illurstation from 'assets/main/illust_2.svg';

function SecondSection() {
  return (
    <Container>
      <Image src={illurstation} alt="배너 이미지" />
      <Content>
        <Heading>남은 텃밭 기간 확인</Heading>
        <SubHeading>
          텃밭이용의 남은 기간을 확인하고
          <br />
          건강한 작물재배 계획을 세워보세요
        </SubHeading>
      </Content>
    </Container>
  );
}

export default SecondSection;

const Container = styled.section`
  position: relative;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 85px);
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  color: white;
  background-color: #fdedc0;
  overflow: hidden;

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    height: calc(var(--vh, 1vh) * 100 - 106px);
    flex-direction: row;
    align-items: flex-end;
  }
`;

const Image = styled.img`
  margin-left: 0;
  height: 60%;

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    margin-left: 10px;
    width: 60%;
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
  text-align: center;

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    font-size: 38px;
    text-align: start;
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
