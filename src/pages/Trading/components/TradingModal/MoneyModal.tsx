import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from '../../../../constants/style';
import RangeSlider from '../../../../components/RangeSlider';

interface MoneyModalProps {
  isOpen: boolean;
}
const MoneyModal = ({ isOpen }: MoneyModalProps) => {
  return (
    <Dimmed isOpen={isOpen}>
      <Container
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <span style={{ marginTop: '16px', marginLeft: '16px' }}>{'가격'}</span>
        <SliderBox>
          <RangeSlider />
        </SliderBox>
      </Container>
    </Dimmed>
  );
};

export default MoneyModal;
const Dimmed = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  position: relative;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    position: fixed;
    opacity: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease-in;
    z-index: 1001;
  }
`;

const Container = styled.div`
  position: absolute;
  width: 306px;
  height: 162px;
  background-color: #ffffff;
  z-index: 1000;
  left: -70px;
  top: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 2px black;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
    height: 50%;
    top: 50%;
    left: 0;
  }
`;

const SliderBox = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 26px;
  margin-top: 84px;
`;
