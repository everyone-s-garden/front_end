import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BREAK_POINT } from 'constants/style';
import Post from '../Post';
import NoPost from '../NoPost';
import closeIcon from 'assets/my/x-icon.svg';
import customAxios from 'utils/token';
import { AxiosResponse } from 'axios';
import { IGardenDetail } from 'types/GardenDetail';
import { useRecoilState } from 'recoil';
import { likeListsAtom, likePageAtom } from 'recoil/atom';
import { useInView } from 'react-intersection-observer';

const LikePosts = () => {
  const [likeLists, setLikeLists] = useRecoilState(likeListsAtom);
  const [page, setPage] = useRecoilState(likePageAtom);
  const [hasMore, setHasMore] = useState(true);
  const [ref, inView] = useInView();
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const res = await customAxios.get(`/v1/garden/like/all?page=${page}`);
      const newData: IGardenDetail[] = res.data;
      if (newData.length === 0) {
        setHasMore(false);
      } else {
        const filteredData = newData.filter(item => {
          return !likeLists.some(existingItem => existingItem.id === item.id);
        });

        setLikeLists(prev => [...prev, ...filteredData]);
        setPage(prevPage => prevPage + 1);
      }
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
    if (likeLists.length === 0) {
      fetchData();
    }
  }, []);

  const deleteLike = async (i: IGardenDetail) => {
    const res: AxiosResponse = await customAxios.delete(`v1/garden/like/${i.id}`);
    if (res.status === 204) {
      const updatedLikeList = likeLists.filter((item: IGardenDetail) => item.id !== i.id);
      setLikeLists([...updatedLikeList]);
    }
  };

  const renderPosts = likeLists.map((i: IGardenDetail) => (
    <PostContainer key={i.id}>
      <Post data={i} />
      <CloseIcon src={closeIcon} alt="close" onClick={() => deleteLike(i)} />
    </PostContainer>
  ));

  return (
    <Container>
      {likeLists.length === 0 ? (
        <NoPost title="찜한 텃밭이 없어요!" subTitle="분양 텃밭들을 보고 싶나요?" url="/map" />
      ) : (
        <LikePostsSection>
          <SectionTitle>찜한 텃밭</SectionTitle>
          <PostList>
            {renderPosts}
            <div ref={ref} />
          </PostList>
          <Span>
            분양 텃밭들을 더 보고싶나요?
            <span onClick={() => nav('/map')}> 분양 텃밭 보러가기</span>
          </Span>
        </LikePostsSection>
      )}
    </Container>
  );
};

export default LikePosts;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LikePostsSection = styled.div`
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

const CloseIcon = styled.img`
  position: absolute;
  top: 30px;
  right: 0;
  width: 18px;
  cursor: pointer;
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
