import { BREAK_POINT, FONT_WEIGHT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const SkeletonUi = () => {
  return (
    <PostContainer>
      <ImageContainer>
        <Skeleton width={'100%'} height={'100%'} />
      </ImageContainer>
      <InfoDiv>
        <Status>
          <Skeleton />
        </Status>
        <Title>
          <Skeleton width={'50%'} />
        </Title>
        <Value>
          <Skeleton width={'50%'} />
        </Value>
        <Value>
          <Skeleton width={'20%'} />
        </Value>
      </InfoDiv>
    </PostContainer>
  );
};

export default SkeletonUi;

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
  width: 174px;
  height: 135px;
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
  width: 30%;
  height: 40%;
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
