import React from 'react';
import styled from 'styled-components';

import testImg from 'assets/garden-image1.jpg';
import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';

function Post() {
  return (
    <PostContainer>
      <Image src={testImg} alt="텃밭 이미지"></Image>

      <InfoDiv>
        <Status>
          <Dot />
          <Text>모집 중</Text>
        </Status>
        <Title>양주 공공텃밭보다 길면 어떻게</Title>
        <Value>8평</Value>
        <Value>평당 15,000원</Value>
      </InfoDiv>
    </PostContainer>
  );
}

export default Post;

const PostContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  min-width: 0;
  cursor: pointer;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    &:nth-child(3) {
      display: none;
    }
  }

  @media (min-width: ${BREAK_POINT.LABTOP}) {
    &:nth-child(3) {
      display: flex;
    }
  }
`;

const Image = styled.img`
  flex-shrink: 0;
  height: 135px;
  aspect-ratio: 4 / 3;
  border-radius: 5px;
  object-fit: cover;
  object-position: center;
`;

const InfoDiv = styled.div`
  flex-grow: 1;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  min-width: 100px;
`;

const Status = styled.div`
  margin-bottom: auto;
  padding: 6px 10px;
  width: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid #afafaf;
  border-radius: 8px;
  background-color: white;
`;

const Text = styled.span`
  font-size: 12px;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const Dot = styled.div`
  margin-right: 5px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: #ff6a00;
  box-shadow: 0px 0px 2.16px 1.08px #ff6a00;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: ${FONT_WEIGHT.BOLD};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Value = styled.span`
  font-size: 1rem;
  margin-top: 6px;
`;
