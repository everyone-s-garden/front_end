import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const AnnouncementDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  return (
    <ContentWrapper>
      <TitleWrapper>
        <h1>모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.</h1>
        <p>25.01.19</p>
      </TitleWrapper>

      <PayloadWrapper>
        <p>안녕하세요 ! 모두의 텃밭입니다. 25.01.19 이후로 더 좋은 서비스 제공을 위해 업데이트 될 예정이에요.</p>
        <br />
        <br />
        <br />
        <br />
        <p>감사합니다.</p>
      </PayloadWrapper>
      <Button onClick={() => nav(-1)}>목록으로 돌아가기</Button>
    </ContentWrapper>
  );
};

export default AnnouncementDetail;

const ContentWrapper = styled.div`
  max-width: 662px;
`;

const TitleWrapper = styled.div`
  padding-bottom: 16px;
  padding-left: 20px;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 30px;
  h1 {
    color: #282828;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  p {
    font-size: 16px;
    font-weight: 600;
    color: #282828;
  }
`;

const PayloadWrapper = styled.div`
  padding-left: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #282828;
  margin-bottom: 200px;
`;

const Button = styled.button`
  display: flex;
  padding: 19px 144px;
  margin-left: auto;
  margin-right: auto;
  background-color: #9ec646;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  font-weight: 600;
`;
