import React from 'react';
import styled from 'styled-components';

import testImg from 'assets/garden-image1.jpg';
import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';

interface GardenPostProps {
  setSelectedGarden: React.Dispatch<React.SetStateAction<boolean>>;
}
function GardenPost({ setSelectedGarden }: GardenPostProps) {
  return (
    <Post>
      <Image src={testImg} alt="텃밭 이미지"></Image>

      <InfoDiv>
        <Status>
          <Dot />
          <Text>모집 중</Text>
        </Status>
        <Title onClick={() => setSelectedGarden(true)}>양주 공공텃밭</Title>
        <Value>8평</Value>
        <Value>평당 15,000원</Value>
      </InfoDiv>
    </Post>
  );
}

export default GardenPost;

const Post = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  width: 100%;
  height: 170px;
  min-width: 300px;
  border-bottom: 1px solid #afafaf;

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    border-right: 1px solid #afafaf;
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

const InfoDiv = styled.div`
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
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

const Title = styled.button`
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const Value = styled.span`
  font-size: 14px;
  margin-top: 7px;
`;
