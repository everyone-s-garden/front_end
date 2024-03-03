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
import Spinner from 'components/Spinner';

const CardNextWeather = () => {
  const [myLocation, setMyLocation] = useRecoilState(myLocationAtom);
  const { isOpen: open, toggleSelect } = useSelect();
  const { data: weeklyData, isFetching: weeklyFetching } = useGetWeeklyWeather(
    myLocation.latitude,
    myLocation.longitude,
  );
  const { data: timeData, isFetching: timeFetching } = useGetPerTimeWeather(myLocation.latitude, myLocation.longitude);

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

  return (
    <Container>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, overflow: 'hidden' }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          >
            {weeklyFetching || timeFetching || !weeklyData || !timeData ? (
              <LoaderWrapper>
                <Spinner />
              </LoaderWrapper>
            ) : (
              <>
                <TimeWrapper>
                  <Tag>시간대별 기온</Tag>
                  <TimeWeather timeData={timeData} />
                </TimeWrapper>
                <WeeklyWeatherWrapper>
                  <Tag>주간별 날씨</Tag>
                  <WeeklyWeather
                    nextDayData={timeData.weatherTimeResponses[timeData.weatherTimeResponses.length - 1].skyStatus}
                    weeklyData={weeklyData}
                  />
                </WeeklyWeatherWrapper>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <ETCBtn onClick={toggleSelect}>
        {open ? '날씨 올리기' : '날씨 더보기'} <StyledArrowIcon open={open} />
      </ETCBtn>
    </Container>
  );
};

const Container = styled.div``;

const Tag = styled.span`
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.orange[600]};
  background: #fed;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.orange[600]};
  width: fit-content;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 20px;
    padding: 8px 12px;
  }
`;

const LoaderWrapper = styled.div`
  height: 404px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${({ theme }) => theme.devices.mobile} {
    height: 613px;
  }
`;

const TimeWrapper = styled.div`
  height: 224px;
  border-bottom: 1px solid #e5e5e5;
  padding: 28px 18px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media ${({ theme }) => theme.devices.mobile} {
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
  @media ${({ theme }) => theme.devices.mobile} {
    height: 275px;
    padding: 44px 30px;
  }
`;

const ETCBtn = styled(motion.div)`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 16px;
  font-weight: 600;
  gap: 16px;
  cursor: pointer;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 20px;
  }
`;

const StyledArrowIcon = styled(ArrowIcon)<{ open: boolean }>`
  width: 16px;
  height: 16px;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(270deg)')};
  transition: transform 0.3s;
  @media ${({ theme }) => theme.devices.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export default CardNextWeather;
