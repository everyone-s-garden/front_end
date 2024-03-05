import React, { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BREAK_POINT } from 'constants/style';
import { isFeedbackOpenAtom, memberIdAtom, windowOffsetAtom } from 'recoil/atom';
import Menu, { UserAdivce } from './Menu/Menu';
import { NavigateFunction, Outlet, useMatch, useNavigate, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import user_default_profile_image from 'assets/my/profile-image.png';
import user_profile_flower_icon from 'assets/user_profile_flower_icon.png';
import Feedback from './Feedback/Feedback';
import { useGetMyInfo } from 'api/UserAPI';

type AfterLoginProps = {
  navermaps: typeof naver.maps;
};

const GRADE_CONVERT = ['씨앗', '새싹', '가지', '열매', '수확', '농사꾼'];
const GRADE = ['SEED', 'SPROUT', 'STEM', 'FRUIT', 'HARVEST', 'FARMER'];

interface ISubHeaderProps {
  myGardensMatch?: boolean;
  gardenManageMatch?: boolean;
  cropTradeMatch?: boolean;
  whisperMatch?: boolean;
  nav: NavigateFunction;
  indexRoutingMatch?: boolean;
}

const UserInfoComponent = ({
  setIsFeedbackOpen,
  windowWidth,
}: {
  setIsFeedbackOpen: React.Dispatch<SetStateAction<boolean>>;
  windowWidth?: number;
}) => {
  const { data } = useGetMyInfo();

  console.log(data);

  if (!data) return null;

  return (
    <MenuContainer>
      <UserInfoWrapper>
        <UserInfoInnerWrapper>
          <img src={user_default_profile_image} style={{ widows: 25, height: 25 }} />
          <div>
            <span>{data.nickname}</span>
            <span>{data.email}</span>
          </div>
        </UserInfoInnerWrapper>
        <UserInfoBottomWrapper>
          <img src={user_profile_flower_icon} width={42} height={42} />
          <span style={{ fontSize: 16, color: '#fff' }}>
            {GRADE_CONVERT[GRADE.indexOf(data.memberMannerGrade)]} 등급
          </span>
        </UserInfoBottomWrapper>
      </UserInfoWrapper>
      {windowWidth && windowWidth > BREAK_POINT.MOBILE_NUMBER ? (
        <UserAdivce setIsFeedbackOpen={setIsFeedbackOpen} />
      ) : null}
    </MenuContainer>
  );
};

const SubHeader = ({
  myGardensMatch,
  gardenManageMatch,
  cropTradeMatch,
  whisperMatch,
  indexRoutingMatch,
  nav,
}: ISubHeaderProps) => {
  const likeMatch = useMatch('/my/my_gardens/like');
  const recentMatch = useMatch('/my/my_gardens/recent');
  const myPostMatch = useMatch('/my/my_gardens/mypost');
  const salesMatch = useMatch('/my/crop_trade/sales_history');
  const purchaseMatch = useMatch('/my/crop_trade/purchase_history');
  const wishListMatch = useMatch('/my/crop_trade/wishlist');
  const regionalCertificationMatch = useMatch('/my/crop_trade/regional_certification');
  const gardenSellingMatch = useMatch('/my/garden_manage/my_garden_selling');
  const gardenUsingMatch = useMatch('/my/garden_manage/my_garden_using');
  const likeGardenMatch = useMatch('/my/garden_manage/like');
  const whisperPostMatch = useMatch('/my/whisper/my_post');
  const commentPostMatch = useMatch('/my/whisper/comment_post');
  const whisperLikeMatch = useMatch('/my/whisper/like');

  // const res = await customAxios.get('members/my');
  // const memberId = getItem('member_id');
  // setMemberId(Number(memberId));
  return (
    <ButtonWrapper>
      {(myGardensMatch || indexRoutingMatch) && (
        <>
          <Btn onClick={() => nav('my_gardens/like')} match={likeMatch !== null || indexRoutingMatch} secondary={true}>
            찜한텃밭
            {(likeMatch || indexRoutingMatch) && <ButtonHighlight layoutId="1" />}
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
          <Btn
            onClick={() => nav('crop_trade/regional_certification')}
            match={regionalCertificationMatch !== null}
            secondary={true}
          >
            지역 인증하기
            {regionalCertificationMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
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
          {/* <Btn
            onClick={() => nav('garden_manage/my_garden_selling')}
            match={gardenSellingMatch !== null}
            secondary={true}
          >
            나의 분양중인 텃밭
            {gardenSellingMatch && <ButtonHighlight layoutId="1" />}
          </Btn> */}
          <Btn onClick={() => nav('garden_manage/my_garden_using')} match={gardenUsingMatch !== null} secondary={true}>
            나의 텃밭
            {gardenUsingMatch && <ButtonHighlight layoutId="1" />}
          </Btn>
          {/* <Btn onClick={() => nav('garden_manage/like')} match={likeGardenMatch !== null} secondary={true}>
            내가 찜한 텃밭
            {likeGardenMatch && <ButtonHighlight layoutId="1" />}
          </Btn> */}
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
  const indexRoutingMatch = useMatch('/my')?.pathname;
  return (
    <>
      {windowWidth.width > BREAK_POINT.MOBILE_NUMBER ? (
        <Container>
          <Header>
            <InnerHeader>
              <ButtonWrapper>
                <Btn
                  onClick={() => nav('/my/my_gardens/like')}
                  match={myGardensMatch !== null || indexRoutingMatch === '/my'}
                >
                  내 주변 분양
                </Btn>
                {/* <Btn onClick={() => nav('/my/crop_trade/regional_certification')} match={cropTradeMatch !== null}>
                  작물거래
                </Btn> */}
                <Btn onClick={() => nav('/my/garden_manage/my_garden_using')} match={gardenManageMatch !== null}>
                  텃밭관리
                </Btn>
                <Btn onClick={() => nav('/my/whisper/my_post')} match={whisperMatch !== null}>
                  속닥속닥
                </Btn>
                <Btn onClick={() => nav('/setting')}>설정</Btn>
              </ButtonWrapper>
            </InnerHeader>
            <InnerHeader>
              <SubHeader
                myGardensMatch={myGardensMatch !== null}
                gardenManageMatch={gardenManageMatch !== null}
                cropTradeMatch={cropTradeMatch !== null}
                whisperMatch={whisperMatch !== null}
                indexRoutingMatch={indexRoutingMatch === '/my'}
                nav={nav}
              />
            </InnerHeader>
          </Header>
          <ContentWrapper>
            {/* 유저 정보가 들어갈 부분 */}
            <UserInfoComponent windowWidth={windowWidth.width} setIsFeedbackOpen={setIsFeedbackOpen} />

            {/* 변하는 페이지  */}
            <Outlet context={navermaps} />
          </ContentWrapper>
        </Container>
      ) : (
        <Container>
          {windowWidth.width < BREAK_POINT.MOBILE_NUMBER && indexRoutingMatch && (
            <UserInfoComponent windowWidth={windowWidth.width} setIsFeedbackOpen={setIsFeedbackOpen} />
          )}
          <Outlet context={navermaps} />
        </Container>
      )}
      <Feedback />
    </>
  );
};

export default Mypage;

const Container = styled.div`
  margin-top: 40px;
  padding: 0 20px;
  width: 100%;
  justify-content: center;

  @media ${({ theme }) => theme.devices.mobile} {
    margin-top: 0px;
    padding: 0;
  }
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 64px;
`;

const InnerHeader = styled.div`
  height: 48px;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray[100]};
  :last-child {
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.colors.gray[100]};
  }

  :first-child > div > button {
    color: ${({ theme }) => theme.colors.gray[100]};
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
  flex: 1;

  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    padding: 0;
  }
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
  color: ${props => (props.match && props.secondary ? 'black' : props.match ? '#83A834' : '#D9D9D9')} !important;
`;
// active color : #F77800
//  none active color :#D9D9D9

const ButtonHighlight = styled(motion.div)`
  background-color: #83a834;
  height: 4px;
  position: absolute;
  bottom: 0;
  width: 130%;
`;

const UserInfoWrapper = styled.div`
  width: 204px;
  height: 280px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
    height: 198px;
    margin-top: 40px;
  }
`;
const MenuContainer = styled.div`
  margin-right: 72px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    margin-right: 24px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-right: 0;
  }
`;

const UserInfoInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 23px;
  border-bottom: 1px solid #e0e0e0;
  img {
    width: 94px !important;
    height: 94px !important;
    margin-bottom: 10px;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      width: 80px !important;
      height: 80px !important;
    }
  }
  span:first-of-type {
    font-size: 16px;
    color: #fff;
    background-color: #ea803d;
    padding: 4px 10px;
    border-radius: 10px;
  }

  button {
    background-color: #fdf3e2;
    width: 49px;
    height: 25px;
    border-radius: 4px;
  }
  div {
    padding: 4px 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;

    span:last-of-type {
      text-align: center;
      padding-top: 10px;
      color: ${({ theme }) => theme.colors.orange[500]};
    }
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding-top: 15px;
    padding-bottom: 10px;
  }
`;

const UserInfoBottomWrapper = styled.div`
  background-color: #ea803d;
  flex: 1;
  padding: 5px 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
