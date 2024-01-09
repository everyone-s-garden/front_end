import React from 'react';
import styled from 'styled-components';

const ContentHeader = () => {
  return (
    <Container>
      <ProductWrapper>
        <ProductImage />
        <ProductInfoWrapper>
          <div>
            <ProductStatus>판매중</ProductStatus>
            <ProductTitle>방울토마토 판매합니다</ProductTitle>
          </div>
          <ProductPrice>13,000원</ProductPrice>
        </ProductInfoWrapper>
      </ProductWrapper>
      <ReviewBtn>후기 보내기</ReviewBtn>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  background-color: #bcbcbc;
  justify-content: space-between;
  align-items: center;
  height: 86px;
  padding: 17px;
`;

const ProductWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProductImage = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 10px;
  background-color: #d9d9d9;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductStatus = styled.span``;

const ProductTitle = styled.span``;

const ProductPrice = styled.div``;

const ReviewBtn = styled.button`
  font-size: 18px;
  font-weight: 600;
  background-color: #d9d9d9;
  padding: 9px 28px;
  border-radius: 10px;
`;

export default ContentHeader;
