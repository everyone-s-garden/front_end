import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import jan from 'assets/modal/month-crop/jan-illust.jpg';
import feb from 'assets/modal/month-crop/feb-illust.jpg';
import mar from 'assets/modal/month-crop/mar-illust.jpg';
import apr from 'assets/modal/month-crop/apr-illust.jpg';
import may from 'assets/modal/month-crop/may-illust.jpg';
import jun from 'assets/modal/month-crop/jun-illust.jpg';
import jul from 'assets/modal/month-crop/jul-illust.jpg';
import aug from 'assets/modal/month-crop/aug-illust.jpg';
import sep from 'assets/modal/month-crop/sep-illust.jpg';
import oct from 'assets/modal/month-crop/oct-illust.jpg';
import nov from 'assets/modal/month-crop/nov-illust.jpg';
import dec from 'assets/modal/month-crop/dec-illust.jpg';
import arrowIcon from 'assets/modal/card-arrow-icon.svg';

interface CardSliderProps {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

function CardSlider({ month, setMonth }: CardSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const onLeftBtnClicked = () => {
    if (month < 2) return;
    setMonth(month - 1);
  };

  const onRightBtnClicked = () => {
    if (month > 11) return;
    setMonth(month + 1);
  };

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transform = `translateX(-${(month - 1) * 290}px)`;
  }, [month]);

  return (
    <SliderDiv>
      <CardContainer ref={sliderRef}>
        <Card src={jan} alt="이달 카드" />
        <Card src={feb} alt="이달 카드" />
        <Card src={mar} alt="이달 카드" />
        <Card src={apr} alt="이달 카드" />
        <Card src={may} alt="이달 카드" />
        <Card src={jun} alt="이달 카드" />
        <Card src={jul} alt="이달 카드" />
        <Card src={aug} alt="이달 카드" />
        <Card src={sep} alt="이달 카드" />
        <Card src={oct} alt="이달 카드" />
        <Card src={nov} alt="이달 카드" />
        <Card src={dec} alt="이달 카드" />
      </CardContainer>

      <SliderButtonLeft onClick={onLeftBtnClicked}>
        <img src={arrowIcon} alt="버튼 아이콘" />
      </SliderButtonLeft>
      <SliderButtonRight onClick={onRightBtnClicked}>
        <img src={arrowIcon} alt="버튼 아이콘" />
      </SliderButtonRight>
    </SliderDiv>
  );
}

export default CardSlider;

const SliderDiv = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 190px;
  overflow: hidden;
`;

const CardContainer = styled.div`
  padding: 0 25px;
  height: 100%;
  display: flex;
  transition: transform 0.4s ease-in-out;
`;

const Card = styled.img`
  flex-shrink: 0;
  margin: 0 5px;
  object-fit: cover;
  object-position: center;
  width: 280px;
  height: 100%;
  border-radius: 10px;
`;

const SliderButtonLeft = styled.button`
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  width: 13px;
  transition: scale 0.1s ease-in;

  &:hover {
    scale: 1.05;
  }
`;

const SliderButtonRight = styled.button`
  position: absolute;
  top: 50%;
  right: 40px;
  transform: translateY(-50%) rotate(180deg);
  width: 13px;
  transition: scale 0.1s ease-in;

  &:hover {
    scale: 1.05;
  }
`;
