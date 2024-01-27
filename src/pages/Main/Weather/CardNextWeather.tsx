import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from 'assets/arrow-icon.svg';
import { AnimatePresence, motion } from 'framer-motion';
import useSelect from 'hooks/useSelect';
import { useGetPerTimeWeather, useGetWeeklyWeather } from 'api/WeatherAPI';
import { useRecoilState } from 'recoil';
import { myLocationAtom } from 'recoil/atom';
import WeeklyWeather from './WeeklyWeather';
import TimeWeather from './TimeWeather';
import { BREAK_POINT } from 'constants/style';

const CardNextWeather = () => {
  const [myLocation, setMyLocation] = useRecoilState(myLocationAtom);
  const { isOpen: open, toggleSelect } = useSelect();
  const { data: weeklyData } = useGetWeeklyWeather(myLocation.latitude, myLocation.longitude);
  const { data: timeData } = useGetPerTimeWeather(myLocation.latitude, myLocation.longitude);

  useEffect(() => {
    if (weeklyData) {
      setMyLocation(prev => {
        return {
          ...prev,
          position: weeklyData.regionName,
        };
      });
    }
  }, [weeklyData, setMyLocation]);

  if (!weeklyData || !timeData) return null;

  return (
    <Container>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, visibility: 'hidden' }}
            animate={{ height: 'auto', visibility: 'visible' }}
            exit={{ height: 0, visibility: 'hidden' }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          >
            <TimeWrapper>
              <Tag>시간대별 기온</Tag>
              <TimeWeather timeData={timeData} />
            </TimeWrapper>
            <WeeklyWeatherWrapper>
              <Tag>주간별 날씨</Tag>
              <WeeklyWeather weeklyData={weeklyData} />
            </WeeklyWeatherWrapper>
          </motion.div>
        )}
      </AnimatePresence>
      <ETCBtn onClick={toggleSelect}>
        {open ? '날씨 올리기' : '날씨 더보기'} <StyledArrowIcon open={open} />
      </ETCBtn>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
`;

const Tag = styled.span`
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid #f77700;
  background: #fed;
  font-size: 12px;
  font-weight: 600;
  color: #f77700;
  width: fit-content;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 20px;
    padding: 8px 12px;
  }
`;

const TimeWrapper = styled.div`
  height: 224px;
  border-bottom: 1px solid #e5e5e5;
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    height: 338px;
    padding: 44px 30px;
  }
`;

const WeeklyWeatherWrapper = styled.div`
  height: 180px;
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    height: 275px;
    padding: 44px 30px;
  }
`;

const ETCBtn = styled(motion.div)`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #cecece;
  color: #676767;
  font-size: 18px;
  font-weight: 500;
  gap: 16px;
  cursor: pointer;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 20px;
  }
`;

const StyledArrowIcon = styled(ArrowIcon)<{ open: boolean }>`
  width: 16px;
  height: 16px;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(270deg)')};
  transition: transform 0.3s;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 20px;
    height: 20px;
  }
`;

export default CardNextWeather;
