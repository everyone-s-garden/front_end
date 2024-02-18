import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';

const ReceiveReview = () => {
  return (
    <Container>
      <ProfileWrapper>
        <Profile />
        <div>닉네임님이 보낸 후기</div>
      </ProfileWrapper>
      <ReviewWrapper>
        <ProductInfoWrapper>
          <ProductImage />
          <InfoWrapper>
            <div>상품 이름</div>
            <div>닉네임</div>
          </InfoWrapper>
        </ProductInfoWrapper>
      </ReviewWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 786px;
  margin: 0 auto;
  padding: 0 16px;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: calc(var(--vh, 1vh) * 100 - 51px);

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0;
    height: calc(var(--vh, 1vh) * 100 - 106px);
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 18px;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.img`
  width: 68px;
  height: 68px;
  border-radius: 50%;
`;

const ReviewWrapper = styled.div`
  max-width: 600px;
  height: 670px;
  width: 100%;
  background-color: #d9d9d9;
  padding: 45px;
`;

const ProductImage = styled.img`
  border: 1px solid #d9d9d9;
  width: 84px;
  height: 84px;
  border-radius: 10px;
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 10px;
`;

export default ReceiveReview;
