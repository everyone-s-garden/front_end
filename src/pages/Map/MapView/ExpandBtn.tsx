import React from 'react';
import styled from 'styled-components';

import arrowIcon from 'assets/arrow-icon.svg';
import { BREAK_POINT, COLOR } from 'constants/style';

interface ExpandBtnProps {
  map: naver.maps.Map | null;
  isExpand: boolean;
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExpandBtn = ({ map, isExpand, setIsExpand }: ExpandBtnProps) => {
  const onClickHandler = () => {
    setIsExpand(!isExpand);
    setTimeout(() => {
      map?.autoResize();
    }, 300);
  };

  return (
    <Button onClick={onClickHandler}>
      <ArrowIcon src={arrowIcon} alt="아이콘" isExpand={isExpand} />
    </Button>
  );
};

export default ExpandBtn;

const Button = styled.button`
  z-index: 10;
  position: absolute;
  bottom: 0px;
  right: 50%;
  transform: translate(50%, 0);
  width: 55px;
  height: 21px;
  border-radius: 5px 5px 0 0;
  border: 1px solid #afafaf;
  border-bottom: 0;
  background-color: ${COLOR.BACKGROUND};

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    top: 50%;
    right: 0px;
    transform: translate(0, -80%);
    width: 21px;
    height: 55px;
    border-radius: 5px 0 0 5px;
    border: 1px solid #afafaf;
    border-right: 0;
  }
`;

const ArrowIcon = styled.img<{ isExpand: boolean }>`
  margin-top: 4px;
  height: 15px;
  color: #afafaf;
  transform: ${props => (props.isExpand ? 'rotate(90deg)' : 'rotate(270deg)')};
  transition: all 0.3s ease-in;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    margin-bottom: 2px;
    margin-left: 4px;
    transform: ${props => (props.isExpand ? 'rotate(0deg)' : 'rotate(180deg)')};
  }
`;
