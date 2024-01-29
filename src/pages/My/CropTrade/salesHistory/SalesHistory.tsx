import PostListItem from 'components/PostListItem';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { items } from 'utils/dummydata';
import { getCropTradeAPI } from 'utils/fetchGardenData';

const SalesHistory = () => {
  const [selectedButton, setSelectedButton] = useState('판매중');

  useEffect(() => {
    (async () => {
      const res = await getCropTradeAPI.fetchSalesHistoryAPI();
      console.log(res);
    })();
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <RadioButtonWrapper>
        <RadioButton isActive={selectedButton === '판매중'} onClick={() => setSelectedButton('판매중')}>
          판매중
        </RadioButton>
        <RadioButton isActive={selectedButton === '거래중'} onClick={() => setSelectedButton('거래중')}>
          거래중
        </RadioButton>
        <RadioButton isActive={selectedButton === '판매완료'} onClick={() => setSelectedButton('판매완료')}>
          판매완료
        </RadioButton>
      </RadioButtonWrapper>
      <ul>
        <PostListItem items={items} />
      </ul>
    </div>
  );
};

export default SalesHistory;

const RadioButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 16px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 28px;
`;

const RadioButton = styled.button<{ isActive: boolean }>`
  color: ${props => (props.isActive ? '#282828' : '#D7D7D7')};
  margin-right: 70px;
  font-weight: bold;
`;
