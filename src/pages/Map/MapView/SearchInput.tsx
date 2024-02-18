import { useGetRegionsName } from 'api/GardenAPI';
import useSelect from 'hooks/useSelect';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Region } from 'types/Garden';
import { useNavermaps } from 'react-naver-maps';

const SearchInput = ({ map }: { map: naver.maps.Map | null }) => {
  const { closeSelect, isOpen, openSelect } = useSelect();
  const navermaps = useNavermaps();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [regionName, setRegionName] = useState<string>('');
  const [debouncedRegionName, setDebouncedRegionName] = useState<string>('');
  const { data: regionData } = useGetRegionsName({ regionName: debouncedRegionName });

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

  const handleRegionItemClick = (region: Region) => {
    if (!map) return;
    closeSelect();
    setRegionName(region.position);
    map.setZoom(16);
    map.panTo(new navermaps.LatLng(region.longitude, region.latitude));
  };

  return (
    <SearchInputWrapper>
      <Input
        onFocus={openSelect}
        ref={searchInputRef}
        placeholder="지역명 검색"
        value={regionName}
        onChange={handleChangeRegionName}
      />
      {isOpen && regionName && (
        <SearchResultWrapper>
          {regionData && regionData.length === 0 && (
            <NoResult>검색 결과가 없습니다. 정확한 검색어를 임력해주세요.</NoResult>
          )}
          {regionData &&
            regionData.length > 0 &&
            regionData.map((region, index) => (
              <ResultItem key={index} onClick={() => handleRegionItemClick(region)}>
                {region.position}
              </ResultItem>
            ))}
        </SearchResultWrapper>
      )}
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
  max-height: 200px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 10px;
  top: 40px;
`;

const ResultItem = styled.li`
  padding: 10px 15px;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }
`;

const NoResult = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  word-break: keep-all;
  height: 100%;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[400]};
  padding: 15px;
`;

export default SearchInput;
