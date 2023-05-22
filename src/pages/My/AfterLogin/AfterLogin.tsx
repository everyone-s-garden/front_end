import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Heart from '../../../assets/empty_heart.svg';
import Post from './Post';
import EmptyFiled from './emptfiled/EmptyFiled';
import MyFiled from './myfiled/MyFiled';
import { useForm } from 'react-hook-form';
import { BREAK_POINT } from 'constants/style';
import { useNavigate } from 'react-router-dom';
import customAxios from 'utils/token';

const AfterLogin = () => {
  const [list, setList] = useState([1, 2, 3, 4, 5, 6]);
  const [field, setFiled] = useState(null);
  const nav = useNavigate();
  const initial = async () => {
    const res = await customAxios.get(`v1/garden/mine`);
    console.log(res);
  };
  useEffect(() => {
    initial();
  }, []);
  return (
    <Container>
      {field === null ? <EmptyFiled /> : <MyFiled />}
      <LikeWrapper>
        <SpanBox>
          <LikeSpan>찜한 목록</LikeSpan>
          {list.length > 5 && <MoreView>더보기</MoreView>}
        </SpanBox>
        <LikeUl>
          {list.length === 0 ? (
            <EmptyList>
              <NoLikeListBox>
                <Img src={Heart} />
                <p>찜한 목록이 없습니다.</p>
              </NoLikeListBox>
            </EmptyList>
          ) : (
            list.map(i => <Post key={i}></Post>)
          )}
        </LikeUl>
        {field !== null && (
          <Span>
            판매하고 싶은 밭이 있나요?{' '}
            <UnderLine onClick={() => nav('/garden-register-seller')}>분양 밭 등록하기</UnderLine>
          </Span>
        )}
      </LikeWrapper>
    </Container>
  );
};

export default AfterLogin;

const Container = styled.section`
  width: 100%;
  height: 150vh;
  margin-top: 54px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    height: 200vh;
  }
`;
const SpanBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LikeSpan = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;
const LikeWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 92px auto;
  margin-bottom: 120px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 32px;
    width: 100%;
    padding: 0px 20px;
  }
`;
const MoreView = styled.span`
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: #afafaf;
  cursor: pointer;
`;

const LikeUl = styled.ul`
  width: 864px;
  height: fit-content;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: fit-content;
    margin: 0 auto;
  }
`;
const EmptyList = styled.div`
  width: 864px;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: fit-content;
  }
`;
const NoLikeListBox = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 82px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin: 20px auto;
  }
`;
const Img = styled.img`
  width: 45px;
  height: 38px;
  margin-bottom: 20px;
`;

const Span = styled.span`
  color: #afafaf;
  font-weight: 500 !important;
  font-size: 13.1188px !important;
  line-height: 16px;
  margin-top: 30px;
  display: inline-block;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
  }
`;
const UnderLine = styled.span`
  text-decoration: underline;
  color: #afafaf;
  font-weight: 500 !important;
  font-size: 13.1188px !important;
  line-height: 16px;
  margin-bottom: 56px;
  display: inline-block;
  cursor: pointer;
`;
