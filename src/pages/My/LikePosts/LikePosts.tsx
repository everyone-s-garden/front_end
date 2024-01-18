// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { useNavigate } from 'react-router-dom';

// import { BREAK_POINT } from 'constants/style';
// import Post from '../Post';
// import NoPost from '../NoPost';
// import closeIcon from 'assets/my/x-icon.svg';
// import customAxios from 'utils/token';
// import { AxiosResponse } from 'axios';
// import { IGardenDetail } from 'types/GardenDetail';
// import { useRecoilState } from 'recoil';
// import { likeListsAtom, likePageAtom } from 'recoil/atom';
// import { useInView } from 'react-intersection-observer';
// import { Helmet } from 'react-helmet-async';
// import SkeletonUi from 'components/SkeletonUi';
// import { IGardens } from '../RecentPosts/RecentPosts';
// const LikePosts = () => {
//   const [likeLists, setLikeLists] = useRecoilState(likeListsAtom);
//   const [page, setPage] = useRecoilState(likePageAtom);
//   const [hasMore, setHasMore] = useState(true);
//   const [ref, inView] = useInView();
//   const nav = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const fetchData = async () => {
//     try {
//       setIsLoading(true);
//       const res = await customAxios.get(`/v2/gardens/likes`);
//       const newData: IGardens[] = res.data.gardenLikeByMemberResponses;
//       if (newData.length === 0) {
//         setHasMore(false);
//       } else {
//         const filteredData = newData.filter(item => {
//           return !likeLists.some(existingItem => existingItem.gardenId === item.gardenId);
//         });
//         setLikeLists(prev => [...prev, ...filteredData]);
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
//     if (likeLists.length === 0) {
//       fetchData();
//     }
//   }, []);
//   const deleteLike = async (i: IGardens) => {
//     const res = await customAxios.delete(`v2/gardens/likes`, { data: { gardenId: i.gardenId } });
//     if (res.status === 200) {
//       const updatedLikeList = likeLists.filter((item: any) => item.gardenId !== i.gardenId);
//       setLikeLists([...updatedLikeList]);
//     }
//   };

//   const renderPosts = likeLists.map(list => (
//     <PostContainer key={list.gardenId}>
//       {isLoading ? (
//         <SkeletonUi />
//       ) : (
//         <>
//           <Post data={list} />
//           <CloseIcon src={closeIcon} alt="close" onClick={() => deleteLike(list)} />
//         </>
//       )}
//     </PostContainer>
//   ));

//   return (
//     <Container>
//       <title>내가 찜한 텃밭</title>
//       {likeLists.length === 0 ? (
//         <NoPost title="찜한 텃밭이 없어요!" subTitle="분양 텃밭들을 보고 싶나요?" url="/map" />
//       ) : (
//         <LikePostsSection>
//           <SectionTitle>찜한 텃밭</SectionTitle>
//           <PostList>
//             {renderPosts}
//             <div ref={ref} />
//           </PostList>
//           <Span>
//             분양 텃밭들을 더 보고싶나요?
//             <span onClick={() => nav('/map')}> 분양 텃밭 보러가기</span>
//           </Span>
//         </LikePostsSection>
//       )}
//     </Container>
//   );
// };

// export default LikePosts;

// const Container = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   align-items: center;
// `;

// const LikePostsSection = styled.div`
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

// const CloseIcon = styled.img`
//   position: absolute;
//   top: 30px;
//   right: 0;
//   width: 18px;
//   cursor: pointer;
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

const LikePosts = () => {
  return <div>LikePosts</div>;
};

export default LikePosts;
