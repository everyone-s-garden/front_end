import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import PostTypeSelector from './PostTypeSelector';

const CommunityHeader = () => {
  return (
    <Container>
      <Info>
        <h1>속닥속닥</h1>
        <p>정보 공유 및 텃밭 자랑, 궁금한 것을 질문해요 !</p>
      </Info>
      <SearchBar />
      <PostTypeSelector />
    </Container>
  );
};

export default CommunityHeader;

const Container = styled.section`
  margin: 0 auto;
  padding: 0 20px;
  height: 127px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.orange[100]};

  @media (${({ theme }) => theme.devices.mobile}) {
    height: 218px;
  }
`;

const Info = styled.div`
  flex-direction: column;
  align-items: center;
  gap: 12px;
  display: none;
  margin-bottom: 16px;

  & h1 {
    font-size: 24px;
    font-weight: 700;
  }

  & p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.gray[700]};
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    display: flex;
  }
`;
