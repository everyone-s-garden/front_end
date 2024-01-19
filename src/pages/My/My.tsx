import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BREAK_POINT } from 'constants/style';
import { isFeedbackOpenAtom, memberIdAtom, windowOffsetAtom } from 'recoil/atom';
import Menu, { UserAdivce } from './Menu/Menu';
import { NavigateFunction, Outlet, useMatch, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import user_default_profile_image from 'assets/profile_image.png';
import Margin from 'components/Margin';
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

const UserInfoComponent = ({ setIsFeedbackOpen }: { setIsFeedbackOpen: React.Dispatch<SetStateAction<boolean>> }) => {
  return (
    <MenuContainer>
      <UserInfoWrapper>
        <UserInfoInnerWrapper>
          <img src={user_default_profile_image} style={{ widows: 25, height: 25 }} />
          <div>
            <span>텃린이</span>
            <Margin height={10} />
            <span>새싹등급</span>
          </div>
          <Margin height={10} />
          <button>설정</button>
        </UserInfoInnerWrapper>

        <CountWrapper>
          <div>
            <span>스크랩</span>
            <Margin height={11} />
            <button>13</button>
          </div>
          <div>
            <span>좋아요</span>
            <Margin height={11} />

            <button>13</button>
          </div>
          <div>
            <span>텃밭 관리</span>
            <Margin height={11} />

            <button>13</button>
          </div>
        </CountWrapper>
      </UserInfoWrapper>
      <UserAdivce setIsFeedbackOpen={setIsFeedbackOpen} />
    </MenuContainer>
  );
};

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
          <Btn onClick={() => nav('my_gardens/like')} match={likeMatch !== null} secondary={true}>
            찜한텃밭
            {likeMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('my_gardens/recent')} match={recentMatch !== null} secondary={true}>
            최근 본 텃밭
            {recentMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('my_gardens/mypost')} match={myPostMatch !== null} secondary={true}>
            내가 올린 글{myPostMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
        </>
      )}
      {cropTradeMatch && (
        <>
          <Btn onClick={() => nav('crop_trade/sales_history')} match={salesMatch !== null} secondary={true}>
            판매내역
            {salesMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('crop_trade/purchase_history')} match={purchaseMatch !== null} secondary={true}>
            구매내역
            {purchaseMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('crop_trade/wishlist')} match={whisperLikeMatch !== null} secondary={true}>
            관심목록
            {wishListMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
        </>
      )}
      {gardenManageMatch && (
        <>
          <Btn
            onClick={() => nav('garden_manage/my_garden_selling')}
            match={gardenSellingMatch !== null}
            secondary={true}
          >
            나의 분양중인 텃밭
            {gardenSellingMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('garden_manage/my_garden_using')} match={gardenUsingMatch !== null} secondary={true}>
            내가 이용하는 텃밭
            {gardenUsingMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('garden_manage/like')} match={likeGardenMatch !== null} secondary={true}>
            내가 찜한 텃밭
            {likeGardenMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
        </>
      )}

      {whisperMatch && (
        <>
          <Btn onClick={() => nav('whisper/my_post')} match={whisperPostMatch !== null} secondary={true}>
            작성한 글 목록
            {whisperPostMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('whisper/comment_post')} match={commentPostMatch !== null} secondary={true}>
            댓글 단 글{commentPostMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          <Btn onClick={() => nav('whisper/like')} match={whisperLikeMatch !== null} secondary={true}>
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
  const [isFeedbackOpen, setIsFeedbackOpen] = useRecoilState(isFeedbackOpenAtom);
  const windowWidth = useRecoilValue(windowOffsetAtom);

  return (
    <>
      {windowWidth.width > BREAK_POINT.MOBILE_NUMBER ? (
        <Container>
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
            <UserInfoComponent setIsFeedbackOpen={setIsFeedbackOpen} />

            {/* 변하는 페이지  */}
            <Outlet context={navermaps} />
          </ContentWrapper>
        </Container>
      ) : (
        <Container>
          <UserInfoComponent setIsFeedbackOpen={setIsFeedbackOpen} />
        </Container>
      )}
    </>
  );
};

export default Mypage;

const Container = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  width: 100%;
  justify-content: center;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
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

const Btn = styled.button<{ match?: boolean; secondary?: boolean }>`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${props => (props.match && props.secondary ? 'black' : props.match ? '#F77800' : '#D9D9D9')} !important;
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

const UserInfoWrapper = styled.div`
  width: 204px;
  height: 304px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
  }
`;
const MenuContainer = styled.div`
  margin-right: 72px;
  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    margin-right: 36px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-right: 0;
  }
`;

const UserInfoInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
  img {
    width: 94px !important;
    height: 94px !important;
    margin-bottom: 10px;
  }
  span:first-of-type {
    font-size: 18px;
    font-weight: bold;
  }
  span:nth-of-type(2) {
    font-size: 14px;
    font-weight: bold;
  }
  button {
    background-color: #fdf3e2;
    width: 49px;
    height: 25px;
    border-radius: 4px;
  }

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: row;
  }
`;

const CountWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 1;
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
