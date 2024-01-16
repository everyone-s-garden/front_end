import React from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { Link } from 'react-router-dom';

// TODO: remove this
const TestData = [
  {
    title: '알람',
    description: '알람 내용',
    time: '2021-08-01(월)',
  },
  {
    title: '알람',
    description: '알람 내용',
    time: '2021-08-01(월)',
  },
  {
    title: '알람',
    description: '알람 내용',
    time: '2021-08-01(월)',
  },
  {
    title: '알람',
    description: '알람 내용',
    time: '2021-08-01(월)',
  },
];

const Notification = () => {
  return (
    <SelectContainer>
      {TestData.map(({ title, description, time }, idx) => (
        <StyledLink to={'/'} key={idx}>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {time && <Time>{time}</Time>}
        </StyledLink>
      ))}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: absolute;
  top: 50px;
  transform: translateX(-90%);
  z-index: 100000;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  display: none;
  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: block;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const Description = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #222a1a;
`;

const Time = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #9b9b9b;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  padding: 18px 0 21px 20px;
  text-decoration: none;
  border-bottom: 1px solid #d9d9d9;
  color: #000;
  &:hover {
    background-color: #f5f5f5;
  }
  &:first-of-type {
    border-radius: 10px 10px 0 0;
  }
`;

export default Notification;
