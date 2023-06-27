import React from 'react';
import styled from 'styled-components';

import { BREAK_POINT, COLOR } from 'constants/style';
import arrowIcon from 'assets/modal/big_arrow.svg';
import closeIcon from 'assets/modal/big_close.svg';

interface ImageMagnifModalProps {
  data: { images: string[]; index: number };
  setData: React.Dispatch<React.SetStateAction<{ images: string[]; index: number }>>;
}

function ImageMagnifModal({ data, setData }: ImageMagnifModalProps) {
  const onLeftBtnClicked = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();

    setData({ ...data, index: data.index - 1 });
  };

  const onRightBtnClicked = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();

    setData({ ...data, index: data.index + 1 });
  };

  return (
    <ModalBackground isOpen={data.images.length > 0}>
      <CloseIcon src={closeIcon} alt="close" onClick={() => setData({ images: [], index: 0 })} />

      <ArrowLeft src={arrowIcon} alt="arrow-left" onClick={e => onLeftBtnClicked(e)} />
      <ArrowRight src={arrowIcon} alt="arrow-right" onClick={e => onRightBtnClicked(e)} />

      <ModalContainer
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {data.images.length > 0 && <img src={data.images[data.index % data.images.length]} />}
      </ModalContainer>
    </ModalBackground>
  );
}

export default ImageMagnifModal;

const ModalBackground = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 1);
  transition: all 0.2s ease-in;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 40px;
  right: 20px;
  width: 20px;
  height: 20px;
  cursor: pointer;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 30px;
    height: 30px;
  }
`;

const ArrowLeft = styled.img`
  position: absolute;
  left: 20px;
  top: 50%;
  width: 14px;
  height: 24px;
  transform: translate(0, -50%);
  cursor: pointer;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 23px;
    height: 44px;
  }
`;

const ArrowRight = styled.img`
  position: absolute;
  right: 20px;
  top: 50%;
  width: 14px;
  height: 24px;
  transform: translate(0, -50%) rotate(180deg);
  cursor: pointer;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 23px;
    height: 44px;
  }
`;

const ModalContainer = styled.div`
  margin: auto;
  width: 100%;
  height: 80%;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 60%;
    height: 100%;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;
