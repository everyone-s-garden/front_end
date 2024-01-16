import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BREAK_POINT } from 'constants/style';
import { isLoginAtom, memberIdAtom } from 'recoil/atom';
import BeforeLogin from './BeforeLogin/BeforeLogin';
import AfterLogin from './AfterLogin/AfterLogin';
import Menu from './Menu/Menu';
import { Helmet } from 'react-helmet-async';
import customAxios from 'utils/token';
import { getItem } from 'utils/session';
import { NavigateFunction, Outlet, useMatch, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
type AfterLoginProps = {
  navermaps: typeof naver.maps;
};

interface ISubHeaderProps {
  myGardensMatch?: boolean;
  gardenManageMatch?: boolean;
  cropTradeMatch?: boolean;
  whisperMatch?: boolean;
  nav: NavigateFunction;
}

const SubHeader = ({ myGardensMatch, gardenManageMatch, cropTradeMatch, whisperMatch, nav }: ISubHeaderProps) => {
  const likeMatch = useMatch('/my/my_gardens/like');
  const recentMatch = useMatch('/my/my_gardens/recent');
  const myPostMatch = useMatch('/my/my_gardens/mypost');
  const salesMatch = useMatch('/my/crop_trade/sales_history');
  const purchaseMatch = useMatch('/my/crop_trade/purchase_history');
  const wishListMatch = useMatch('/my/crop_trade/wishlist');
  const gardenSellingMatch = useMatch('/my/garden_manage/my_garden_selling');
  const gardenUsingMatch = useMatch('/my/garden_manage/my_garden_using');
  const likeGardenMatch = useMatch('/my/garden_manage/like');
  const whisperPostMatch = useMatch('/my/whisper/my_post');
  const commentPostMatch = useMatch('/my/whisper/comment_post');
  const whisperLikeMatch = useMatch('/my/whisper/like');

  return (
    <ButtonWrapper>
      {myGardensMatch && (
        <>
          <Btn onClick={() => nav('my_gardens/like')}>
            찜한텃밭
            {likeMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('my_gardens/recent')}>
            최근 본 텃밭
            {recentMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('my_gardens/mypost')}>
            내가 올린 글{myPostMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
        </>
      )}
      {cropTradeMatch && (
        <>
          <Btn onClick={() => nav('crop_trade/sales_history')}>
            판매내역
            {salesMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('crop_trade/purchase_history')}>
            구매내역
            {purchaseMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('crop_trade/wishlist')}>
            관심목록
            {wishListMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
        </>
      )}
      {gardenManageMatch && (
        <>
          <Btn onClick={() => nav('garden_manage/my_garden_selling')}>
            나의 분양중인 텃밭
            {gardenSellingMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('garden_manage/my_garden_using')}>
            내가 이용하는 텃밭
            {gardenUsingMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('garden_manage/like')}>
            내가 찜한 텃밭
            {likeGardenMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
        </>
      )}

      {whisperMatch && (
        <>
          <Btn onClick={() => nav('whisper/my_post')}>
            작성한 글 목록
            {whisperPostMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('whisper/comment_post')}>
            댓글 단 글{commentPostMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('whisper/like')}>
            좋아요 누른 글{whisperLikeMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
        </>
      )}
    </ButtonWrapper>
  );
};
const Mypage = () => {
  const [memberId, setMemberId] = useRecoilState(memberIdAtom);
  const { navermaps } = useOutletContext<AfterLoginProps>();
  const nav = useNavigate();
  const myGardensMatch = useMatch('/my/my_gardens/:params');
  const gardenManageMatch = useMatch('/my/garden_manage/:params');
  const cropTradeMatch = useMatch('/my/crop_trade/:params');
  const whisperMatch = useMatch('/my/whisper/:params');

  // const res = await customAxios.get('members/my');
  // const memberId = getItem('member_id');
  // setMemberId(Number(memberId));
  return (
    <Container>
      <Helmet>
        <title>마이페이지, 월별 추천 작물보기</title>
      </Helmet>
      <Header>
        <InnerHeader>
          <ButtonWrapper>
            <Btn onClick={() => nav('/my/my_gardens/like')} match={myGardensMatch !== null}>
              나의 텃밭
            </Btn>
            <Btn onClick={() => nav('/my/crop_trade/sales_history')} match={cropTradeMatch !== null}>
              작물거래
            </Btn>
            <Btn onClick={() => nav('/my/garden_manage/my_garden_selling')} match={gardenManageMatch !== null}>
              텃밭관리
            </Btn>
            <Btn onClick={() => nav('/my/whisper/my_post')} match={whisperMatch !== null}>
              속닥속닥
            </Btn>
          </ButtonWrapper>
        </InnerHeader>
        <InnerHeader>
          <SubHeader
            myGardensMatch={myGardensMatch !== null}
            gardenManageMatch={gardenManageMatch !== null}
            cropTradeMatch={cropTradeMatch !== null}
            whisperMatch={whisperMatch !== null}
            nav={nav}
          />
        </InnerHeader>
      </Header>
      <ContentWrapper>
        {/* 유저 정보가 들어갈 부분 */}
        <div>hihihihihihihihihihihihi</div>

        {/* 변하는 페이지  */}
        <Outlet context={navermaps} />
      </ContentWrapper>
    </Container>
  );
};

export default Mypage;

const Container = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  width: 100%;
  justify-content: center;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 20px;
    padding: 0 19px;
  }
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 64px;
`;

const InnerHeader = styled.div`
  height: 48px;
  border-top: 1px solid;
  border-color: #d9d9d9;
  :last-child {
    border-bottom: 1px solid;
    border-color: #d9d9d9;
  }

  :first-child > div > button {
    color: #d9d9d9;
  }
  :last-child > div > button {
    color: #9e9e9e;
    font-weight: bold;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  margin: auto;
  height: 100%;
  align-items: center;
`;
const ContentWrapper = styled.div`
  display: flex;
  padding: 0px 123px;
`;

const Btn = styled.button<{ match?: boolean }>`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => (props.match ? '#F77800' : '#D9D9D9')} !important;
`;
// active color : #F77800
//  none active color :#D9D9D9

const ButtonHighlight = styled(motion.div)`
  background-color: #f77800;
  height: 4px;
  position: absolute;
  bottom: 0;
  width: 130%;
`;
