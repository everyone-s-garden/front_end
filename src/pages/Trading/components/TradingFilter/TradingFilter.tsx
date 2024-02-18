import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Text from '../../../../components/Text';
import arrowIcon from 'assets/arrow-up-icon.svg';
import LocationModal from '../TradingModal/LocationModal';
import CropsModal from '../TradingModal/CropsModal';
import MoneyModal from '../TradingModal/MoneyModal';
import FilterModal from '../TradingModal/FilterModal';

const TradingFilter = () => {
  const [isLocationFilter, setLocationFilter] = useState(false);
  const [isCropsFilter, setCropsFilter] = useState(false);
  const [isMoneyFilter, setMoneyFilter] = useState(false);
  const [isFilter, setFilter] = useState(false);
  const [crops, setCrops] = useState('');

  return (
    <Container>
      <TitleContainer onClick={() => setLocationFilter(prev => !prev)}>
        <Text size={16}>{'지역'}</Text>
        <ArrowButton>
          <img src={arrowIcon} alt="버튼 아이콘" />
        </ArrowButton>
        <LocationModal isOpen={isLocationFilter} />
      </TitleContainer>
      <TitleContainer
        onClick={e => {
          setCropsFilter(prev => !prev);
        }}
      >
        <Text size={16}>{'작물 종류'}</Text>
        <ArrowButton>
          <img src={arrowIcon} alt="버튼 아이콘" />
        </ArrowButton>
        <CropsModal
          isOpen={isCropsFilter}
          onClick={crop => {
            setCrops(crop);
          }}
        />
      </TitleContainer>
      <TitleContainer
        onClick={() => {
          setMoneyFilter(prev => !prev);
        }}
      >
        <Text size={16}>{'가격'}</Text>
        <ArrowButton>
          <img src={arrowIcon} alt="버튼 아이콘" />
        </ArrowButton>
        <MoneyModal isOpen={isMoneyFilter} />
      </TitleContainer>
      <TitleContainer
        onClick={() => {
          setFilter(prev => !prev);
        }}
      >
        <Text size={16}>{'정렬'}</Text>
        <ArrowButton>
          <img src={arrowIcon} alt="버튼 아이콘" />
        </ArrowButton>
        <FilterModal isOpen={isFilter} />
      </TitleContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  height: 32px;
  margin-top: 40px;
`;

const TitleContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
  background: #dbdfd4;
  border-radius: 4px;
  margin-right: 8px;
`;

const IconTmp = styled.div`
  width: 24px;
  height: 24px;
  background: gray;
`;

const ArrowButton = styled.div`
  width: 12px;
  height: 12px;
  margin-left: 8px;
  margin-bottom: 4px;
`;

export default TradingFilter;
