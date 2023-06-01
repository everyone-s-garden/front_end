import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BREAK_POINT } from 'constants/style';
import Post from '../Post';
import NoPost from '../NoPost';
import customAxios from 'utils/token';
import { AxiosResponse } from 'axios';
import { IData } from 'pages/Login/Google/token/type';

interface Idata {
  content: any;
  garden: IGarden;
  gardenId: number;
  gardenPostId: number;
  images: [];
  title: string;
}

interface IGarden {
  address: string;
  id: number;
  latitude: number;
  link: any;
  longitude: number;
  name: string;
  price: string;
  type: string;
}
const MyPosts = () => {
  const nav = useNavigate();
  const [myPostsList, setMyPostsList] = useState<Idata[]>([]);
  // const [MyPostList] = useState([]);

  const renderPosts = myPostsList.map(i => (
    <PostContainer key={Math.random()}>
      <Post data={i} />
    </PostContainer>
  ));

  const init = async () => {
    const res: AxiosResponse = await customAxios.get('/v1/garden/mine');
    console.log(res);
    setMyPostsList(res.data);
  };

  useEffect(() => {
    init();
  }, []);
  console.log(myPostsList);
  return (
    <Container>
      {myPostsList.length === 0 ? (
        <NoPost title="올린 글이 없어요!" subTitle="판매하고 싶은 밭이 있나요?" url="/my/garden-register-seller" />
      ) : (
        <MyPostsSection>
          <SectionTitle>내 분양글</SectionTitle>
          <PostList>{renderPosts}</PostList>
          <Span>
            판매하고 싶은 밭이 있나요?
            <span onClick={() => nav('/my/garden-register-seller')}> 분양 글 등록하기</span>
          </Span>
        </MyPostsSection>
      )}
    </Container>
  );
};

export default MyPosts;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const MyPostsSection = styled.div`
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
