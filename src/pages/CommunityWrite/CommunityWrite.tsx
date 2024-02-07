import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const CommunityWrite = () => {
  return (
    <Container>
      <div>ㅎㅇ</div>
      <Helmet>
        <title>속닥속닥 글쓰기 페이지</title>
      </Helmet>
    </Container>
  );
};

export default CommunityWrite;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`;
