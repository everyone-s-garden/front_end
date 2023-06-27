import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { COLOR, FONT_WEIGHT } from 'constants/style';
import { NotiContentAtom, isReportOpenAtom, reportPostIdAtom, selectedGardenIdAtom } from 'recoil/atom';
import ImageSlider from 'components/ImageSlider';
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';
import * as animationData from 'assets/like-animation.json';
import reportIcon from 'assets/map/report-icon.svg';
import { GardenAPI } from 'api/GardenAPI';
import { GardenDetailType } from 'api/type';
import ContactGardenModal from 'components/Modal/ContactGardenModal';
import Heart from 'assets/like_heart.svg';
import customAxios from 'utils/token';
import filterGardenData from 'utils/filterGardenData';
import { getItem } from 'utils/session';

function GardenDetail() {
  const animationRef = useRef<Player>(null);
  const [selectedGarden, setSelectedGarden] = useRecoilState(selectedGardenIdAtom);
  const setIsModalOpen = useSetRecoilState(isReportOpenAtom);
  const setReportPostId = useSetRecoilState(reportPostIdAtom);
  const setContent = useSetRecoilState(NotiContentAtom);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [postData, setPostData] = useState<GardenDetailType | null>(null);

  useEffect(() => {
    setIsLogin(Boolean(getItem('isLogin')));
  }, [isLogin, setIsLogin]);

  const fetchGardenData = async () => {
    if (!selectedGarden) return;
    const { data } = await GardenAPI.getGardenDetail(selectedGarden);
    setPostData(data);
  };
  const onLikeClicked = async () => {
    if (!isLogin) {
      setContent('로그인이 필요한 서비스입니다!');
      return;
    }

    if (!postData?.liked) {
      try {
        const res: GardenDetailType = await customAxios.post(`v1/garden/like/${postData?.id}`);
        animationRef.current?.play();
        setTimeout(() => {
          fetchGardenData();
        }, 2000);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res: GardenDetailType = await customAxios.delete(`v1/garden/like/${postData?.id}`);
        fetchGardenData(); // 찜하기 취소 후 바로 데이터 업데이트
      } catch (err) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    fetchGardenData();
  }, [selectedGarden]);
  return (
    <DetailDiv>
      <DetailContainer>
        <BackBtn onClick={() => setSelectedGarden(null)}>
          <BackIcon width="8" height="15" stroke="#FFFFFF" strokeWidth="2" />
        </BackBtn>
        <ImageSlider images={postData?.images} />
        <Body>
          <Title>{postData?.name}</Title>
          <Row>
            <Key>신청기간</Key>
            {!postData?.recruitStartDate || !postData?.recruitEndDate
              ? '무제한'
              : `${postData?.recruitStartDate}  ~ ${postData?.recruitEndDate}`}
          </Row>
          <Row>
            <Key>가격</Key>
            {filterGardenData.filterPrice(postData?.price!)}
          </Row>
          <Row>
            <Key>면적</Key> {filterGardenData.filterSize(postData?.size!)}
          </Row>
          <Row>
            <Key>부대시설</Key>
            {postData?.facility.toilet && <Label>화장실</Label>}
            {postData?.facility.waterway && <Label>수로</Label>}
            {postData?.facility.equipment && <Label>농기구</Label>}
            {!postData?.facility.toilet && !postData?.facility.waterway && !postData?.facility.equipment && '없음'}
          </Row>
          <Row>
            <Key>세부사항</Key> {postData?.content ? postData?.content : '없음'}
          </Row>
          <Row>
            <Key>위치</Key> {postData?.address}
          </Row>
        </Body>
      </DetailContainer>

      <Buttons>
        <ReportBtn
          onClick={() => {
            if (!isLogin) {
              setContent('로그인이 필요한 서비스입니다!');
              return;
            }

            setIsModalOpen(true);
            setReportPostId(Number(postData?.id));
          }}
        >
          <img src={reportIcon} />
          신고하기
        </ReportBtn>
<<<<<<< HEAD
        <ZzimBtn onClick={onLikeClicked}>
=======
        <ZzimBtn onClick={play}>
>>>>>>> bc55b76 (Feat: play 함수 error (#8))
          {postData?.liked ? (
            <HeartImg src={Heart} />
          ) : (
            <Player
              ref={animationRef}
              autoplay={false}
              loop={false}
              keepLastFrame={true}
              src={animationData}
              style={{ width: 34, marginRight: 4, marginBottom: 6, marginLeft: 14 }}
            />
          )}
          찜하기
        </ZzimBtn>
        <ApplyBtn onClick={() => setIsContactModalOpen(true)}>신청하기</ApplyBtn>
      </Buttons>

      <ContactGardenModal isOpen={isContactModalOpen} setIsOpen={setIsContactModalOpen} contact={postData?.contact} />
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

const DetailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const BackBtn = styled.button`
  z-index: 100;
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
const HeartImg = styled.img`
  width: 34px;
  height: 18.2px;
  margin-right: 3px;
  margin-left: 15px;
`;
