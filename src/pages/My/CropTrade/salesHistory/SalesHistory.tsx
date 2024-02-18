import { ICropTradeItem } from 'api/type';
import PostListItem from 'components/PostListItem';
import { BREAK_POINT } from 'constants/style';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { items } from 'utils/dummydata';
import { getCropTradeAPI } from 'utils/fetchGardenData';

const SalesHistory = () => {
  const [selectedButton, setSelectedButton] = useState('판매중');
  const [tradeItems, setTradeItems] = useState<ICropTradeItem[]>([]);
  useEffect(() => {
    (async () => {
      const res = await getCropTradeAPI.fetchSalesHistoryAPI();
      const { cropInfos } = res.data;
      setTradeItems([...cropInfos]);
    })();
  }, []);
  if (tradeItems.length === 0) {
    return <h1>판매내역이 존재하지 않습니다.</h1>;
  }

  return (
    <div style={{ flex: 1 }}>
      <RadioButtonWrapper>
        <RadioButton isActive={selectedButton === '판매중'} onClick={() => setSelectedButton('판매중')}>
          판매중
          {selectedButton === '판매중' && <MobileUnderBar layoutId="underBar" />}
        </RadioButton>
        <RadioButton isActive={selectedButton === '거래중'} onClick={() => setSelectedButton('거래중')}>
          거래중
          {selectedButton === '거래중' && <MobileUnderBar layoutId="underBar" />}
        </RadioButton>
        <RadioButton isActive={selectedButton === '판매완료'} onClick={() => setSelectedButton('판매완료')}>
          판매완료
          {selectedButton === '판매완료' && <MobileUnderBar layoutId="underBar" />}
        </RadioButton>
      </RadioButtonWrapper>
      <Container>
        <PostListItem tradeItems={tradeItems} />
      </Container>
    </div>
  );
};

export default SalesHistory;

const RadioButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 28px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 17px;
    padding-bottom: 10px;
    border-bottom: 2px solid #d7d7d7;
    margin-bottom: 0;
  }
`;

const RadioButton = styled.button<{ isActive: boolean }>`
  color: ${props => (props.isActive ? '#282828' : '#D7D7D7')};
  margin-right: 70px;
  font-weight: bold;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-right: 0;
    flex: 1;
    position: relative;
  }
`;

const Container = styled.ul`
  display: flex;
  flex: 1;
  max-width: 662px;
  min-width: 334px;
`;

const MobileUnderBar = styled(motion.div)`
  display: none;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #9ec646;
    bottom: -12px;
    display: flex;
  }
`;
