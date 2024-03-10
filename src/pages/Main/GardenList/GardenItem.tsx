import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconHeart } from '../../../assets/main/heart-icon.svg';
import { GardenPost } from 'types/Garden';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from 'recoil/atom';
import { useLikeGarden, useUnLikeGarden } from 'api/GardenAPI';
import { useNavigate } from 'react-router-dom';

const GardenItem = ({ gardenPost }: { gardenPost: GardenPost }) => {
  const {
    address,
    gardenName,
    imageUrl,
    isLiked,
    price,
    recruitEndDate,
    recruitStartDate,
    gardenId,
    latitude,
    longitude,
  } = gardenPost;
  const navigate = useNavigate();
  const { mutate: likeGarden } = useLikeGarden();
  const { mutate: unLikeGarden } = useUnLikeGarden();
  const isLogin = useRecoilValue(isLoginAtom);

  const endDate = new Date(recruitEndDate);
  const currentDate = new Date();

  const term = Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  const handleLikeBtnClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (!isLogin) {
      alert('로그인 후 이용해주세요');
      return;
    }

    if (isLiked) {
      unLikeGarden(gardenId);
    } else {
      likeGarden(gardenId);
    }
  };

  const handlePostClick = () => {
    navigate('/map', { state: { latitude, longitude, gardenId } });
  };

  return (
    <Container onClick={handlePostClick}>
      <ImageWrapper>
        <Img src={imageUrl} />
        <StyledIconHeart isLiked={isLiked} onClick={handleLikeBtnClick} />
      </ImageWrapper>
      <InfoWrapper>
        <Info>
          <Name>{gardenName}</Name>
          <Address>{address.split(' ').slice(0, 2).join(' ')}</Address>
        </Info>
        <Price>{price}</Price>
        <Term>{term > 0 ? `${term}일 남음` : term === 0 ? '마감 임박' : '마감됨'}</Term>
      </InfoWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
`;

const StyledIconHeart = styled(IconHeart)<{ isLiked: boolean }>`
  cursor: pointer;
  position: absolute;
  left: 12px;
  top: 12px;
  width: 24px;
  height: 24px;
  stroke: white;
  fill: ${({ theme, isLiked }) => (isLiked ? theme.colors.white : 'transparent')};
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 190px;
  height: 129px;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 276px;
    height: 168px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 8px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 8px;
  }
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 500;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 20px;
  }
`;

const Address = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray[700]};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 16px;
  }
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: 700;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 18px;
  }
`;

const Term = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray[700]};

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 18px;
  }
`;

export default GardenItem;
