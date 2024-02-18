import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';

const Review = () => {
  return (
    <Container>
      <Title>거래후기 쓰기</Title>
      <ProductInfoWrapper>
        <ProductImage />
        <InfoWrapper>
          <div>상품 이름</div>
          <div>닉네임</div>
        </InfoWrapper>
      </ProductInfoWrapper>
      <Hr />
      <RatingWrapper>
        <div>닉네임님과의 거래 어떠셨나요?</div>
        <BtnWrapper>
          {Array.from({ length: 5 }).map((_, index) => (
            <button key={index}>별</button>
          ))}
        </BtnWrapper>
      </RatingWrapper>
      <Hr />
      <ImageAddWrapper>
        <AddBtn>+</AddBtn>
      </ImageAddWrapper>
      <Hr />
      <CheckBoxListWrapper>
        {Array.from({ length: 5 }).map((_, index) => (
          <CheckBoxWrapper key={index}>
            <input type="checkbox" />
            <Label>친절하고 매너가 좋아요.</Label>
          </CheckBoxWrapper>
        ))}
      </CheckBoxListWrapper>
      <CompleteBtn>등록하기</CompleteBtn>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 786px;
  margin: 0 auto;
  padding: 0 16px;

  height: calc(var(--vh, 1vh) * 100 - 51px);

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0;
    height: calc(var(--vh, 1vh) * 100 - 106px);
  }
`;

const Title = styled.h1`
  color: #646464;
  font-size: 24px;
  font-weight: 700;
  padding: 17px 0;
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

const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
`;

const Hr = styled.hr`
  width: 100%;
  border: 1px solid #d9d9d9;
  max-width: 786px;
  margin: 20px 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const ImageAddWrapper = styled.div`
  display: flex;
  gap: 18px;
`;

const AddBtn = styled.button`
  width: 84px;
  height: 84px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
`;

const CheckBoxListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const Label = styled.label`
  padding: 8px 24px;
  background-color: #dedede;
  border-radius: 10px;
  font-size: 20px;
`;

const CompleteBtn = styled.button`
  width: 100%;
  height: 64px;
  background-color: #dedede;
  font-size: 20px;
  font-weight: 600;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    position: static;
    margin: 20px 0;
  }
`;

export default Review;
