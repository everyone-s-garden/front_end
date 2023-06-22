import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IGardenDetail } from 'types/GardenDetail';

import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';
import noImgIcon from 'assets/noImg-icon.svg';
import filterGardenData from 'utils/filterGardenData';
import { getItem } from 'utils/session';
import empty1 from 'assets/empty_img1.jpg';
import empty2 from 'assets/empty_img2.jpg';
import empty3 from 'assets/empty_img3.jpg';
interface Idata {
  data: IGardenDetail;
}

function Post({ data }: Idata) {
  const nav = useNavigate();
  const images = [empty1, empty2, empty3];

  const [randomImage, setRandomImage] = useState('');
  useEffect(() => {
    const randomImageIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomImageIndex];
    setRandomImage(randomImage);
  }, []);
  return (
    <PostContainer onClick={() => nav(`/my/${data.id}`)}>
      <ImageContainer>
        {data.images.length === 0 ? (
          <EmptyImg>
            <Image src={randomImage} alt="이미지 없음" />
          </EmptyImg>
        ) : (
          <Image src={data.images[0]} alt="텃밭 이미지" />
        )}
      </ImageContainer>

      <InfoDiv>
        <Status>
          {data.status === 'ACTIVE' && <Dot />}
          {data.status === 'ACTIVE' && <Text>모집 중</Text>}
          {data.status === 'INACTIVE' && <Text>마감</Text>}
          {data.status === 'ALWAYS_ACTIVE' && <Text>상시 모집</Text>}
          {data.status === null && <Text>상시 모집</Text>}
        </Status>
        <Title>{data.name}</Title>
        <Value style={{ color: '#afafaf' }}>{filterGardenData.filterSize(data.size)}</Value>
        <Value>{filterGardenData.filterPrice(data.price)}</Value>
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

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  background-color: #f0fbe4;
  transition: transform 0.4s ease-in-out;
`;

const EmptyImg = styled.div`
  background: #f0fbe4;
  border-radius: 8px;
  width: 174px;
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  object-fit: cover;
  object-position: center;
  @media screen {
    width: 174px;
  }
`;

const InfoDiv = styled.div`
  flex-grow: 1;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  min-width: 100px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 161px !important;
  }
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
