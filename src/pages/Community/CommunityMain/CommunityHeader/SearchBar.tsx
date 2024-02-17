import { SearchIcon } from 'assets/community';
import useDebounce from 'hooks/useDebounce';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { communityParamsAtom } from 'recoil/atom';
import styled from 'styled-components';

const SearchBar = () => {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, 500);
  const [, setParams] = useRecoilState(communityParamsAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setParams(prevParams => ({ ...prevParams, searchContent: debouncedValue }));
  }, [debouncedValue, setParams]);

  return (
    <Container>
      <SearchIcon />
      <Input type="text" value={value} onChange={handleChange} placeholder="검색어를 작성하세요." />
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
