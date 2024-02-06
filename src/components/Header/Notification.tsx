import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from 'recoil/atom';
import useSelect from 'hooks/useSelect';
import notification_image from 'assets/notification.png';
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';
import customAxios from 'utils/token';

function formatDateToYYYYMMDD(timestamp: number) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
function getDayOfWeek(timestamp: number) {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(timestamp);
  const dayOfWeekIndex = date.getDay(); // 0부터 6까지의 숫자

  return daysOfWeek[dayOfWeekIndex];
}
const mockData = [
  {
    category: '알람',
    payload: '새싹님과의 거래가 30분 남았습니다 !\n우리씨앗농장에서 12:00PM에 보아요',
    createdAt: Date.now(),
  },
  {
    category: '후기',
    payload: '텃린이님과의 거래를 잘 완료하셨나요? \n거래 후기를 남기고 후기를 확인해보세요! ',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
  {
    category: '알람',
    payload: '텃밭장인님의 찜한 텃밭이 마감 하루 전 입니다 ✨ \n오늘 마감되는 텃밭을 확인해보세요 !',
    createdAt: Date.now(),
  },
];

// GET /notification/all
// GET /notification/new
// GET /notification/new/poll
// PATCH /notification/{id}/mark-as-read
const Notification = () => {
  const isLogin = useRecoilValue(isLoginAtom);
  const { isOpen, toggleSelect, closeSelect } = useSelect();
  const [openNotification, setOpenNotification] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await customAxios.get('notification/all');
      console.log(res.data);
    })();
  }, []);

  return (
    <>
      {isLogin && (
        <div style={{ position: 'relative' }}>
          <button
            style={{ padding: '0 5px' }}
            // active={isMapPage}
            onClick={() => setOpenNotification(!openNotification)}
          >
            <ButtonImage src={notification_image} alt="맵아이콘" />
            <div
              style={{
                position: 'absolute',
                fontSize: 10,
                right: 0,
                top: '20%',
                backgroundColor: 'red',
                color: 'white',
                padding: '1px 4px',
                borderRadius: 5,
              }}
            >
              {mockData.length}
            </div>
          </button>
          {openNotification && (
            <NotificationContainer>
              <NotificationTitleWrapper>
                <button
                  onClick={() => setOpenNotification(!openNotification)}
                  style={{ display: 'flex', alignItems: 'center', position: 'absolute', left: 28 }}
                >
                  <BackIcon width="11" height="20" stroke="black" strokeWidth="2" />
                </button>
                <span style={{ fontSize: 20, fontWeight: 'bold' }}>알림</span>
              </NotificationTitleWrapper>

              <NotificationUl>
                {mockData.map((data, idx) => {
                  return (
                    <NotificationLi key={idx}>
                      <div style={{ padding: '20px 28px' }}>
                        <span style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8, display: 'block' }}>
                          {data.category}
                        </span>
                        <p style={{ display: 'block', marginBottom: 8 }}>{data.payload}</p>
                        <p style={{ fontSize: 14, color: '#9B9B9B' }}>
                          {formatDateToYYYYMMDD(data.createdAt)} {`(${getDayOfWeek(data.createdAt)})`}
                        </p>
                      </div>
                    </NotificationLi>
                  );
                })}
              </NotificationUl>
            </NotificationContainer>
          )}
        </div>
      )}
    </>
  );
};

export default Notification;
const NotificationUl = styled.ul`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding-top: 0px;
  }
`;

const NotificationContainer = styled.div`
  position: absolute;
  left: -400px;
  width: 420px;
  height: 615px;
  top: 50;
  border: 1px solid #d9d9d9;
  background-color: #fff;
  border-radius: 20px;
  overflow: scroll;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    border-radius: 0;
    border: 0;
    position: fixed;
    z-index: 99999999;
  }
`;

const NotificationLi = styled.li`
  border-bottom: 1px solid #d9d9d9;

  div {
    padding: 0 28px;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      padding: 0px 28px;
    }
  }
`;
const NotificationTitleWrapper = styled.div`
  display: none;
  padding: 20px 28px;
  align-items: center;
  justify-content: center;
  margin-bottom: 36;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: flex;
  }
`;

const ButtonImage = styled.img`
  height: 24px;
`;

const OverLay = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 100vh;
`;
