import React from 'react';
import styled from 'styled-components';

interface MyLocationBtnProps {
  onClick?: () => Promise<void>;
}

const MyLocationBtn = ({ onClick }: MyLocationBtnProps) => {
  return (
    <ControlDiv>
      <Button onClick={onClick}>
        <svg viewBox="2 2 20 20" fill="currentColor" height="60%" width="60%">
          <path d="M16 12 A4 4 0 0 1 12 16 A4 4 0 0 1 8 12 A4 4 0 0 1 16 12 z" />
          <path d="M13 4.069V2h-2v2.069A8.01 8.01 0 004.069 11H2v2h2.069A8.008 8.008 0 0011 19.931V22h2v-2.069A8.007 8.007 0 0019.931 13H22v-2h-2.069A8.008 8.008 0 0013 4.069zM12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
        </svg>
      </Button>
    </ControlDiv>
  );
};

export default MyLocationBtn;

const ControlDiv = styled.div`
  z-index: 10;
  position: absolute;
  top: 80px;
  left: 10px;
  width: 30px;
  height: 30px;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #000;
  background-color: #fff;
  border: 1px solid #000;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px 0px;
  cursor: pointer;
`;
