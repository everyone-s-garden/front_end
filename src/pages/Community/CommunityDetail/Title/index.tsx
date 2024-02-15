import React from 'react';
import styled from 'styled-components';
import getRelativeTime from 'utils/getRelativeTime';
import { POST_TYPE } from '../constants';

interface TitleProps {
  type: 'INFORMATION_SHARE' | 'GARDEN_SHOWCASE' | 'QUESTION' | 'ETC';
  title: string;
  createdAt: string;
}

const Title = ({ type, title, createdAt }: TitleProps) => {
  return (
    <Container>
      <Flex>
        <Type>{POST_TYPE[type]}</Type>
        <TitleText>{title}</TitleText>
      </Flex>

      <Date>{getRelativeTime(createdAt)}</Date>
    </Container>
  );
};

export default Title;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 1193px;
  width: 100%;
  margin-inline: auto;
  padding-inline: 20px;
  margin-top: 16px;
  margin-bottom: 18px;

  @media (${({ theme }) => theme.devices.mobile}) {
    margin-top: 44px;
    margin-bottom: 26px;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (${({ theme }) => theme.devices.mobile}) {
    flex-direction: row;
    align-items: baseline;
    gap: 12px;
  }
`;

const Type = styled.p`
  display: inline-block;
  width: fit-content;
  flex-shrink: 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.orange[200]};
  padding: 4px 6px;
  font-size: 16px;

  @media (${({ theme }) => theme.devices.mobile}) {
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 18px;
  }
`;

const TitleText = styled.h1`
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  @media (${({ theme }) => theme.devices.mobile}) {
    font-size: 24px;
  }
`;

const Date = styled.span`
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.colors.gray[700]};

  @media (${({ theme }) => theme.devices.mobile}) {
    font-size: 16px;
  }
`;
