import React, { Fragment, useState } from 'react';
import banner1 from 'assets/main/banner1.png';
import banner1Mobile from 'assets/main/banner1-mobile.png';
import banner2 from 'assets/main/banner2.png';
import banner2Mobile from 'assets/main/banner2-mobile.png';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { ReactComponent as ArrowIcon } from 'assets/main/arrow-icon.svg';

const bannerList = [
  [banner1, banner1Mobile, '#FEF9E6'],
  [banner2, banner2Mobile, '#F0FBE4'],
];

const Banner = () => {
  const [index, setIndex] = useState<number>(0);

  const onLeftBtnClicked = () => {
    if (index === 0) return;
    setIndex(prev => prev - 1);
  };

  const onRightBtnClicked = () => {
    if (index === bannerList.length - 1) return;
    setIndex(prev => prev + 1);
  };

  return (
    <Slider>
      <ImgContainer index={index}>
        {bannerList.map(([banner, mobileBanner, color], index) => (
          <Fragment key={index}>
            <ImgWrapper color={color}>
              <Img src={banner} />
            </ImgWrapper>
            <MobileImg key={index} src={mobileBanner} />
          </Fragment>
        ))}
      </ImgContainer>
      {index !== 0 && <LeftArrow onClick={onLeftBtnClicked} />}
      {index !== bannerList.length - 1 && <RightArrow onClick={onRightBtnClicked} />}
    </Slider>
  );
};

const Slider = styled.div`
  overflow: hidden;
  position: relative;
`;

const ImgContainer = styled.div<{ index: number }>`
  height: 100%;
  width: 100%;
  display: flex;
  transform: ${({ index }) => `translateX(-${index * 100}%)`};
  transition: transform 0.5s ease-in-out;
`;

const ImgWrapper = styled.div<{ color: string }>`
  display: none;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ color }) => color};
  }
`;

const Img = styled.img`
  flex-shrink: 0;
  width: 100%;
  object-fit: cover;
  object-position: 25%;
  display: none;
  max-width: 1440px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: block;
  }
`;

const MobileImg = styled(Img)`
  /* object-position: center; */
  /* max-width: 390px; */
  display: block;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const LeftArrow = styled(ArrowIcon)`
  position: absolute;
  left: 3%;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%) rotate(180deg);
  cursor: pointer;
  opacity: 0.2;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    opacity: 1;
    width: 30px;
    height: 30px;
  }
`;

const RightArrow = styled(LeftArrow)`
  right: 3%;
  left: auto;
  transform: translateY(-50%);
`;

export default Banner;
