import React from 'react';
import styled from 'styled-components';
import { ChatRoom } from 'types/Chat';
import defaultProfile from 'assets/default_profile.png';
import { useNavigate } from 'react-router-dom';

const ChatListItem = ({ chat }: { chat: ChatRoom }) => {
  const navigate = useNavigate();
  const { partnerInfo, readNotCnt, recentContents, postInfo, chatRoomId } = chat;
  const { imageUrl, nickName } = partnerInfo;

  const handleEnterChatRoom = () => {
    navigate(`/chat/${chatRoomId}`);
  };

  return (
    <Container onClick={handleEnterChatRoom}>
      <ProfileInfoWrapper>
        <ProfileImage src={imageUrl ?? defaultProfile} />
        <div>
          <DetailInfoWrapper>
            <Nickname>{nickName}</Nickname>
            <Info>씨앗 · 1분전</Info>
          </DetailInfoWrapper>
          <Message>{recentContents}</Message>
        </div>
      </ProfileInfoWrapper>
      <ProductImage src={postInfo.images[0]} />
    </Container>
  );
};

const Container = styled.li`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px 20px;
  cursor: pointer;
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray[200]}`};
  &:hover {
    background-color: ${({ theme }) => theme.colors.orange[300]};
  }

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 12px 16px;
    border: 0;
    border-radius: 10px;
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
  margin-bottom: 8px;
`;

const Nickname = styled.span`
  font-weight: 700;
  font-size: 18px;
`;

const Info = styled.span`
  font-weight: 400;
  font-size: 14px;
`;

const Message = styled.div`
  font-weight: 500;
  font-size: 16px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const ProfileImage = styled.img`
  background-color: #dbdbdb;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
`;

const ProductImage = styled.img`
  background-color: #dbdbdb;
  border-radius: 10px;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
`;

export default ChatListItem;
