import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LocationIcon } from 'assets/main/location-icon.svg';
import { useRecoilState } from 'recoil';
import { myLocationAtom } from 'recoil/atom';
import findMyGeoLocation from 'utils/findMyGeoLocation';
import { BREAK_POINT } from 'constants/style';

const CardHeader = () => {
  const [myLocation, setMyLocation] = useRecoilState(myLocationAtom);
  const currentDate = new Date();

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedTime = `${formattedHours}:${minutes.toString().padStart(2, '0')} ${amOrPm}`;

  const handleLocationBtnClick = async () => {
    const { location } = await findMyGeoLocation();

    setMyLocation({
      ...myLocation,
      latitude: location.lat,
      longitude: location.lng,
    });
  };

  return (
    <Container>
      <LocationWrapper>
        <Location>{myLocation.position}</Location>
        <Time>{formattedTime}</Time>
      </LocationWrapper>
      <LocationBtn onClick={handleLocationBtnClick}>
        <StyledLocationIcon />
        <BtnContent>내 위치 찾기</BtnContent>
      </LocationBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  justify-content: space-between;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 14px 30px;
  }
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const Location = styled.div`
  font-size: 16px;
  font-weight: 500;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 24px;
  }
`;

const Time = styled.div`
  font-size: 14px;
  font-weight: 400;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 20px;
  }
`;

const LocationBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledLocationIcon = styled(LocationIcon)`
  width: 18px;
  height: 18px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 24px;
    height: 24px;
  }
`;

const BtnContent = styled.span`
  font-size: 14px;
  font-weight: 400;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 20px;
  }
`;

export default CardHeader;
