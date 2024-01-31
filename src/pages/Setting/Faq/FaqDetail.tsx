import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const WhisperPayload = () => {
  return (
    <>
      <PayLoadTitle>1. 속닥속닥</PayLoadTitle>
      <Box>
        <InnerBox>
          <span>태그</span>
          <span>원하는 태그를 작성해주세요</span>
        </InnerBox>
      </Box>
      <PayLoadTitle>#을 붙이고 원하는 태그 내용을 작성하면 됩니다.</PayLoadTitle>
      <Box>
        <InnerBox>
          <span>태그</span>
          <span style={{ marginRight: 7.87, color: '#282828', fontSize: 11.021, fontWeight: 600 }}>#모두의 텃밭</span>
          <span style={{ color: '#282828' }}>#태그</span>
        </InnerBox>
      </Box>
    </>
  );
};

const ChattingPayload = () => {
  return (
    <div>
      <PayLoadTitle>1. PC 버전</PayLoadTitle>
      <ChattingBox>
        <div>내 주변 분양</div>
        <div>
          작물 거래
          <UnderLine />
        </div>
        <EditButton>편집</EditButton>
      </ChattingBox>
      <ChattinPayloadSpan>- 편집 버튼을 클릭하여 원하는 채팅장을 삭제할 수 있습니다.</ChattinPayloadSpan>
      <PayLoadTitle>2. 모바일 버전</PayLoadTitle>
      <IconWrapper>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </IconWrapper>
      <ChattinPayloadSpan>- 편집 버튼을 클릭하여 원하는 채팅장을 삭제할 수 있습니다.</ChattinPayloadSpan>
    </div>
  );
};

const FaqDetail = () => {
  const location = useLocation();
  const { title, content } = location.state || {};
  const nav = useNavigate();
  return (
    <Container>
      <ContentWrapper>
        <H1Wrapper>
          <H1>{title}</H1>
        </H1Wrapper>
        {content !== '속닥속닥' && content !== '채팅' && <Payload>{content}</Payload>}
        {content === '속닥속닥' && <WhisperPayload />}
        {content === '채팅' && <ChattingPayload />}
        <Button onClick={() => nav(-1)}>목록으로 돌아가기</Button>
      </ContentWrapper>
    </Container>
  );
};

export default FaqDetail;

const Container = styled.div`
  flex: 1;
  margin-top: 91px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  max-width: 662px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
`;

const H1 = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #282828;
`;

const H1Wrapper = styled.div`
  padding-bottom: 14px;
  border-bottom: 1px solid #d7d7d7;
  padding-left: 20px;
  margin-bottom: 60px;
`;
const Payload = styled.p`
  white-space: pre-line;
  font-size: 16px;
  font-weight: 600;
  color: #282828;
`;

const Button = styled.button`
  display: block;
  padding: 19px 82px;
  background-color: #9ec646;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
`;

const PayLoadTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #282828;
  margin-bottom: 19px;
`;

const Box = styled.div`
  width: 307px;
  height: 81px;
  border-radius: 10px;
  border: 0.787px solid #d7d7d7;
  margin-bottom: 19px;
  padding: 22.042px 15.743px 21.173px 15.744px;
`;

const InnerBox = styled.div`
  padding-bottom: 10.91px;
  border-bottom: 0.787px solid #cbcbcb;
  span:first-child {
    color: #cbcbcb;
    font-size: 15.744px;
    font-weight: 600;
    margin-right: 8px;
  }
  span:last-child {
    color: #cbcbcb;
    font-size: 11.021px;
    font-weight: 600;
  }
`;

const ChattingBox = styled.div`
  width: 317px;
  height: 47.226px;
  flex-shrink: 0;
  display: flex;
  position: relative;
  padding-left: 10px;
  border: 1px solid #ebebeb;
  align-items: center;
  margin-bottom: 20px;
  div:first-child {
    color: #b5b5b5;
    font-size: 13.85px;
    font-weight: 600;
    margin-right: 26.95px;
  }
  div:nth-child(2) {
    color: #282828;
    font-size: 13.85px;
    font-weight: 600;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const EditButton = styled.div`
  position: absolute;
  right: 6.19px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 6.155px;
  padding: 6.155px;
  background: #ffe6ba;
  font-size: 12.311px;
  font-weight: 500;
`;

const UnderLine = styled.div`
  height: 1px !important;
  position: absolute;
  bottom: 0;
  width: 180%;
  background-color: #713b09;
  left: 50%;
  transform: translateX(-50%);
`;

const ChattinPayloadSpan = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #282828;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  border: 1px solid #d7d7d7;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
