import React, { useState } from 'react';
import styled from 'styled-components';
import location from 'assets/my-location.svg';
import search from 'assets/simple-search-icon.svg';
import { BREAK_POINT } from 'constants/style';

interface LocationModalProps {
  isOpen: boolean;
}

const LocationModal = ({ isOpen }: LocationModalProps) => {
  const [test, setText] = useState('내위치 지정');
  return (
    <Dimmed isOpen={isOpen}>
      <Container onClick={e => e.stopPropagation()}>
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
            <span style={{ color: '#494949', fontSize: '12px' }}>{test}</span>
          </LocationBox>
        </ModalHeader>
        <ModalBody>
          <DefaultItem>
            <img src={search} alt={'검색'} style={{ width: '32px', height: '24px', marginBottom: '11px' }} />
            <span style={{ color: '#76806C', lineHeight: '24px' }}>{'원하는 거래 장소를 검색해보세요.'}</span>
          </DefaultItem>
        </ModalBody>
      </Container>
    </Dimmed>
  );
};

export default LocationModal;

const Container = styled.div`
  position: absolute;
  width: 306px;
  height: 448px;
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
    bottom: 0;
    left: 0;
  }
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
