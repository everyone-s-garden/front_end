import React from 'react';
import styled from 'styled-components';
import BtnItems from './BtnItems';
import MobileHeader from './MobileHeader';
import { EnterChatRoom } from 'types/Chat';

const ContentHeader = ({ productInfo }: { productInfo: EnterChatRoom }) => {
  const { gardenName, gardenStatus, images, partnerNickname, price } = productInfo;

  return (
    <Container>
      <MobileHeader partnerNickname={partnerNickname} />
      <ProductWrapper>
        <ProductImage src={images[0]} />
        <ProductInfoWrapper>
          <InfoHeader>
            <ProductStatus>{gardenStatus === 'ACTIVE' ? '분양중' : '분양 완료'}</ProductStatus>
            <ProductTitle>{gardenName}</ProductTitle>
          </InfoHeader>
          <ProductPrice>{price}원</ProductPrice>
        </ProductInfoWrapper>
      </ProductWrapper>
      <BtnItems />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  position: absolute;
  justify-content: space-between;
  height: 193px;
  padding: 0 20px 10px 20px;
  flex-direction: column;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray[200]}`};
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.devices.tablet} {
    background-color: ${({ theme }) => theme.colors.orange[100]};
    border-left: 1px solid ${({ theme }) => theme.colors.orange[200]};
    border-bottom: none;
    height: 86px;
    padding: 17px;
    flex-direction: row;
    align-items: center;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProductImage = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray[100]};

  @media ${({ theme }) => theme.devices.tablet} {
    width: 54px;
    height: 54px;
  }
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProductStatus = styled.span`
  font-size: 16px;
  font-weight: 600;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 18px;
  }
`;

const ProductTitle = styled.span`
  font-size: 16px;
  font-weight: 500;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 18px;
  }
`;

const ProductPrice = styled.div`
  font-size: 16px;
  font-weight: 700;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 18px;
    font-weight: 600;
  }
`;

export default ContentHeader;
