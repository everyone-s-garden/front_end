import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import CardSlider from 'components/CardSlider';
import Crop from './Crop';
import HttpRequest from 'api/HttpRequest';
import { Corp } from 'api/type';

interface MonthCropProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MonthCrop({ isOpen, setIsOpen }: MonthCropProps) {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [crop, setCrop] = useState<Corp[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
<<<<<<< HEAD
      const res = await HttpRequest.get(`/v1/crops`);
=======
      const res = await HttpRequest.get(`v1/crops`);
>>>>>>> 56548e554b27e041a8a20449eafad3f0be5e6021
      const crops = res.data.cropsResponses;
      setCrop(crops);
    };
    fetchData();
  }, []);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ModalContent>
        <ModalTitle>월별 추천작물</ModalTitle>

        <CardSlider month={month} setMonth={setMonth} />

        <CropsContainer>
          {crop &&
            crop.map((cropsData, idx) => {
              if (cropsData.month === month) {
                return cropsData.cropInfos.map((v, i) => {
                  return <Crop key={`${v.name}-i`} name={v.name} content={v.description} link={v.link} />;
                });
              }
              return null;
            })}
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
