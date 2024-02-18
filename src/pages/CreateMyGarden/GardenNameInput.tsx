import { useGetGardenListForName } from 'api/GardenAPI';
import useSelect from 'hooks/useSelect';
import React, { useState } from 'react';
import styled from 'styled-components';
import { GardenForNameSearch } from 'types/Garden';

const GardenNameInput = ({
  setGarden,
}: {
  setGarden: React.Dispatch<React.SetStateAction<GardenForNameSearch | null>>;
}) => {
  const [locationKeyword, setLocationKeyword] = useState<string>('');
  const { data: locationData } = useGetGardenListForName(locationKeyword);
  const { isOpen, closeSelect, openSelect, toggleSelect } = useSelect();

  const handleLocationKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationKeyword(e.target.value);
  };

  const handleGardenItemClick = (garden: GardenForNameSearch) => {
    setGarden(garden);
    setLocationKeyword(garden.gardenName);
    closeSelect();
  };

  return (
    <Container>
      <Description>텃밭 정보</Description>
      <InputWrapper>
        <Input
          onFocus={openSelect}
          placeholder="텃밭 이름을 입력해주세요"
          value={locationKeyword}
          onChange={handleLocationKeywordChange}
        />
        {isOpen && locationKeyword && (
          <InputResult>
            {locationData && locationData.length === 0 && (
              <NoResult>검색 결과가 없습니다. 정확한 검색어를 입력해주세요.</NoResult>
            )}
            {locationData &&
              locationData.length > 0 &&
              locationData.map(garden => (
                <ResultItem key={garden.gardenId} onClick={() => handleGardenItemClick(garden)}>
                  {garden.gardenName}
                </ResultItem>
              ))}
          </InputResult>
        )}
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  gap: 24px;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
`;

const InputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border: none;
  border-radius: 10px;
  padding: 15px 20px;
`;

const InputResult = styled.ul`
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 10px;
  top: 50px;
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

export default GardenNameInput;
