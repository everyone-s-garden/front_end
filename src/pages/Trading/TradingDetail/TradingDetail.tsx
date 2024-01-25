import React from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from '../../../constants/style';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ImageSlider from '../../../components/ImageSlider';
import { getDetailCrop } from '../../../api/TradingApi';
import Text from '../../../components/Text';
import TradingLocationBox from '../components/TradingLocationBox/TradingLocationBox';
const TradingDetail = () => {
  const { tradingId } = useParams();
  const { data: tradingDetail, isLoading } = useQuery({
    queryKey: ['cropDetail', tradingId],
    queryFn: () => getDetailCrop(!tradingId ? '' : tradingId),
    enabled: !!tradingId,
  });

  return (
    <Container>
      <ImageSlider images={tradingDetail?.images}></ImageSlider>
      <ProfileContainer>
        <ProfileWrapper>
          <Img></Img>
          <Text size={20} marginLeft={18}>
            {'텃린이'}
          </Text>
        </ProfileWrapper>
        <GradeWrapper>
          <Text size={16}>{'새싹등급'}</Text>
          <Text size={12} marginTop={6} marginLeft={11}>
            {'등급안내'}
          </Text>
        </GradeWrapper>
      </ProfileContainer>
      <Divider />
      <TitleWrapper>
        <Text size={24} marginTop={24}>
          {'주말농장에서 키운 고구마'}
        </Text>
        <Text size={16} marginTop={14}>
          {'덕양구 · 행신동'}
        </Text>
      </TitleWrapper>
      <Divider />
      <MainWrapper>
        <MainText>{`저희 매주 가는 주말농장에서 키운 고구마입니다.
2kg당 13000원입니다.`}</MainText>
        <Text size={14}>{'신고하기'}</Text>
      </MainWrapper>
      <Divider />
      <TradingWrapper>
        <Text size={18} marginTop={27} marginBottom={12}>
          {'거래 희망 장소'}
        </Text>
        <TradingLocationBox value={'고양시덕양행신종합사회복지관'} />
      </TradingWrapper>
      <Divider />
      <RowWrapper>
        <LikeFill />
        <div>
          <div>{'거래가능'}</div>
          <div>{'13,000원'}</div>
        </div>
        <button>{'채팅하기'}</button>
      </RowWrapper>
      <Divider />
      <AdvertisementWrapper></AdvertisementWrapper>
    </Container>
  );
};

export default TradingDetail;

const Container = styled.div`
  margin-top: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-left: 30%;
  margin-right: 30%;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
    margin-right: 0;
  }
`;

const TadingDetailContainer = styled.div`
  width: 80%;
  padding-left: 327px;
  padding-right: 327px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const GradeWrapper = styled.div``;

const Img = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: 1px solid black;
`;

const LikeFill = styled.img`
  width: 26px;
  height: 26px;
`;

const Divider = styled.div`
  background-color: #d9d9d9;
  width: 100%;
  height: 1px;
  flex-shrink: 0;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin-bottom: 24px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const MainText = styled.span`
  width: 100%;
  height: 213px;
  margin-top: 24px;
  white-space: pre;
  font-weight: 500;
  line-height: 27px;
`;

const AdvertisementWrapper = styled.div`
  height: 303px;
  margin-bottom: 116px;
`;

const TradingWrapper = styled.div`
  height: 128px;
`;

const RowWrapper = styled.div`
  height: 104px;
  margin-left: 19px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
`;
