import React from 'react';
import styled, { keyframes } from 'styled-components';

interface MiniLoaderProps {
  isLoading: boolean;
  scale?: number;
}

function MiniLoader({ isLoading, scale = 1 }: MiniLoaderProps) {
  return (
    <MiniLoaderDiv isLoading={isLoading} scale={scale}>
      <Dot1></Dot1>
      <Dot2></Dot2>
      <Dot></Dot>
    </MiniLoaderDiv>
  );
}

export default MiniLoader;

const MiniLoaderDiv = styled.div<{ isLoading: boolean; scale: number }>`
  visibility: ${props => (props.isLoading ? 'visible' : 'hidden')};
  opacity: ${props => (props.isLoading ? '1' : '0')};
  z-index: 500;
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, 0%) scale(${props => props.scale});
  transform-origin: center;
  padding: 10px 12px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  transition: all 1s ease-in;
`;

const bounce_delay = keyframes`
    0%,
    100% {
      transform: translateY(-40%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
`;

const Dot = styled.div`
  margin: 2px;
  width: 10px;
  height: 10px;
  background-color: #2ee59d;
  border-radius: 100%;
  display: inline-block;
  animation: ${bounce_delay} 1s infinite;
`;

const Dot1 = styled(Dot)`
  animation-delay: -0.32s;
`;

const Dot2 = styled(Dot)`
  animation-delay: -0.16s;
`;
