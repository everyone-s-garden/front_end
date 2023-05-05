import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import arrowIcon from 'assets/image-arrow-icon.svg';
import { COLOR } from 'constants/style';

function ImageSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState([
    'https://picsum.photos/id/237/800/600',
    'https://picsum.photos/id/238/800/600',
    'https://picsum.photos/id/239/800/600',
  ]);
  const [index, setIndex] = useState<number>(0);

  const onLeftBtnClicked = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const onRightBtnClicked = () => {
    if (index >= images.length - 1) return;
    setIndex(index + 1);
  };

  useEffect(() => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transform = `translateX(-${index}00%)`;
  }, [index]);

  return (
    <SliderDiv>
      <ImageContainer ref={sliderRef}>
        {images.map((img, idx) => (
          <Image key={idx} src={img} alt="텃밭 이미지" />
        ))}
      </ImageContainer>

      <SliderButtonLeft onClick={onLeftBtnClicked}>
        <img src={arrowIcon} alt="버튼 아이콘" style={{ transform: 'rotate(180deg)' }} />
      </SliderButtonLeft>
      <SliderButtonRight onClick={onRightBtnClicked}>
        <img src={arrowIcon} alt="버튼 아이콘" />
      </SliderButtonRight>

      <Dots>
        {images.map((_, idx) => (
          <Dot key={idx} active={idx === index} />
        ))}
      </Dots>
    </SliderDiv>
  );
}

export default ImageSlider;

const SliderDiv = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 100%;
  transition: transform 0.4s ease-in-out;
`;

const Image = styled.img`
  flex-shrink: 0;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
`;

const SliderButtonLeft = styled.button`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  transition: scale 0.1s ease-in;

  &:hover {
    scale: 1.1;
  }
`;

const SliderButtonRight = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  transition: scale 0.1s ease-in;

  &:hover {
    scale: 1.1;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  right: 50%;
  transform: translateX(50%);
  display: flex;
`;

const Dot = styled.span<{ active: boolean }>`
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${COLOR.BACKGROUND};
  opacity: ${props => (props.active ? 1 : 0.5)};
  transition: all 0.4s ease-in;
`;
