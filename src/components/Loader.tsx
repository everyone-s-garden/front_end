import React from 'react';
import styled, { keyframes } from 'styled-components';

interface LoaderProps {
  isLoading: boolean;
}

function Loader({ isLoading }: LoaderProps) {
  return (
    <LoaderDiv isLoading={isLoading}>
      <Spinner />
    </LoaderDiv>
  );
}

export default Loader;

const LoaderDiv = styled.div<{ isLoading: boolean }>`
  visibility: ${props => (props.isLoading ? 'visible' : 'hidden')};
  opacity: ${props => (props.isLoading ? '1' : '0')};
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #fff;
  transition: all 0.2s ease-in;
`;

const animloader = keyframes`
  0% {
      box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0),
        24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
    }
    12% {
      box-shadow: 0 24px #2ee59d, 24px 24px rgba(255, 255, 255, 0),
        24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow: 0 24px #2ee59d, 24px 24px #2ee59d,
        24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
    }
    37% {
      box-shadow: 0 24px #2ee59d, 24px 24px #2ee59d, 24px 48px #2ee59d,
        0px 48px rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow: 0 24px #2ee59d, 24px 24px #2ee59d, 24px 48px #2ee59d,
        0px 48px #2ee59d;
    }
    62% {
      box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px #2ee59d,
        24px 48px #2ee59d, 0px 48px #2ee59d;
    }
    75% {
      box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0),
        24px 48px #2ee59d, 0px 48px #2ee59d;
    }
    87% {
      box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0),
        24px 48px rgba(255, 255, 255, 0), 0px 48px #2ee59d;
    }
    100% {
      box-shadow: 0 24px rgba(255, 255, 255, 0), 24px 24px rgba(255, 255, 255, 0),
        24px 48px rgba(255, 255, 255, 0), 0px 48px rgba(255, 255, 255, 0);
    }
  `;

const animloader2 = keyframes`
    0% {
      transform: translate(0, 0) rotateX(0) rotateY(0);
    }
    25% {
      transform: translate(100%, 0) rotateX(0) rotateY(180deg);
    }
    50% {
      transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
    }
    75% {
      transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
    }
    100% {
      transform: translate(0, 0) rotateX(0) rotateY(360deg);
    }
  `;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
  transform: rotate(45deg);

  &::before {
    content: '';
    box-sizing: border-box;
    width: 24px;
    height: 24px;
    position: absolute;
    left: 0;
    top: -24px;
    animation: ${animloader} 4s ease infinite;
  }

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    animation: ${animloader2} 2s ease infinite;
  }
`;
