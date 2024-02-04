import PostListItem from 'components/PostListItem';
import { BREAK_POINT } from 'constants/style';
import React, { useState } from 'react';
import styled from 'styled-components';
import { usingItem } from 'utils/dummydata';

const GardenUsing = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const item = usingItem.myManagedGardenGetResponses[0];
  function calculateDaysBetweenDates(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString.replace(/\./g, '/'));
    const endDate = new Date(endDateString.replace(/\./g, '/'));

    // 일(day) 단위로 차이를 계산하기 위해 밀리초 단위의 차이를 일(day) 단위로 변환
    const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초 수
    const diffInTime = endDate.getTime() - startDate.getTime(); // 밀리초로 변환 후 뺄셈 연산
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
  }
  // 함수 사용 예

  return (
    <div style={{ flex: 1 }}>
      <Menu>
        <div style={{ fontWeight: 600 }}>나의 텃밭</div>
        {openMenu ? (
          <MenuButtonWrapper>
            <div>삭제</div>
            <div onClick={() => setOpenMenu(false)}>취소</div>
          </MenuButtonWrapper>
        ) : (
          <div onClick={() => setOpenMenu(true)}>편집</div>
        )}
      </Menu>
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
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 600, marginRight: 12 }}>
              사용기한이 {calculateDaysBetweenDates(item.useStartDate, item.useEndDate)}일 남았습니다
            </span>
            <div>
              <span style={{ fontSize: 14, color: '#5A5A5A' }}>
                ({item.useStartDate} ~ {item.useEndDate})
              </span>
            </div>
          </div>
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
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    background-color: red;
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
`;
