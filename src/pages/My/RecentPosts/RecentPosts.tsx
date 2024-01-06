import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMatch, useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { BREAK_POINT } from '../../../constants/style';
import Post from '../Post';
import NoPost from '../NoPost';
import customAxios from '../../../utils/token';
import { useRecoilState } from 'recoil';
import { recentListsAtom, recentPageAtom } from '../../../recoil/atom';
import { Helmet } from 'react-helmet-async';
import SkeletonUi from 'components/SkeletonUi';
import 'react-loading-skeleton/dist/skeleton.css';

export interface IGardens {
  gardenId: number;
  size: number;
  gardenName: string;
  price: number;
  images: string[];
  gardenStatus: 'INACTIVE' | 'ACTIVE';
  gardenType: 'PUBLIC' | 'PRIVATE';
}
const RecentPosts = () => {
  const [recentLists, setRecentLists] = useRecoilState(recentListsAtom);
  const [page, setPage] = useRecoilState(recentPageAtom);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView();
  const nav = useNavigate();
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await customAxios.get(`/v2/gardens/recent`);

      const newData: IGardens[] = res.data.recentGardenResponses;
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        // 중복된 게시물 필터링
        const filteredData = newData.filter(item => {
          return !recentLists.some(existingItem => existingItem.gardenId === item.gardenId);
        });
        setRecentLists(prev => [...prev, ...filteredData]);
        setPage(prevPage => prevPage + 1);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (inView && hasMore) {
      fetchData(); // 인터섹션 옵서버가 화면에 들어올 때 데이터 불러오기
    }
  }, [inView, hasMore]);
  useEffect(() => {
    if (recentLists.length === 0) {
      fetchData();
    }
  }, []);

  const renderPosts = recentLists.map((i: IGardens) => (
    <PostContainer key={i.gardenId}>{isLoading ? <SkeletonUi /> : <Post data={i} key={i.gardenId} />}</PostContainer>
  ));

  return (
    <Container>
      <Helmet>
        <title>최근 본 텃밭 매물 </title>
      </Helmet>
      {recentLists.length === 0 ? (
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
