import React, { useState } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import CardSlider from 'components/CardSlider';
import Crop from './Crop';

interface MonthCropProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MonthCrop({ isOpen, setIsOpen }: MonthCropProps) {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const data = [
    {
      name: '상추',
      content:
        '상추 모종 심기 상추의 영양 및 효능상추는 다른 엽채류에 비해 철분과 필수 아미노산이 풍부하여 체내 혈액 용량을 증가시키고 피를 맑게 하는 청혈 작용을 하며 저혈압을 예방한다. 수확하는 법',
    },
    {
      name: '토마토',
      content:
        '상추 모종 심기 상추의 영양 및 효능상추는 다른 엽채류에 비해 철분과 필수 아미노산이 풍부하여 체내 혈액 용량을 증가시키고 피를 맑게 하는 청혈 작용을 하며 저혈압을 예방한다. 수확하는 법상추 모종 심기 상추의 영양 및 효능상추는 다른 엽채류에 비해 철분과 필수 아미노산이 풍부하여 체내 혈액 용량을 증가시키고 피를 맑게 하는 청혈 작용을 하며 저혈압을 예방한다. 수확하는 법상추 모종 심기 상추의 영양 및 효능상추는 다른 엽채류에 비해 철분과 필수 아미노산이 풍부하여 체내 혈액 용량을 증가시키고 피를 맑게 하는 청혈 작용을 하며 저혈압을 예방한다. 수확하는 법상추 모종 심기 상추의 영양 및 효능상추는 다른 엽채류에 비해 철분과 필수 아미노산이 풍부하여 체내 혈액 용량을 증가시키고 피를 맑게 하는 청혈 작용을 하며 저혈압을 예방한다. 수확하는 법',
    },
  ];

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <ModalTitle>월별 추천작물</ModalTitle>

        <CardSlider month={month} setMonth={setMonth} />

        <CropsContainer>
          {data.map((crop, idx) => (
            <Crop key={idx} name={crop.name} content={crop.content} />
          ))}
        </CropsContainer>
      </ModalContent>
    </Modal>
  );
}

export default MonthCrop;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ModalTitle = styled.h1`
  color: #414c38;
  font-size: 18px;
  font-weight: 500;
`;

const CropsContainer = styled.ul`
  margin-top: 250px;
  width: 100%;
  border-top: 1px solid #e1e1e1;
  overflow: scroll;
`;
