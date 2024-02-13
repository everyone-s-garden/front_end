import { SearchIcon } from 'assets/community';
import React from 'react';
import styled from 'styled-components';

const SearchBar = () => {
  return (
    <Container>
      <SearchIcon />
      <Input placeholder="검색어를 작성하세요." />
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 496px;
  margin: 0 auto;
  border-radius: 4px;
  padding: 0 10px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-bottom: 20px;

  @media (${({ theme }) => theme.devices.mobile}) {
    height: 40px;
  }

  & svg {
    width: 16px;
    height: 16px;

    @media (${({ theme }) => theme.devices.mobile}) {
      width: 20px;
      height: 20px;
    }
  }
`;

const Input = styled.input`
  margin: 0 auto;
  border-radius: 4px;
  border: none;
  flex-grow: 1;
  font-size: 14px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    font-size: 16px;
  }
`;
