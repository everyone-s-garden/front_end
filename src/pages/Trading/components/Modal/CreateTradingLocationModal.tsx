import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

type locationObject = {
  text: string;
  select: boolean;
};

type locationTypes = {
  [key: string]: locationObject;
};

type SetImgState = (value: locationTypes | ((prevImgState: locationTypes) => locationTypes)) => void;

interface CreateTradingLocationModalProps {
  close: () => void;
  locationState: locationTypes;
  setLocationState: SetImgState;
}
const CreateTradingLocationModal = ({ close, locationState, setLocationState }: CreateTradingLocationModalProps) => {
  const clickLocation = (select: number) => {
    const locationCopy = JSON.parse(JSON.stringify(locationState));
    Object.keys(locationCopy).map((data, index) => {
      if (index === select) {
        locationCopy[data].select = !locationCopy[data].select;
      } else {
        locationCopy[data].select = false;
      }
    });
    setLocationState(locationCopy);
  };

  return (
    <Container>
      <Title>{'인증한 지역 중 1곳을 선택해주세요.'}</Title>
      {Object.keys(locationState).map((data, index) => (
        <Content
          key={index}
          isSelect={locationState[data].select}
          onClick={() => {
            clickLocation(index);
          }}
        >
          {locationState[data].text}
        </Content>
      ))}
      <Button onClick={close}>{'등록하기'}</Button>
    </Container>
  );
};

export default CreateTradingLocationModal;

const Container = styled.div`
  width: 400px;
  height: 563px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  padding-left: 24px;
  padding-top: 34px;
  padding-bottom: 34px;
  font-size: 18px;
  border-bottom: 1px solid #d7d7d7;
`;

const Content = styled.span<{ isSelect: boolean }>`
  width: 100%;
  height: 56px;
  background-color: ${props => (props.isSelect ? '#F1F7E4' : '#fff')};
  padding-left: 20px;
  padding-top: 18px;
  padding-bottom: 19px;
  font-size: 16px;
  border-bottom: 1px solid #d7d7d7;
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  background-color: #9ec646;
  margin-top: 64%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
