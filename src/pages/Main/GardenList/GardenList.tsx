import React from 'react';
import GardenItem from './GardenItem';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { useGetRecentGardenPosts } from 'api/GardenAPI';
import { getItem } from 'utils/session';

const GardenList = () => {
  const memberId = getItem('member_id');
  const { data: recentGardenPosts } = useGetRecentGardenPosts(memberId ?? 0);

  return (
    <Container>
      <Title>방금 등록된 따끈따끈한 텃밭!</Title>
      <GardenItemWrapper>
        {recentGardenPosts &&
          recentGardenPosts.map(gardenPost => <GardenItem gardenPost={gardenPost} key={gardenPost.gardenId} />)}
      </GardenItemWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 auto;
  max-width: 1234px;
  width: 100%;
  padding: 0 20px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 30px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  word-break: keep-all;
  line-height: 30px;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 24px;
    line-height: normal;
  }
`;

const GardenItemWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  overflow-x: auto;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    gap: 30px;
  }
`;

export default GardenList;
