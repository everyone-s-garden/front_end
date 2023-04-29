import React from 'react';
import styled from 'styled-components';

import testImg from 'assets/garden-image1.jpg';
import { BREAK_POINT, COLOR, FONT_WEIGHT } from 'constants/style';

function GardenPost() {
  return (
    <Post>
      <Image src={testImg} alt="텃밭 이미지"></Image>

      <Info>
        <Status>
          <Dot />
          <Text>모집 중</Text>
        </Status>
        <Title>양주 공공텃밭</Title>
        <Value>8평</Value>
        <Value>평당 15,000원</Value>
      </Info>
    </Post>
  );
}

export default GardenPost;

const Post = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  width: 100%;
  height: 160px;
  min-width: 300px;
  border-right: 1px solid ${COLOR.BLACK[500]};

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    border-bottom: 1px solid ${COLOR.BLACK[500]};
  }
`;

const Image = styled.img`
  flex-shrink: 0;
  height: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 5px;
  object-fit: cover;
  object-position: center;
`;

const Info = styled.div`
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
`;

const Status = styled.div`
  margin-bottom: auto;
  padding: 6px 14px;
  width: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 8px;
  background-color: white;
`;

const Text = styled.span`
  padding-top: 2px;
  font-size: 0.8rem;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
`;

const Dot = styled.div`
  margin-right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff6a00;
  box-shadow: 0px 0px 2px 2px #ff6a00;
`;

const Title = styled.button`
  font-size: 1.2rem;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const Value = styled.span`
  font-size: 1rem;
  margin-top: 8px;
`;
