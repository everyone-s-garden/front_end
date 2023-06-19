import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Outlet, useMatch, useOutletContext } from 'react-router-dom';
import { BREAK_POINT } from 'constants/style';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { likeListsAtom, likePageAtom, myListsAtom, myPageAtom, recentListsAtom, recentPageAtom } from 'recoil/atom';

type AfterLoginProps = {
  navermaps: typeof naver.maps;
};

const AfterLogin = () => {
  const { navermaps } = useOutletContext<AfterLoginProps>();
  const resetMy = useResetRecoilState(myListsAtom);
  const resetMyPage = useResetRecoilState(myPageAtom);
  const resetRecent = useResetRecoilState(recentListsAtom);
  const resetRecentPage = useResetRecoilState(recentPageAtom);
  const resetLike = useResetRecoilState(likeListsAtom);
  const resetLikePage = useResetRecoilState(likePageAtom);
  const recentMatch = useMatch('/my/recent');
  const myMatch = useMatch('/my/mypost');
  const likeMatch = useMatch('/my/like');

  const detailMatch = useMatch('/my/:id');

  useEffect(() => {
    if (recentMatch) {
      resetMy();
      resetMyPage();
      resetLike();
      resetLikePage();
    } else if (myMatch) {
      resetRecent();
      resetRecentPage();
      resetLike();
      resetLikePage();
    } else if (likeMatch) {
      resetRecent();
      resetRecentPage();
      resetMy();
      resetMyPage();
    } else if (!detailMatch) {
      resetRecent();
      resetRecentPage();
      resetLike();
      resetLikePage();
      resetMy();
      resetMyPage();
    }
  }, [recentMatch, likeMatch, myMatch, detailMatch]);

  return (
    <Container>
      <Outlet context={{ navermaps }} />
    </Container>
  );
};
export default AfterLogin;

const Container = styled.section`
  flex-grow: 1;
  margin-right: auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 0;
  }
`;
