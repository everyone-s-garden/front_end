import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconHeart } from '../../../assets/main/heart-icon.svg';

const GardenItem = () => {
  return (
    <Container>
      <ImageWrapper>
        <Img src="https://www.durenature.co.kr/data/editor/2104/thumb-85ad254c2972c9943bd748aaa69c0420_1617861428_3653_1024x683.jpg" />
        <StyledIconHeart />
      </ImageWrapper>
      <InfoWrapper>
        <Info>
          <Name>클라인가르텐</Name>
          <Address>경기도 용인</Address>
        </Info>
        <Price>130,000 원</Price>
        <Term>무제한</Term>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
`;

const StyledIconHeart = styled(IconHeart)`
  position: absolute;
  left: 12px;
  top: 12px;
  width: 24px;
  height: 24px;
  stroke: white;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 190px;
  height: 129px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 276px;
    height: 168px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 8px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 8px;
  }
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 20px;
  }
`;

const Address = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #494949;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 16px;
  }
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 700;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 18px;
  }
`;

const Term = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #494949;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 18px;
  }
`;

export default GardenItem;
