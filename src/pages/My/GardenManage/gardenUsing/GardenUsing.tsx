import { useGetMyGardens } from 'api/GardenAPI';
import PostListItem from 'components/PostListItem';
import { BREAK_POINT } from 'constants/style';
import React, { useState } from 'react';
import styled from 'styled-components';
import { usingItem } from 'utils/dummydata';

const GardenUsing = () => {
  const { data: myGardensData } = useGetMyGardens();
  const [openMenu, setOpenMenu] = useState(false);

  function calculateDaysBetweenDates(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString.replace(/\./g, '/'));
    const endDate = new Date(endDateString.replace(/\./g, '/'));

    // 일(day) 단위로 차이를 계산하기 위해 밀리초 단위의 차이를 일(day) 단위로 변환
    const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초 수
    const diffInTime = endDate.getTime() - startDate.getTime(); // 밀리초로 변환 후 뺄셈 연산
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }

  if (!myGardensData) return null;

  return (
    <div style={{ flex: 1 }}>
      <Menu>
        <div style={{ fontWeight: 600 }}>나의 텃밭</div>
      </Menu>
      {myGardensData.map(item => (
        <div
          style={{
            display: 'flex',
            border: '1px solid #D7D7D7',
            marginBottom: 32,
            padding: '20px 21px',
            borderRadius: 18,
          }}
          key={item.myManagedGardenId}
        >
          <ImageWrapper>
            <img src={item.images[0]} />
          </ImageWrapper>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DateOfUse>
              <span>사용기한이 {calculateDaysBetweenDates(item.useStartDate, item.useEndDate)}일 남았습니다</span>
              <span style={{ fontSize: 14, color: '#5A5A5A' }}>
                ({item.useStartDate} ~ {item.useEndDate})
              </span>
            </DateOfUse>

            <div style={{ marginBottom: 8 }}>
              <span style={{ marginRight: 8 }}>이름</span>
              <span style={{ fontWeight: 600 }}>{item.gardenName}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <span style={{ marginRight: 8 }}>정보</span>
              <span style={{ fontWeight: 600, marginRight: 8 }}>경기도 · 용인</span>
              <span style={{ fontWeight: 600 }}> 8평</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GardenUsing;

const Menu = styled.div`
  padding-bottom: 11px;
  flex: 1;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  div:first-child {
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      display: none;
    }
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    justify-content: end;
  }
`;
const MenuButtonWrapper = styled.div`
  display: flex;
  div:first-child {
    margin-right: 12px;
  }
  div {
    background-color: #dcebbd;
    padding: 4px 5px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    color: #000;
  }
`;

const ImageWrapper = styled.div`
  width: 234px;
  height: 122px;
  flex-shrink: 0;
  border-radius: 8px;
  margin-right: 24px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 111px;
    height: 122px;
  }
`;

const DateOfUse = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  span:first-child {
    font-size: 18px;
    font-weight: 600;
    margin-right: 12px;
    @media screen and (max-width: ${BREAK_POINT.TABLET}) {
      font-size: 17px;
      margin-bottom: 8px;
    }
  }
  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
