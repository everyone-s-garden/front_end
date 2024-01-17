import React from 'react';
import styled from 'styled-components';

const GardenItem = () => {
  return (
    <Container>
      <div>
        <Img src="https://www.durenature.co.kr/data/editor/2104/thumb-85ad254c2972c9943bd748aaa69c0420_1617861428_3653_1024x683.jpg" />
      </div>
      <Info>
        <Name>클라인가르텐</Name>
        <Address>경기도 용인</Address>
      </Info>
      <Price>130,000 원</Price>
      <Term>무제한</Term>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
`;

const Img = styled.img`
  width: 276px;
  height: 168px;
  object-fit: cover;
  border-radius: 10px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Name = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Address = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #494949;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
`;

const Term = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #494949;
`;

export default GardenItem;
