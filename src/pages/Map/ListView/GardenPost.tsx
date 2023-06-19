import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { selectedGardenIdAtom } from 'recoil/atom';
import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';
import noImgIcon from 'assets/noImg-icon.svg';

interface GardenPostProps {
  id: number;
  name: string;
  size?: string;
  price: string | null;
  images: string[];
  status?: string;
}
function GardenPost({ id, name, size, price, images, status }: GardenPostProps) {
  const [_, setSelectedGarden] = useRecoilState(selectedGardenIdAtom);

  return (
    <Post>
      {images.length > 0 ? (
        <Image src={images[0]} alt="텃밭 이미지"></Image>
      ) : (
        <NoImage>
          <NoImgIcon src={noImgIcon} alt="이미지 없음" />
        </NoImage>
      )}

      <InfoDiv>
        <Status>
          {status === 'ACTIVE' && <Dot />}
          {status === 'ACTIVE' && <Text>모집 중</Text>}
          {status === 'INACTIVE' && <Text>마감</Text>}
          {status === 'ALWAYS_ACTIVE' && <Text>상시 모집</Text>}
          {status === null && <Text>상시 모집</Text>}
        </Status>
        <Title onClick={() => setSelectedGarden(id)}>{name.trim()}</Title>
        <Value>{size}</Value>
        <Value>{price}</Value>
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

const NoImage = styled.div`
  flex-shrink: 0;
  height: 100%;
  aspect-ratio: 4 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #f0fbe4;
`;

const NoImgIcon = styled.img``;

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
  text-align: start;
  font-size: 16px;
  font-weight: ${FONT_WEIGHT.BOLD};
`;

const Value = styled.span`
  font-size: 14px;
  margin-top: 7px;
`;
