import React, { useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from '../../../constants/style';
const CommunityCreate = () => {
  return (
    <Container>
      <Header>
        <HeaderItemBox>
          <div>{'그림'}</div>
          <Line />
          <div>{'본문'}</div>
          <Line />
          <Bold>B</Bold>
          <Line />
          <Italic>I</Italic>
          <Line />
          <Underline>U</Underline>
          <Line />
          <div>{'컬러'}</div>
          <Line />
          <div>{'정렬'}</div>
        </HeaderItemBox>
      </Header>
      <Body></Body>
    </Container>
  );
};

export default CommunityCreate;

const Container = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 20px;
    padding: 0 19px;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
`;

const HeaderItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 524px;
  height: 24px;
  border-top: 1px solid #d3d3d3;
  border-bottom: 1px solid #d3d3d3;
`;

const Bold = styled.span`
  font-weight: 700;
  cursor: pointer;
`;

const Italic = styled.span`
  font-style: italic;
  cursor: pointer;
`;

const Underline = styled.span`
  text-decoration-line: underline;
  cursor: pointer;
`;

const Line = styled.div`
  width: 1px;
  height: 20px;
  background: #d9d9d9;
`;

const Body = styled.div``;
