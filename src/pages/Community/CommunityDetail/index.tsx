import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Title from './Title';

const CommunityDetail = () => {
  return (
    <>
      <Helmet>
        <title>속닥속닥 상세 페이지</title>
      </Helmet>

      <Container>
        <Title
          type="ETC"
          createdAt="2024-02-13T19:20:30.45+01:00"
          title="텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃밭 자랑텃"
        />
      </Container>
    </>
  );
};

export default CommunityDetail;

const Container = styled.section`
  max-width: 1194px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  margin-bottom: 20px;
`;
