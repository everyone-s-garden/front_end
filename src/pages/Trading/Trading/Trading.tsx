import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { BREAK_POINT } from '../../../constants/style';
import Text from '../../../components/Text';
import TradingFilter from '../components/TradingFilter/TradingFilter';
import { useQuery } from '@tanstack/react-query';
import { getCropsList } from '../../../api/TradingApi';
import { useInView } from 'react-intersection-observer';

const Trading = () => {
  const navigate = useNavigate();

  const [tradingState, setTradingState] = useState({
    searchContent: null,
    offset: 0,
    limit: 10,
    tradeType: null,
    cropCategory: null,
    orderBy: 'RECENT_DATE',
  });
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const { data: cropsList, isLoading } = useQuery(
    [
      'cropsListData',
      tradingState.searchContent,
      tradingState.offset,
      tradingState.limit,
      tradingState.tradeType,
      tradingState.cropCategory,
      tradingState.orderBy,
    ],
    () =>
      getCropsList({
        searchContent: tradingState.searchContent,
        offset: tradingState.offset,
        limit: tradingState.limit,
        tradeType: tradingState.tradeType,
        cropCategory: tradingState.cropCategory,
        orderBy: tradingState.orderBy,
      }),
    {
      enabled:
        tradingState.offset > 0 ||
        tradingState.searchContent !== null ||
        tradingState.tradeType !== null ||
        tradingState.cropCategory !== null ||
        !!tradingState.orderBy,
    },
  );

  const observer = <div className={'observer'} ref={ref} style={{ width: '100%', height: '2px' }} />;

  console.log(cropsList);
  return (
    <Container>
      <Banner>
        <TitleContainer>
          <Text size={24}>{'작물거래'}</Text>
        </TitleContainer>
        <Text size={18}>{'텃밭에서 나온 작물을 거래해요!'}</Text>
        <TradingFilter />
      </Banner>
      <ListContainer>
        {!!cropsList &&
          cropsList.cropsInfos.map((data, index) => (
            <ItemContainer key={index} onClick={() => navigate(`/trading/${data.cropsPostId}`)}>
              <Img></Img>
              <Text size={20}>{data.title}</Text>
              <Text size={20}>{`${data.price}원`}</Text>
            </ItemContainer>
          ))}
      </ListContainer>
    </Container>
  );
};

export default Trading;

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 20px;
    padding: 0 19px;
  }
`;

const Banner = styled.div`
  width: 100%;
  height: 218px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f1f7e8;
`;

const TitleContainer = styled.div`
  margin-top: 46px;
  margin-bottom: 13px;
`;

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(276px, auto));
  padding-left: 123px;
  padding-right: 123px;
  padding-top: 48px;
  justify-items: stretch;
  gap: 20px;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding-top: 24px;
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 350px;
    height: 108px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 207px;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 111px;
    height: 108px;
  }
`;
