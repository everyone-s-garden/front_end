import styled from 'styled-components';
import React, { useState, useRef } from 'react';

const RangeSlider = () => {
  const priceGap = 10000;
  const fixedMinPrice = 0;
  const fixedMaxPrice = 100000;
  const [rangeMinValue, setRangeMinValue] = useState(fixedMinPrice);
  const [rangeMaxValue, setRangeMaxValue] = useState(fixedMaxPrice);
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(0);

  const prcieRangeMinValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeMinValue(parseInt(e.target.value));
  };

  const prcieRangeMaxValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeMaxValue(parseInt(e.target.value));
  };

  const twoRangeHandler = () => {
    if (rangeMaxValue - rangeMinValue < priceGap) {
      setRangeMaxValue(rangeMinValue + priceGap);
      setRangeMinValue(rangeMaxValue - priceGap);
    } else {
      setRangeMinPercent((rangeMinValue / fixedMaxPrice) * 100);
      setRangeMaxPercent(100 - (rangeMaxValue / fixedMaxPrice) * 100);
    }
  };

  return (
    <>
      <FilterPriceRangeWrap>
        <FilterPriceRangeMin
          type="range"
          min={fixedMinPrice}
          max={fixedMaxPrice - priceGap}
          step="1000"
          value={rangeMinValue}
          onChange={e => {
            prcieRangeMinValueHandler(e);
            twoRangeHandler();
          }}
        />
        <FilterPriceRangeMax
          type="range"
          min={fixedMinPrice + priceGap}
          max={fixedMaxPrice}
          step="1000"
          value={rangeMaxValue}
          onChange={e => {
            prcieRangeMaxValueHandler(e);
            twoRangeHandler();
          }}
        />
      </FilterPriceRangeWrap>
    </>
  );
};
export default RangeSlider;

const FilterPriceRangeWrap = styled.div`
  position: relative;
  width: 254px;
  height: 4px;
  background-color: #6d993e;
`;

const FilterPriceRangeMin = styled.input`
  position: absolute;
  top: -9px;
  width: 100%;
  -webkit-appearance: none;
  background: none;
  //버튼 디자인
  pointer-events: none;
  &::-webkit-slider-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 1px solid #b0b0b0;
    background-color: white;
    -webkit-appearance: none;
    pointer-events: auto;
  }
`;

const FilterPriceRangeMax = styled(FilterPriceRangeMin)``;
