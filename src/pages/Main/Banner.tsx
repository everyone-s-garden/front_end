import React, { useState } from 'react';
import banner1 from 'assets/main/banner1.png';
import banner2 from 'assets/main/banner2.png';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { ReactComponent as ArrowIcon } from 'assets/arrow-icon.svg';

const bannerList = [banner1, banner2];
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
        {bannerList.map((banner, index) => (
          <Img key={index} src={banner} />
        ))}
      </ImgContainer>
      {index !== 0 && <LeftArrow onClick={onLeftBtnClicked} />}
      {index !== bannerList.length - 1 && <RightArrow onClick={onRightBtnClicked} />}
    </Slider>
  );
};

const Slider = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    height: 480px;
  }
`;

const ImgContainer = styled.div<{ index: number }>`
  display: flex;
  width: 100%;
  height: 100%;
  transform: ${({ index }) => `translateX(-${index * 100}%)`};
  transition: transform 0.5s ease-in-out;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 10%;
`;

const LeftArrow = styled(ArrowIcon)`
  position: absolute;
  left: 3%;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  cursor: pointer;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 40px;
    height: 40px;
  }
`;

const RightArrow = styled(LeftArrow)`
  right: 3%;
  left: auto;
  transform: translateY(-50%) rotate(180deg);
`;

export default Banner;
