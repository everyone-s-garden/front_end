import styled from 'styled-components';
import React from 'react';
import location from 'assets/mdi_location.svg';
interface TradingLocationBoxProps {
  value: string;
}

const TradingLocationBox = ({ value }: TradingLocationBoxProps) => {
  return (
    <Container>
      <Img src={location}></Img>
      <span style={{ fontSize: '14px', backgroundColor: '#f1f7e8', lineHeight: '24px', marginRight: '8px' }}>
        {value}
      </span>
    </Container>
  );
};

export default TradingLocationBox;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
`;

const Img = styled.img`
  width: 24px;
  height: 24px;
  background-color: #f1f7e8;
`;
