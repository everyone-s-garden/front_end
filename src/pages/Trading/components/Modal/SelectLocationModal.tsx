import React, { useState } from 'react';
import styled from 'styled-components';
import search from '../../../../assets/simple-search-icon.svg';
import location from '../../../../assets/my-location.svg';
import { BREAK_POINT } from '../../../../constants/style';

const SelectLocationModal = () => {
  return (
    <Container>
      <ModalHeader>
        <LocationInput>
          <img
            src={search}
            alt={'검색'}
            style={{ width: '14px', height: '14px', marginLeft: '8px', marginRight: '12px', cursor: 'pointer' }}
          />
          <input
            placeholder={'장소명을 입력하세요.'}
            style={{ outline: 'none', width: '100%', backgroundColor: '#f0f0f0', border: 'none' }}
          />
        </LocationInput>
        <LocationBox>
          <img src={location} alt={'현재 위치 검색'} style={{ marginRight: '5px', cursor: 'pointer' }} />
          <span style={{ color: '#494949', fontSize: '12px' }}></span>
        </LocationBox>
      </ModalHeader>
      <ModalBody>
        <DefaultItem>
          <img src={search} alt={'검색'} style={{ width: '32px', height: '24px', marginBottom: '11px' }} />
          <span style={{ color: '#76806C', lineHeight: '24px' }}>{'원하는 거래 장소를 검색해보세요.'}</span>
        </DefaultItem>
      </ModalBody>
      <Button>{'등록하기'}</Button>
    </Container>
  );
};

export default SelectLocationModal;
const Container = styled.div`
  width: 400px;
  height: 563px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  justify-items: center;
  height: 88px;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
`;

const LocationBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  margin-left: 19px;
  margin-bottom: 12px;
`;

const LocationInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 26px;
  width: 273px;
  margin-top: 18px;
  margin-bottom: 15px;
  margin-left: 16px;
  background-color: #f0f0f0;
  border-radius: 4px;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 90%;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const DefaultItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  margin-top: 50%;
  width: 123px;
  height: 100%;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 10%;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 52px;
  background-color: #9ec646;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
