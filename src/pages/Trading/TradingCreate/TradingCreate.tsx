import React, { useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from '../../../constants/style';
import Text from '../../../components/Text';
import TradingImage from '../components/TradingImage/TradingImage';
import useModal from '../hook/useModal';
import CreateTradingLocationModal from '../components/Modal/CreateTradingLocationModal';
import LocationModal from '../components/TradingModal/LocationModal';
import SelectLocationModal from '../components/Modal/SelectLocationModal';

type StatusObject = {
  text: string;
  select: boolean;
};

type StatusTypes = {
  [key: string]: StatusObject;
};

type locationObject = {
  text: string;
  select: boolean;
};

type locationTypes = {
  [key: string]: locationObject;
};

const TradingCreate = () => {
  const [imgState, setImgState] = useState<File[]>([]);
  const [priceState, setPriceState] = useState('');
  const [TradingState, setTradingState] = useState<StatusTypes>({
    Available: { text: '거래 가능', select: false },
    Reservation: { text: '예약 중', select: false },
    Completed: { text: '완료', select: false },
  });
  const [location, setLocation] = useState<locationTypes>({
    gangNam: {
      text: '서울특별시 강남구 역삼1동',
      select: false,
    },
    goYang: {
      text: '경기도 고양시 덕양구 행신동',
      select: false,
    },
    yongIn: {
      text: '경기도 용인시 처인구 역삼동',
      select: false,
    },
  });
  const { open, close, Modal } = useModal();

  const clickTradingStateHandle = (select: number) => {
    const TradingStateCopy = JSON.parse(JSON.stringify(TradingState));
    Object.keys(TradingStateCopy).map((data, index) => {
      if (index === select) {
        TradingStateCopy[data].select = !TradingStateCopy[data].select;
      } else {
        TradingStateCopy[data].select = false;
      }
    });

    setTradingState(TradingStateCopy);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 입력 값이 숫자이고 10자를 넘지 않으면 상태 업데이트
    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/[^\d]/g, '');
    }
    setPriceState(value);
  };

  return (
    <Container>
      <Text size={18}>{'작물거래 글쓰기'}</Text>
      <TradingImage imgState={imgState} setImgState={setImgState} />
      <Body>
        <Title type="text" placeholder={'글 제목'} />
        <Price
          type="text"
          placeholder={'가격'}
          onKeyDown={e => {
            // 숫자, 백스페이스, 탭, 엔터, 방향키를 제외한 모든 키 입력 방지
            if (
              !/^\d$/.test(e.key) &&
              e.key !== 'Backspace' &&
              e.key !== 'Tab' &&
              e.key !== 'Enter' &&
              !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
            ) {
              e.preventDefault();
            }
          }}
          onChange={handleChange}
          maxLength={10}
        />
        <Content placeholder={'자세한 설명'} />
        <TradingStateWrapper>
          <Text size={17}>{'상태'}</Text>
          {Object.keys(TradingState).map((data, index) => (
            <ToggleButton
              key={index}
              onClick={() => clickTradingStateHandle(index)}
              isSelect={TradingState[data].select}
            >
              {TradingState[data].text}
            </ToggleButton>
          ))}
        </TradingStateWrapper>
        <TradingLocationWrapper>
          <Text size={17}>{'거래 지역'}</Text>
          <Button width={84} height={31} onClick={open}>
            지역 추가
          </Button>
          <Modal>
            <CreateTradingLocationModal close={close} locationState={location} setLocationState={setLocation} />
          </Modal>
        </TradingLocationWrapper>
        <DesiredLocationWrapper>
          <Text size={17}>{'거래희망장소'}</Text>
          <Button width={80} height={31} onClick={open}>
            위치 추가
          </Button>
          <Modal>
            <SelectLocationModal></SelectLocationModal>
          </Modal>
        </DesiredLocationWrapper>
        <AppendButton>{'등록하기'}</AppendButton>
      </Body>
    </Container>
  );
};

export default TradingCreate;

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 20px;
    padding: 0 19px;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  width: 100%;
  height: 544px;
  margin-top: 37px;
`;

const Title = styled.input`
  width: 709px;
  height: 48px;
  margin-right: 95px;
  margin-bottom: 18px;
  font-size: 17px;
  border: none;
  border-bottom: 1px solid #d7d7d7;
  &:focus {
    outline: none;
  }
`;

const Price = styled.input`
  width: 709px;
  height: 48px;
  margin-right: 95px;
  margin-bottom: 18px;
  font-size: 17px;
  border: none;
  border-bottom: 1px solid #d7d7d7;
  &:focus {
    outline: none;
  }
`;

const Content = styled.textarea`
  height: 160px;
  width: 709px;
  margin-right: 95px;
  margin-bottom: 18px;
  border-radius: 10px;
  border: 1px solid var(--divider-button-line, #d7d7d7);
  font-size: 17px;
  &:focus {
    outline: none;
  }
  padding: 16px;
  resize: none;
`;

const TradingStateWrapper = styled.div`
  width: 709px;
  height: 66px;
  margin-right: 95px;
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TradingLocationWrapper = styled.div`
  width: 709px;
  height: 66px;
  margin-right: 95px;
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DesiredLocationWrapper = styled.div`
  width: 709px;
  height: 66px;
  margin-right: 95px;
  border-bottom: 1px solid #d7d7d7;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Button = styled.button<{ width: number; height: number }>`
  width: ${props => `${props.width}px`};
  height: ${props => `${props.height}px`};
  border-radius: 8px;
  background: var(--Green-Green_500, #9ec646);
  margin-left: 24px;
  color: white;
`;

const ToggleButton = styled.button<{ isSelect: boolean }>`
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${props => (props.isSelect ? '#9EC646' : '#BEBEBE')};
  background: ${props => (props.isSelect ? '#F1F7E4' : '#fff')};
  margin-left: 12px;
  color: ${props => (props.isSelect ? '#000000' : '#BEBEBE')};
  padding-left: 10px;
  padding-right: 10px;
`;

const AppendButton = styled.button`
  width: 351px;
  height: 52px;
  background-color: #9ec646;
  border-radius: 10px;
  opacity: 0.3;
  font-size: 18px;
  color: #ffffff;
  margin-top: 60px;
`;
