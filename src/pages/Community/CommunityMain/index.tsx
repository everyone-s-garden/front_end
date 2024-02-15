import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import CommunityHeader from './CommunityHeader';
import styled from 'styled-components';
import OrderDropdown from './OrderDropdown';
import CommunityPostList from './CommunityPostList';
import { useResetRecoilState } from 'recoil';
import { communityParamsAtom } from 'recoil/atom';

const Community = () => {
  const resetParams = useResetRecoilState(communityParamsAtom);

  useEffect(() => {
    resetParams();
  }, [resetParams]);

  return (
    <>
      <Helmet>
        <title>속닥속닥 페이지</title>
      </Helmet>
      <CommunityHeader />

      <Container>
        <OrderDropdown />
        <CommunityPostList />
      </Container>
    </>
  );
};

export default Community;

const Container = styled.section`
  max-width: 1194px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  margin-bottom: 20px;
`;
