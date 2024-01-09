import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';

const ChatListItem = () => {
  const name = '존리';
  const location = '서울시 강남구';
  const time = '1분 전';
  const message = '저 지금 전화드리겠습니다!';

  return (
    <Container>
      <ProfileInfoWrapper>
        <ProfileImage />
        <div>
          <DetailInfoWrapper>
            <Nickname>{name}</Nickname>
            <Info>
              {location} · {time}
            </Info>
          </DetailInfoWrapper>
          <Message>{message}</Message>
        </div>
      </ProfileInfoWrapper>
      <ProductImage />
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }

  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 16px 10px;
  }
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const DetailInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Nickname = styled.span`
  font-weight: 600;
  font-size: 18px;
`;

const Info = styled.span`
  font-weight: 400;
  font-size: 14px;
`;

const Message = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const ProfileImage = styled.img`
  background-color: #dbdbdb;
  border-radius: 50%;
  width: 56px;
  height: 56px;
`;

const ProductImage = styled.img`
  background-color: #dbdbdb;
  border-radius: 10px;
  width: 72px;
  height: 72px;
`;

export default ChatListItem;
