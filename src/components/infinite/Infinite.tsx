import RecentPost from 'pages/Main/RecentPost';
import LikePosts from 'pages/My/LikePosts/LikePosts';
import MyPosts from 'pages/My/MyPosts/MyPosts';
import RecentPosts from 'pages/My/RecentPosts/RecentPosts';
import React, { useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  isOkAtom,
  likeListsAtom,
  likePageAtom,
  myPageAtom,
  myPostListsAtom,
  recentListsAtom,
  recentPageAtom,
} from 'recoil/atom';

const Infinite = () => {
  const resetRecent = useResetRecoilState(recentListsAtom);
  const resetMyPost = useResetRecoilState(myPostListsAtom);
  const resetLike = useResetRecoilState(likeListsAtom);
  const resetRecentPage = useResetRecoilState(recentPageAtom);
  const [isOk, setIsOk] = useRecoilState(isOkAtom);
  const resetMyPage = useResetRecoilState(myPageAtom);
  const resetLikePage = useResetRecoilState(likePageAtom);
  const recentMatch = useMatch('/my/recent');
  const myMatch = useMatch('/my/mypost');
  const likeMatch = useMatch('/my/like');
  const init = () => {
    if (recentMatch) {
      resetMyPost();
      resetLike();
      resetMyPage();
      resetLikePage();
    }
    if (myMatch) {
      resetRecent();
      resetLike();
      resetRecentPage();
      resetLikePage();
    }
    if (likeMatch) {
      resetMyPost();
      resetRecent();
      resetMyPage();
      resetRecentPage();
    }
  };
  useEffect(() => {
    init();
  }, [recentMatch, myMatch, likeMatch]);

  useEffect(() => {
    console.log('화면에나타남');
    return () => {
      console.log('화면에서 사라짐');
      //   resetLike();
      //   resetLikePage();
      //   resetMyPage();
      //   resetMyPost();
      //   resetRecent();
      //   resetRecentPage();
    };
  }, []);
  console.log(isOk);

  return (
    <>
      {recentMatch && <RecentPosts />}
      {myMatch && <MyPosts />}
      {likeMatch && <LikePosts />}
    </>
  );
};

export default Infinite;
