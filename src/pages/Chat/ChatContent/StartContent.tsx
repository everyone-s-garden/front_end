import React from 'react';
import { ReactComponent as ClickIcon } from 'assets/chat/click-icon.svg';
import styled from 'styled-components';
import { useGetGardenChatRooms } from 'api/ChatAPI';

const StartContent = () => {
  const { data } = useGetGardenChatRooms();

  if (!data) return null;

  return (
    <Container>
      <BlankHeader />
      <ContentWrapper>
        <StyledClickIcon />
        {data.responses.length === 0 ? (
          <Content>
            채팅을 시작하여
            <br />
            거래를 해보세요!
          </Content>
        ) : (
          <Content>
            대화창을 클릭하여
            <br />
            채팅을 시작해보세요
          </Content>
        )}
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  width: 100%;
  position: relative;
  display: none;
  @media ${({ theme }) => theme.devices.tablet} {
    display: block;
  }
`;

const BlankHeader = styled.div`
  width: 100%;
  height: 86px;
  background-color: ${({ theme }) => theme.colors.orange[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.orange[200]};
  position: absolute;
`;

const StyledClickIcon = styled(ClickIcon)`
  width: 41px;
  height: 41px;
  margin-bottom: 23px;
`;

const ContentWrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
`;

const Content = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[700]};
`;

export default StartContent;
