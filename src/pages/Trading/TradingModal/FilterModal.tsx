import React from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from '../../../constants/style';
import Text from '../../../components/Text';

interface FilterModalProps {
  isOpen: boolean;
}

const FilterModal = ({ isOpen }: FilterModalProps) => {
  return (
    <Dimmed isOpen={isOpen}>
      <Container onClick={e => e.stopPropagation()}>
        <TextWrapper style={{ borderBottom: '1px solid #E5E5E5' }}>{'찜이 많은 순'}</TextWrapper>
        <TextWrapper>{'추천 순'}</TextWrapper>
      </Container>
    </Dimmed>
  );
};

export default FilterModal;

const Dimmed = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};

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
  height: 60px;
  background-color: #ffffff;
  z-index: 1000;
  left: 0px;
  top: 37px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 0 2px black;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
    height: 50%;
    bottom: 0;
    left: 0;
  }
`;

const TextWrapper = styled.div`
  line-height: 24px;
  margin-top: 5px;
  margin-left: 16px;
  width: 100%;
  height: 50%;
`;
