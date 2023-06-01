import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';
import noImgIcon from 'assets/noImg-icon.svg';

interface Idata {
  data: { content: any; garden: IGarden; gardenId: number; gardenPostId: number; images: string[]; title: string };
}

interface IGarden {
  address: string;
  id: number;
  latitude: number;
  link: any;
  longitude: number;
  name: string;
  price: string;
  type: string;
}
function Post({ data }: Idata) {
  const nav = useNavigate();
  let price = 15000;
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
          <Dot />
          <Text>모집 중</Text>
        </Status>
        <Title>{data.title}</Title>
        <Value>{data.garden.type}</Value>
        <Value>평당 {data.garden.price}원</Value>
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
