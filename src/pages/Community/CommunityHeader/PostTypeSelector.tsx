import React from 'react';
import styled from 'styled-components';

const PostTypeSelector = () => {
  return (
    <Container>
      <li>
        <button>정보공유</button>
      </li>
      <li>
        <button>텃밭자랑</button>
      </li>
      <li>
        <button>질문하기</button>
      </li>
      <li>
        <button>기타</button>
      </li>
    </Container>
  );
};

export default PostTypeSelector;

const Container = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (${({ theme }) => theme.devices.mobile}) {
    gap: 14px;
  }

  & li {
    background-color: ${({ theme }) => theme.colors.orange[200]};
    padding: 6px 10px;
    border-radius: 10px;
  }

  & button {
    width: 100%;
    height: 100%;
    font-size: 14px;

    @media (${({ theme }) => theme.devices.mobile}) {
      font-size: 18px;
    }
  }
`;
