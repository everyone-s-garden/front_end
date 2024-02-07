import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconPlus } from 'assets/chat/plus-icon.svg';

const ContentInput = ({ roomId }: { roomId: number }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('dfads');
  };

  return (
    <Container>
      <EtcBtn>
        <StyledPlusIcon />
      </EtcBtn>
      <Form onSubmit={handleSubmit}>
        <TextArea placeholder="메세지 보내기" />
        <SendBtn>보내기</SendBtn>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  height: 80px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 24px 16px;
  gap: 16px;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.devices.tablet} {
    height: 155px;
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  }
`;

const EtcBtn = styled.button`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.orange[300]};

  @media ${({ theme }) => theme.devices.tablet} {
    width: 40px;
    height: 40px;
  }
`;

const SendBtn = styled.button`
  flex-shrink: 0;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.orange[300]};
  padding: 8px;
  font-size: 14px;
  font-weight: 500;

  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 20px;
    padding: 12px 13px;
  }
`;

const StyledPlusIcon = styled(IconPlus)`
  width: 16.8px;
  height: 16.8px;

  @media ${({ theme }) => theme.devices.tablet} {
    width: 28px;
    height: 28px;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 38px;
  border-radius: 10px;
  border: none;
  padding: 9px;
  resize: none;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  font-size: 16px;
  font-weight: 500;

  &::placeholder {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[300]};
  }

  @media ${({ theme }) => theme.devices.tablet} {
    height: 107px;
    padding: 18px 14px;
    font-size: 20px;

    &::placeholder {
      font-size: 20px;
    }
  }

  &:focus {
    outline: none;
  }
`;

export default ContentInput;
