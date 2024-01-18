// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// import { BREAK_POINT } from 'constants/style';
// import Post from '../Post';
// import NoPost from '../NoPost';
// import customAxios from 'utils/token';
// import { useRecoilState } from 'recoil';
// import { myListsAtom, myPageAtom } from 'recoil/atom';
// import { useInView } from 'react-intersection-observer';
// import { Helmet } from 'react-helmet-async';
// import SkeletonUi from 'components/SkeletonUi';
// import { IGardens } from '../RecentPosts/RecentPosts';

// const MyPosts = () => {
//   const [myPosts, setMyPosts] = useRecoilState<IGardens[]>(myListsAtom);
//   const [page, setPage] = useRecoilState(myPageAtom);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoading, setIsLoading] = useState(true);
//   const [ref, inView] = useInView();
//   const nav = useNavigate();
//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const res = await customAxios.get(`v2/gardens/mine`);
//       const newData: IGardens[] = res.data.gardenMineResponses;

//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         const filteredData = newData.filter(item => {
//           return !myPosts.some(existingItem => existingItem.gardenId === item.gardenId);
//         });

//         setMyPosts(prev => [...prev, ...filteredData]);
//         setPage(prevPage => prevPage + 1);
//       }
//       setIsLoading(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     if (inView && hasMore) {
//       fetchData(); // 인터섹션 옵서버가 화면에 들어올 때 데이터 불러오기
//     }
//   }, [inView, hasMore]);
//   useEffect(() => {
//     if (myPosts.length === 0) {
//       fetchData();
//     }
//   }, []);
//   const renderPosts = myPosts.map(i => (
//     <PostContainer key={Math.random()}>{isLoading ? <SkeletonUi /> : <Post data={i} />}</PostContainer>
//   ));

//   return (
//     <Container>
//       <Helmet>내가 올린 텃밭 매물</Helmet>
//       {myPosts.length === 0 ? (
//         <NoPost title="올린 글이 없어요!" subTitle="판매하고 싶은 밭이 있나요?" url="/map" />
//       ) : (
//         <MyPostsSection>
//           <SectionTitle>내 분양글</SectionTitle>
//           <PostList>
//             {renderPosts}
//             <div ref={ref} />
//           </PostList>
//           <Span>
//             판매하고 싶은 밭이 있나요?
//             <span onClick={() => nav('/my/garden-register-seller')}> 분양 글 등록하기</span>
//           </Span>
//         </MyPostsSection>
//       )}
//     </Container>
//   );
// };

// export default MyPosts;

// const Container = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// `;

// const MyPostsSection = styled.div`
//   padding-bottom: 40px;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SectionTitle = styled.h1`
//   margin-bottom: 10px;
//   color: #414c38;
//   font-size: 18px;
//   font-weight: 500;

//   @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
//     display: none;
//   }
// `;

// const PostList = styled.li`
//   width: 100%;
// `;

// const PostContainer = styled.div`
//   position: relative;
//   padding: 26px 0;
//   width: 100%;
//   height: 187px;
//   border-bottom: 1px solid #e1e1e1;
// `;

// const Span = styled.span`
//   margin-top: 16px;
//   align-self: flex-start;
//   color: #afafaf;
//   font-weight: 400;
//   font-size: 13px;

//   & > span {
//     color: #afafaf;
//     text-decoration: underline;
//     cursor: pointer;
//   }
// `;

import React from 'react';

const MyPosts = () => {
  return <div>MyPosts</div>;
};

export default MyPosts;
