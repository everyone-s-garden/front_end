import React, { PropsWithChildren } from 'react';
import Slider, { CustomArrowProps, Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { ArrowLeftIcon, ArrowRightIcon } from 'assets/community';

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

const ImageSlider = ({ children }: PropsWithChildren<{ size?: number }>) => {
  const settings: Settings = {
    dots: false,
    infinite: false,
    slidesToShow: 8,
    slidesToScroll: 1,
    prevArrow: <LeftArrow />,
    nextArrow: <RightArrow />,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container className="slider-container">
      <Slider {...settings}>{children}</Slider>
    </Container>
  );
};

export default ImageSlider;

const Container = styled.div`
  width: 100%;
  max-width: 1188px;
  margin: 0 auto;
  padding: 0 20px;

  .slick-track {
    display: flex;
    margin: 0;

    & > div {
      width: 110px;
      height: 110px;

      &:not(:last-child) {
        margin-right: 10px;
      }

      @media (${({ theme }) => theme.devices.tablet}) {
        height: 136px;
        width: 136px;
      }

      & div,
      li,
      img {
        width: 100%;
        height: 100%;
      }

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .slick-arrow {
    display: none;

    @media (${({ theme }) => theme.devices.mobile}) {
      display: block;
    }
  }

  .slick-disabled {
    display: none;
  }

  & img {
    width: 100%;
    object-fit: cover;
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    padding: 0;
  }
`;

const Arrow = styled.div`
  z-index: 1;

  & svg {
    position: absolute;
    top: -50%;
    left: -50%;
  }

  ::before {
    display: none;
  }
`;
