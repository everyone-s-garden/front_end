import React from 'react';
import styled from 'styled-components';

import ImageSlider from './ImageSlider';
import { COLOR, FONT_WEIGHT } from 'constants/style';

function GardenDetail() {
  return (
    <DetailDiv>
      <ImageSlider />

      <Body>
        <Title>양주 공동텃밭</Title>
        <Row>
          <Key>신청기간</Key> 2023. 04. 20 ~ 04. 30
        </Row>
        <Row>
          <Key>가격</Key> 1구획 당 16,000원
        </Row>
        <Row>
          <Key>면적</Key> 16.5㎡(9평)
        </Row>
        <Row>
          <Key>부대시설</Key>
          <Label>화장실</Label>
          <Label>수로</Label>
          <Label>농기구</Label>
        </Row>
        <Row>
          <Key>세부사항</Key> 양주시 주민들을 대상으로 하는 텃밭 보급 사업입니다.
        </Row>
        <Row>
          <Key>위치</Key> 경기도 양주시 장흥면 일영로502번길 108-33
        </Row>
      </Body>

      <Buttons>
        <ZzimButton>찜하기</ZzimButton>
        <ApplyButton>신청하기</ApplyButton>
      </Buttons>
    </DetailDiv>
  );
}

export default GardenDetail;

const DetailDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 1.3rem;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
`;

const Row = styled.div`
  margin-bottom: 40px;
  display: flex;
  align-items: flex-start;
  font-size: 1.1rem;
`;

const Key = styled.span`
  flex-shrink: 0;
  width: 80px;
  font-size: 1.1rem;
  font-weight: ${FONT_WEIGHT.MEDIUM};
`;

const Label = styled.button`
  margin-right: 10px;
  padding: 6px 14px;
  flex-shrink: 0;
  font-size: 1.1rem;
  color: ${COLOR.BLACK[400]};
  border-radius: 10px;
  border: 1px solid ${COLOR.BLACK[400]};
  transition: all 0.2s;

  &:hover {
    color: ${COLOR.BLACK[800]};
    border: 1px solid ${COLOR.BLACK[800]};
  }
`;

const Buttons = styled.div`
  margin-top: auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  column-gap: 20px;
  width: 100%;
  box-shadow: 0 -20px 20px 20px white;
`;

const ZzimButton = styled.button`
  width: 120px;
  height: 48px;
  font-size: 1.1rem;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  color: ${COLOR.GREEN[500]};
  border: 1px solid ${COLOR.GREEN[500]};
  border-radius: 15px;
  background-color: ${COLOR.BACKGROUND};
  transition: all 0.2s;

  &:hover {
    color: ${COLOR.BACKGROUND};
    background-color: ${COLOR.GREEN[500]};
  }
`;

const ApplyButton = styled.button`
  width: 160px;
  height: 48px;
  font-size: 1.1rem;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  border: 1px solid ${COLOR.GREEN[500]};
  border-radius: 15px;
  color: ${COLOR.BACKGROUND};
  background-color: ${COLOR.GREEN[500]};
  transition: all 0.2s;

  &:hover {
    color: ${COLOR.GREEN[500]};
    background-color: ${COLOR.BACKGROUND};
  }
`;
