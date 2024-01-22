import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from '../../../constants/style';
import CropsList from 'pages/Trading/CropsList/index';

interface CropsModalProps {
  isOpen: boolean;
  onClick: (item: string) => void;
}

interface cropsListType {
  [key: string]: {
    select: boolean;
    value: string;
  };
}

const CropsModal = ({ isOpen, onClick }: CropsModalProps) => {
  const [cropsList, setCropsList] = useState<cropsListType>({
    곡물: { select: false, value: 'GRAIN' },
    과일: { select: false, value: 'VEGETABLE' },
    채소: { select: false, value: 'FRUIT' },
    콩: { select: false, value: 'BEAN' },
    기타: { select: false, value: 'ETC' },
  });
  useEffect(() => {
    const url = Object.keys(cropsList)
      .filter(data => cropsList[data].select)
      .map(key => cropsList[key].value);
    onClick(url.join());
  }, [cropsList]);

  return (
    <Dimmed isOpen={isOpen}>
      <Container onClick={e => e.stopPropagation()}>
        {Object.keys(cropsList).map((data, index) => (
          <CropsItem
            key={index}
            itemKey={index}
            selected={cropsList[data].select}
            onClick={() => {
              setCropsList(prev => ({
                ...prev,
                [data]: {
                  ...prev[data],
                  select: !prev[data].select,
                },
              }));
            }}
          >
            {data}
          </CropsItem>
        ))}
      </Container>
    </Dimmed>
  );
};
export default CropsModal;

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
  height: 197px;
  background-color: #ffffff;
  z-index: 1000;
  left: 0px;
  top: 37px;
  display: grid;
  gap: 0;
  grid-template-columns: repeat(2, minmax(66px, auto));
  border-radius: 10px;
  box-shadow: 0 0 2px black;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
    height: 50%;
    bottom: 0;
    left: 0;
  }
`;
const CropsItem = styled.div<{ itemKey: number; selected: boolean }>`
  width: 153px;
  height: 66px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 24px;
  border-right: 1px solid #e5e5e5;
  border-bottom: ${props => (props.itemKey !== 4 ? '1px solid #e5e5e5' : '')};
  border-radius: 10px;
  background-color: ${props => (props.selected ? '#F1F7E8' : '#fff')};
`;
