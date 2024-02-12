import { useGetRegionsName } from 'api/GardenAPI';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SearchInput = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [regionName, setRegionName] = useState<string>('');
  const [debouncedRegionName, setDebouncedRegionName] = useState<string>('');
  const { data } = useGetRegionsName({ regionName: debouncedRegionName });

  const debounce = (func: () => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(func, delay);
    };
  };

  useEffect(() => {
    const debounced = debounce(() => setDebouncedRegionName(regionName), 500);
    debounced();
  }, [regionName]);

  const handleChangeRegionName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegionName(e.target.value);
  };

  return (
    <SearchInputWrapper>
      <Input ref={searchInputRef} placeholder="지역명 검색" value={regionName} onChange={handleChangeRegionName} />
      <SearchResultWrapper></SearchResultWrapper>
    </SearchInputWrapper>
  );
};

const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 330px;
`;

const Input = styled.input`
  border: none;
  height: 36px;
  width: 100%;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.colors.gray[50]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
  border-radius: 10px;
`;

const SearchResultWrapper = styled.ul`
  position: absolute;
  width: 100%;
  height: 100px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 10px;
  top: 40px;
`;

export default SearchInput;
