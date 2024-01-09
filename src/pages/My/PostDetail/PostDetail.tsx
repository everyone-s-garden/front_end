import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useMatch, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Container as MapDiv, Marker, NaverMap } from 'react-naver-maps';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRecoilState, useRecoilValue } from 'recoil';

import { BREAK_POINT, COLOR } from '../../../constants/style';
import { isReportOpenAtom, memberIdAtom, reportPostIdAtom } from '../../../recoil/atom';
import ImageSlider from '../../../components/ImageSlider';
import { ReactComponent as BackIcon } from 'assets/back-icon.svg';
import { ReactComponent as MenuIcon } from 'assets/three-dot-icon.svg';
import * as animationData from 'assets/like-animation.json';
import customAxios from '../../../utils/token';
import { AxiosResponse } from 'axios';
import { IGardenDetail } from '../../../types/GardenDetail';
import Heart from 'assets/like_heart.svg';
import filterGardenData from '../../../utils/filterGardenData';
import ContactGardenModal from '../../../components/Modal/ContactGardenModal';
import { getItem } from 'utils/session';
import { Helmet } from 'react-helmet-async';

type PostDetailProps = {
  navermaps: typeof naver.maps;
};

function PostDetail() {
  const { postId } = useParams();
  const { navermaps } = useOutletContext<PostDetailProps>();
  const memberId = useRecoilValue(memberIdAtom);
  const nav = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [_, setIsModalOpen] = useRecoilState(isReportOpenAtom);
  const [__, setReportPostId] = useRecoilState(reportPostIdAtom);
  const animationRef = useRef<Player>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [post, setPost] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const userId = Number(getItem('userId'));
  const location = { lat: 37.3595704, long: 127.105399 };
  const fetchGardenData = async () => {
    if (!postId) return;
    const res = await customAxios.get(`v2/gardens/${postId}`);
    setPost(res.data);
    setImages(res.data.images);
  };
  const play = async () => {
    if (!post?.isLiked) {
      try {
        const res: IGardenDetail = await customAxios.post(`v2/gardens/likes`, { gardenId: postId });
        animationRef.current?.play();
        setTimeout(() => {
          fetchGardenData();
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res: IGardenDetail = await customAxios.delete(`v2/gardens/likes`, { data: { gardenId: postId } });
        fetchGardenData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchGardenData();
  }, [postId]); // postId가 변경될 때마다 데이터를 가져오도록 설정
  useEffect(() => {
    if (post && map) {
      // post와 map이 모두 존재할 때만 실행
      const { latitude, longitude } = post;
      const center = new navermaps.LatLng(latitude, longitude);
      map.setCenter(center);
    }
  }, [post, map]);
  const deletePost = async () => {
    try {
      const res: AxiosResponse = await customAxios.delete(`v2/gardens/${post?.id}`);
      if (res.status === 204) nav('/my');
    } catch (err) {
      console.log(err);
    }
  };
  console.log(memberId, post.writerId);
  return (
    <Container>
      <Helmet>
        <title>텃밭 상세보기 페이지</title>
      </Helmet>
      <BackDiv>
        <button onClick={() => nav(-1)}>
          <BackIcon width="11" height="20" stroke="#BEC8B3" strokeWidth="2" />
        </button>
      </BackDiv>

      <MainContent>
        <SliderContainer>
          <ImageSlider images={images} />
        </SliderContainer>

        <ContentSection>
          <Title>
            {post?.gardenName}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <MenuIcon width="3" height="18" fill="#505462" />
            </button>
            <MenuDropdown isOpen={isMenuOpen}>
              <DropDownBtn
                onClick={() => {
                  setIsModalOpen(true);
                  setReportPostId(Number(postId));
                }}
              >
                신고하기
              </DropDownBtn>
              {memberId === post?.writerId && <DropDownBtn onClick={deletePost}>삭제하기</DropDownBtn>}
              {memberId === post?.writerId && (
                <DropDownBtn onClick={() => nav(`/my/post/edit/${postId}`)}>수정하기</DropDownBtn>
              )}
            </MenuDropdown>
          </Title>
          <Price>{filterGardenData.filterPrice(post?.price!)}</Price>
          <Size>{filterGardenData.filterSize(post?.size!)}</Size>

          <Facility>
            <h4>부대시설</h4>
            {post?.gardenFacility?.isToilet && <span>화장실</span>}
            {post?.gardenFacility?.isWaterway && <span>수로</span>}
            {post?.gardenFacility?.isEquipment && <span>농기구</span>}
          </Facility>
          <Contact>
            <h4>연락처</h4>
            {post?.contact}
          </Contact>

          <Content>
            {post?.gardenDescription === null || post?.gardenDescription === undefined
              ? '상세 설명이 없습니다.'
              : post.gardenDescription}
          </Content>

          <Location>
            <h4>위치</h4>

            <MapDiv
              style={{
                width: '100%',
                height: '100%',
                aspectRatio: '2 / 1',
                overflow: 'hidden',
              }}
            >
              <NaverMap
                ref={setMap}
                defaultCenter={new navermaps.LatLng(post?.latitude || location.lat, post?.longitude || location.long)}
                defaultZoom={14}
                mapDataControl={false}
                scaleControl={false}
              >
                <Marker
                  position={new navermaps.LatLng(post?.latitude || location.lat, post?.longitude || location.long)}
                  icon={{
                    content: `<div class="marker">
                        <svg width="33" height="55" viewBox="0 0 33 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M32.5 17.5455C32.5 21.1141 31.4904 25.2181 29.9527 29.3895C28.4172 33.5551 26.3667 37.7569 24.3114 41.5124C22.2567 45.2667 20.2013 48.5672 18.6594 50.9293C17.8887 52.1101 17.2466 53.0558 16.7976 53.7058C16.6862 53.8671 16.5866 54.0102 16.5 54.1341C16.4134 54.0102 16.3138 53.8671 16.2024 53.7058C15.7534 53.0558 15.1114 52.1101 14.3406 50.9293C12.7987 48.5672 10.7433 45.2667 8.68861 41.5124C6.63325 37.7569 4.58282 33.5551 3.04727 29.3895C1.50957 25.2181 0.5 21.1141 0.5 17.5455C0.5 8.57047 7.69829 0.5 16.5 0.5C25.3017 0.5 32.5 8.57047 32.5 17.5455Z" fill="#9ACD79" stroke="#DDE9C8"/>
                          <path d="M16.1144 16.9607C18.4617 16.9607 20.3646 15.0374 20.3646 12.6649C20.3646 10.2924 18.4617 8.36914 16.1144 8.36914C13.7671 8.36914 11.8643 10.2924 11.8643 12.6649C11.8643 15.0374 13.7671 16.9607 16.1144 16.9607Z" fill="#DDE9C8"/>
                          <path d="M14.1507 18.4033C16.8988 21.1809 16.2843 26.3048 16.2843 26.3048C16.2843 26.3048 11.2148 26.9259 8.46671 24.1483C5.71861 21.3707 6.33309 16.2468 6.33309 16.2468C6.33309 16.2468 11.4026 15.6257 14.1507 18.4033Z" fill="#DDE9C8"/>
                          <path d="M17.9853 18.4033C15.2372 21.1809 15.8516 26.3048 15.8516 26.3048C15.8516 26.3048 20.9211 26.9259 23.6692 24.1483C26.4173 21.3707 25.8028 16.2468 25.8028 16.2468C25.8028 16.2468 20.7334 15.6257 17.9853 18.4033Z" fill="#DDE9C8"/>
                          <path d="M19.3746 12.695L16.0957 9.38086L12.8168 12.695L16.0957 16.0091L19.3746 12.695Z" fill="#9ACD79"/>
                        </svg>
                      </div>`,
                    origin: new naver.maps.Point(0, 38),
                    anchor: new naver.maps.Point(11, 38),
                  }}
                />
              </NaverMap>
            </MapDiv>

            <span>{post?.address}</span>
          </Location>

          <Buttons>
            <ZzimBtn onClick={play}>
              {post?.isLiked ? (
                <HeartImg src={Heart} />
              ) : (
                <Player
                  ref={animationRef}
                  autoplay={false}
                  loop={false}
                  keepLastFrame={true}
                  src={animationData}
                  style={{ width: 34, marginRight: 6, marginBottom: 7 }}
                />
              )}
              찜하기
            </ZzimBtn>
            <ApplyBtn onClick={() => setIsContactModalOpen(true)}>신청하기</ApplyBtn>
          </Buttons>
        </ContentSection>
      </MainContent>

      <ContactGardenModal isOpen={isContactModalOpen} setIsOpen={setIsContactModalOpen} contact={post?.contact} />
    </Container>
  );
}

export default PostDetail;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
    margin: 0 auto;
  }
`;

const BackDiv = styled.div`
  margin-bottom: 20px;
  width: 100%;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const MainContent = styled.div`
  width: 100%;
  display: flex;

  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    flex-direction: column;
    align-items: center;
  }
`;

const SliderContainer = styled.div`
  flex-grow: 1;
  max-height: 300px;

  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    width: 100%;
  }
`;

const ContentSection = styled.section`
  flex-shrink: 0;
  margin-bottom: 40px;
  margin-left: 40px;
  width: 350px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    margin: 0;
    margin-bottom: 40px;
    margin-top: 20px;
    width: 100%;
  }
`;

const Title = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #afafaf;
  font-size: 18px;
  font-weight: 400;
`;

const MenuDropdown = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: absolute;
  top: 26px;
  right: 0;
  width: 135px;
  border: 1px solid #d9d9d9;
  background-color: ${COLOR.BACKGROUND};
  transition: all 0.1s ease-in;
  overflow: hidden;
`;

const DropDownBtn = styled.button`
  width: 100%;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a9b6a9;
  font-size: 16px;
  font-weight: 400;
`;

const Price = styled.h2`
  margin-top: 4px;
  font-size: 23px;
  font-weight: 500;
`;

const Size = styled.h4`
  margin-top: 6px;
  padding-bottom: 17px;
  font-size: 18px;
  font-weight: 300;
  border-bottom: 0.5px solid #e1e1e1;
`;

const Facility = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;

  & > h4 {
    margin-right: 27px;
    font-size: 17px;
    font-weight: 400;
  }

  & > span {
    margin-right: 10px;
    padding: 7px 15px;
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 400;
    color: #414c38;
    border-radius: 16px;
    border: 1px solid #414c38;
  }
`;

const Contact = styled.div`
  margin-top: 30px;
  padding-bottom: 30px;
  display: flex;
  align-items: center;
  font-size: 17px;
  font-weight: 400;
  border-bottom: 0.5px solid #e1e1e1;

  & > h4 {
    margin-right: 46px;
    font-size: 17px;
    font-weight: 400;
  }
`;

const Content = styled.div`
  margin-top: 26px;
  padding-bottom: 50px;
  font-size: 17px;
  font-weight: 400;
  border-bottom: 0.5px solid #e1e1e1;
`;

const Location = styled.div`
  margin: 15px 0;
  width: 100%;
  display: flex;
  flex-direction: column;

  & > h4 {
    margin-bottom: 10px;
    font-size: 17px;
    font-weight: 400;
  }

  & > span {
    display: block;
    margin-top: 10px;
    align-self: flex-end;
    color: #afafaf;
    font-size: 16px;
    font-weight: 300;
  }

  .marker {
    width: 22px;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
`;

const Buttons = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 47px;
  display: flex;
  column-gap: 20px;
`;

const ZzimBtn = styled.button`
  flex-grow: 1;
  padding-right: 8px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: ${COLOR.ORNAGE};
  border: 1px solid ${COLOR.ORNAGE};
  border-radius: 6px;
  background-color: ${COLOR.BACKGROUND};
  transition: all 0.2s;
`;

const HeartImg = styled.img`
  width: 34px;
  height: 18.2px;
  margin-right: 6px;
`;
const ApplyBtn = styled.button`
  flex-grow: 2;
  height: 100%;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #86bf60;
  border-radius: 6px;
  color: ${COLOR.BACKGROUND};
  background-color: #86bf60;
  transition: all 0.2s;
`;
