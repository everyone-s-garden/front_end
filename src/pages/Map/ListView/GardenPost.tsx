import React from 'react';
import styled from 'styled-components';

import testImg from 'assets/garden-image1.jpg';

function GardenPost() {
  return (
    <Post>
      <Image src={testImg} alt="텃밭 이미지"></Image>
      <Status>
        모집 중 <Dot />
      </Status>
      <Title>양주 공공텃밭</Title>
      <Info>
        <strong>면적</strong> 8평 <strong>가격</strong> 평당 15,000원
      </Info>
    </Post>
  );
}

export default GardenPost;

const Post = styled.div`
  position: relative;
  padding: 40px;
  width: 100%;
  border-bottom: 1px solid gray;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
`;

const Status = styled.span`
  z-index: 10;
  padding: 5px 10px;
  position: absolute;
  top: 50px;
  right: 50px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid gray;
  border-radius: 20px;
  background-color: white;
`;

const Dot = styled.div`
  margin-left: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff6a00;
  box-shadow: 0px 0px 2px 2px #ff6a00;
`;

const Title = styled.h1`
  font-size: 1.2rem;
`;

const Info = styled.div`
  font-size: 1rem;
`;
