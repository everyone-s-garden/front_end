import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { IGardenDetail } from 'types/GardenDetail';

import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';
import noImgIcon from 'assets/noImg-icon.svg';

interface Idata {
  data: IGardenDetail;
}

function Post({ data }: Idata) {
  const nav = useNavigate();
  return (
    <PostContainer onClick={() => nav(`/my/${data.gardenId}`)}>
      <ImageContainer>
        {data.images.length === 0 ? (
          <EmptyImg src={noImgIcon} alt="이미지 없음" />
        ) : (
          <Image src={data.images[0]} alt="텃밭 이미지" />
        )}
      </ImageContainer>

      <InfoDiv>
        <Status>
          {data.status === 'ACTIVE' && <Dot />}
          {data.status === 'ACTIVE' && <Text>모집 중</Text>}
          {data.status === 'INACTIVE' && <Text>마감</Text>}
          {data.status === 'ALWAYS_ACTIVE' && <Text>상시</Text>}
        </Status>
        <Title>{data.name}</Title>
        <Value style={{ color: '#afafaf' }}>{data.size} 평</Value>
        <Value>평당 {Number(data.price.split(',').join('')).toLocaleString()} 원</Value>
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

const EmptyImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
`;

const Image = styled.img`
  flex-shrink: 0;
  height: 135px;
  aspect-ratio: 4 / 3;
  border-radius: 5px;
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
