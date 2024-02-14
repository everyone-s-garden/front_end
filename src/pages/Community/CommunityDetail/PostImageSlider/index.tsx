import React from 'react';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/community';

interface PostImageSliderProps {
  images: string[];
}

const LeftArrow = ({ className, onClick }: CustomArrowProps) => {
  return (
    <Arrow className={className} onClick={onClick}>
      <ArrowLeftIcon />
    </Arrow>
  );
};

const RightArrow = ({ className, onClick }: CustomArrowProps) => {
  return (
    <Arrow className={className} onClick={onClick}>
      <ArrowRightIcon />
    </Arrow>
  );
};

const PostImageSlider = ({ images }: PostImageSliderProps) => {
  const settings: Settings = {
    dots: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <LeftArrow />,
    nextArrow: <RightArrow />,
    swipeToSlide: true,
  };

  return (
    <Container className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => {
          return <Image key={index} src={image} alt="속닥속닥 게시글 이미지" />;
        })}
      </Slider>
    </Container>
  );
};

export default PostImageSlider;

const Container = styled.section`
  height: 372px;

  & * {
    height: 100%;
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    height: 479px;
    max-width: 1194px;
    width: 100%;
    margin-inline: auto;
    padding-inline: 100px;
  }
`;

const Image = styled.img`
  object-fit: cover;
`;

const Arrow = styled.div`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &.slick-prev {
    left: 20px;

    @media (${({ theme }) => theme.devices.mobile}) {
      left: 58px;
    }
  }

  &.slick-next {
    right: 20px;

    @media (${({ theme }) => theme.devices.mobile}) {
      right: 58px;
    }
  }

  &.slick-disabled {
    display: none;
  }

  & svg {
    /* position: absolute; */
    /* top: -50%;
    left: -50%; */
    flex-shrink: 0;
    width: 30px;
    height: 30px;

    @media (${({ theme }) => theme.devices.mobile}) {
      width: 36px;
      height: 36px;
    }
  }

  ::before {
    display: none;
  }
`;
