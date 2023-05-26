import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRecoilState } from 'recoil';

import { selectedGardenIdAtom } from 'recoil/atom';
import { COLOR, FONT_WEIGHT } from 'constants/style';
import ImageSlider from './ImageSlider';
import arrowIcon from 'assets/back-icon.svg';
import * as animationData from 'assets/like-animation.json';
import { GardenAPI } from 'api/GardenAPI';

function GardenDetail() {
  const animationRef = useRef<Player>(null);
  const [like, isLike] = useState<boolean>(false);
  const [selectedGarden, setSelectedGarden] = useRecoilState(selectedGardenIdAtom);

  const fetchGardenData = async () => {
    if (!selectedGarden) return;
    return await GardenAPI.getGardenDetail(selectedGarden);
  };

  const play = () => {
    isLike(!like);
    if (!like) animationRef.current?.play();
    else animationRef.current?.setSeeker(0);
  };

  useEffect(() => {
    console.log(fetchGardenData());
  }, []);

  return (
    <DetailDiv>
      <ImageSlider />
      <BackBtn onClick={() => setSelectedGarden(null)}>
        <img src={arrowIcon} alt="뒤로가기"></img>
      </BackBtn>

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
        <ZzimButton onClick={play}>
          <Player
            ref={animationRef}
            autoplay={false}
            loop={false}
            keepLastFrame={true}
            src={animationData}
            style={{ width: 50, height: 50 }}
          />
          찜하기
        </ZzimButton>
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
  overflow: hidden;
`;

const BackBtn = styled.button`
  position: absolute;
  top: 30px;
  left: 20px;
  height: 15px;
`;

const Body = styled.div`
  margin: 25px 0;
  padding: 0 36px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const Title = styled.h1`
  margin-bottom: 25px;
  font-size: 20px;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const Row = styled.div`
  margin-bottom: 21px;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
`;

const Key = styled.span`
  flex-shrink: 0;
  width: 90px;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
`;

const Label = styled.button`
  margin-right: 10px;
  padding: 0 12px;
  height: 26px;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
  color: #afafaf;
  border-radius: 13px;
  border: 1px solid #afafaf;
  transition: all 0.2s;

  &:hover {
    color: ${COLOR.BLACK};
    border: 1px solid ${COLOR.BLACK};
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
  height: 44px;
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  color: ${COLOR.ORNAGE};
  border: 1px solid ${COLOR.ORNAGE};
  border-radius: 15px;
  background-color: ${COLOR.BACKGROUND};
  transition: all 0.2s;

  /* &:hover {
    color: ${COLOR.BACKGROUND};
    background-color: ${COLOR.GREEN};
  } */
`;

const ApplyButton = styled.button`
  width: 160px;
  height: 44px;
  font-size: 1.1rem;
  font-weight: ${FONT_WEIGHT.SEMIBOLD};
  border: 1px solid #86bf60;
  border-radius: 15px;
  color: ${COLOR.BACKGROUND};
  background-color: #86bf60;
  transition: all 0.2s;

  /* &:hover {
    color: ${COLOR.GREEN};
    background-color: ${COLOR.BACKGROUND};
  } */
`;
