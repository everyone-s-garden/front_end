import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMatch, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { BREAK_POINT } from 'constants/style';
import Post from '../Post';
import NoPost from '../NoPost';
import customAxios from 'utils/token';
import { AxiosResponse } from 'axios';
import { IGardenDetail } from 'types/GardenDetail';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { recentListsAtom, recentPageAtom } from 'recoil/atom';

const RecentPosts = () => {
  const nav = useNavigate();
  const [page, setPage] = useRecoilState(recentPageAtom);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [ref, inView] = useInView();
  const [recentList, setRecentList] = useRecoilState(recentListsAtom);
  const resetPage = useResetRecoilState(recentPageAtom);
  const resetList = useResetRecoilState(recentListsAtom);
  const fetchData = async () => {
    try {
      const res = await customAxios.get(`/v1/garden/recent?page=${page}`);
      const newData = res.data;

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setRecentList(prevList => [...prevList, ...newData]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inView && hasMore) {
      fetchData();
    }
  }, [inView]);
  console.log(page, recentList);
  const renderPosts = recentList.map(i => (
    <PostContainer key={i.id}>
      <Post data={i} key={i.id} />
    </PostContainer>
  ));

  return (
    <Container>
      {recentList.length === 0 ? (
        <NoPost title="최근 본 텃밭이 없어요!" subTitle="분양 텃밭들을 보고 싶나요?" url="/map" />
      ) : (
        <RecentPostsSection>
          <SectionTitle>최근 본 텃밭</SectionTitle>
          <PostList>
            {renderPosts}
            <div ref={ref} />
          </PostList>
          <Span>
            분양 텃밭들을 더 보고싶나요?
            <span onClick={() => nav('/map')}> 분양 텃밭 보러가기</span>
          </Span>
        </RecentPostsSection>
      )}
    </Container>
  );
};

export default RecentPosts;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const RecentPostsSection = styled.div`
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h1`
  margin-bottom: 10px;
  color: #414c38;
  font-size: 18px;
  font-weight: 500;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const PostList = styled.li`
  width: 100%;
`;

const PostContainer = styled.div`
  position: relative;
  padding: 26px 0;
  width: 100%;
  height: 187px;
  border-bottom: 1px solid #e1e1e1;
`;

const Span = styled.span`
  margin-top: 16px;
  align-self: flex-start;
  color: #afafaf;
  font-weight: 400;
  font-size: 13px;

  & > span {
    color: #afafaf;
    text-decoration: underline;
    cursor: pointer;
  }
`;
