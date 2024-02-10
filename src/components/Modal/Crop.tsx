import React, { useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowIcon } from 'assets/back-icon.svg';

interface CropProps {
  name: string;
  content: string;
  link: string;
}

function Crop({ name, content, link }: CropProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <CropContainer>
      <Header onClick={() => setIsOpen(!isOpen)}>
        {name}
        <ArrowIcon
          width="15"
          height="15"
          stroke="#505462"
          strokeWidth="3"
          style={{
            transform: `rotate(${isOpen ? '90' : '270'}deg)`,
            transition: 'transform 0.2s ease-in',
          }}
        />
      </Header>
      <ContentContainer isOpen={isOpen}>
        <Content>
          {content}
          <br />
          <br />
          <CroptLink href={link} target="_blank">
            더 알아보기
          </CroptLink>
        </Content>
      </ContentContainer>
    </CropContainer>
  );
}

export default Crop;

const CropContainer = styled.li`
  padding-top: 18px;
  padding-bottom: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e1e1e1;
`;

const Header = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const ContentContainer = styled.div<{ isOpen: boolean }>`
  opacity: ${props => (props.isOpen ? '1' : '0')};
  padding: ${props => (props.isOpen ? '11px 10px 8px 14px' : '0')};
  width: 100%;
  height: ${props => (props.isOpen ? '160px' : '0px')};
  background-color: #f1f7e8;
  border-radius: 10px;
  transition: all 0.2s ease-in;
`;

const Content = styled.p`
  padding-right: 12px;
  width: 100%;
  height: 100%;
  color: #414c38;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    /* Chrome, Safari, Opera*/
    display: block !important;
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a0aa95;
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 7px;
  }
  &::-webkit-scrollbar-track {
    width: 12px;
    background-color: #e0ebd4;
    border-radius: 7px;
  }
  &::-moz-scrollbar {
    width: 12px;
  }
  &::-moz-scrollbar-thumb {
    background-color: #a0aa95;
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 7px;
  }

  &::-moz-scrollbar-track {
    width: 12px;
    background-color: #e0ebd4;
    border-radius: 7px;
  }
`;

const CroptLink = styled.a`
  font-weight: 500;
  text-decoration: underline;
`;
