import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRecoilState } from 'recoil';

import { COLOR, FONT_WEIGHT } from 'constants/style';
import { isReportOpenAtom, selectedGardenIdAtom } from 'recoil/atom';
import ImageSlider from 'components/ImageSlider';
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';
import * as animationData from 'assets/like-animation.json';
import reportIcon from 'assets/map/report-icon.svg';
import { GardenAPI } from 'api/GardenAPI';

function GardenDetail() {
  const animationRef = useRef<Player>(null);
  const [selectedGarden, setSelectedGarden] = useRecoilState(selectedGardenIdAtom);
  const [_, setIsModalOpen] = useRecoilState(isReportOpenAtom);
  const [like, isLike] = useState<boolean>(false);
  const [images, setImages] = useState([
    'https://picsum.photos/id/237/800/600',
    'https://picsum.photos/id/238/800/600',
    'https://picsum.photos/id/239/800/600',
  ]);
  // const [images, setImages] = useState([]);

  let price = 16000;

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
    // console.log(fetchGardenData());
  }, []);

  return (
    <DetailDiv>
      <ImageSlider images={images} />
      <BackBtn onClick={() => setSelectedGarden(null)}>
        <BackIcon width="8" height="15" stroke="#FFFFFF" strokeWidth="2" />
      </BackBtn>

      <Body>
        <Title>양주 공동텃밭</Title>
        <Row>
          <Key>신청기간</Key> 2023. 04. 20 ~ 04. 30
        </Row>
        <Row>
          <Key>가격</Key> {price !== 0 ? `평당 ${price.toLocaleString('ko-KR')}원` : '무료'}
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
        <ReportBtn onClick={() => setIsModalOpen(true)}>
          <img src={reportIcon} />
          신고하기
        </ReportBtn>
        <ZzimBtn onClick={play}>
          <Player
            ref={animationRef}
            autoplay={false}
            loop={false}
            keepLastFrame={true}
            src={animationData}
            style={{ width: 34, marginRight: 4, marginBottom: 6, marginLeft: 14 }}
          />
          찜하기
        </ZzimBtn>
        <ApplyBtn>신청하기</ApplyBtn>
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
  padding: 20px 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  box-shadow: 0 -20px 20px 20px white;
`;

const ReportBtn = styled.button`
  position: absolute;
  top: -10px;
  right: 45px;
  width: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: #afafaf;
`;

const ZzimBtn = styled.button`
  width: 120px;
  height: 44px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: ${COLOR.ORNAGE};
  border: 1px solid ${COLOR.ORNAGE};
  border-radius: 6px;
  background-color: ${COLOR.BACKGROUND};
  transition: all 0.2s;
`;

const ApplyBtn = styled.button`
  width: 160px;
  height: 44px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #86bf60;
  border-radius: 6px;
  color: ${COLOR.BACKGROUND};
  background-color: #86bf60;
  transition: all 0.2s;
`;
