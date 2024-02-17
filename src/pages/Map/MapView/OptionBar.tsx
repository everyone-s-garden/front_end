import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { searchTypeAtom } from 'recoil/atom';
import { FONT_WEIGHT } from 'constants/style';
import SelectList from 'components/SelectList';
import SearchInput from './SearchInput';

function OptionBar({ map }: { map: naver.maps.Map | null }) {
  const [searchType, setSearchType] = useRecoilState(searchTypeAtom);

  return (
    <Container>
      <Option>
        <OptionTitle>분양주체</OptionTitle>

        <OptionBox>
          <OptionButton active={searchType === 1} onClick={() => setSearchType(1)}>
            공공
          </OptionButton>
          <OptionButton active={searchType === 2} onClick={() => setSearchType(2)}>
            개인
          </OptionButton>
          <OptionButton active={searchType === 0} onClick={() => setSearchType(0)}>
            둘다 표시
          </OptionButton>
        </OptionBox>
        <SelectList />
        <SearchInput map={map} />
      </Option>
    </Container>
  );
}

export default OptionBar;

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  padding: 15px 0;

  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0 0 15px 0;
  }
`;

const Option = styled.div`
  z-index: 1;
  position: relative;
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  max-width: 1265px;
  padding: 0 20px;

  @media ${({ theme }) => theme.devices.mobile} {
    gap: 32px;
  }
`;

const OptionTitle = styled.span`
  font-size: 15px;
  font-weight: ${FONT_WEIGHT.MEDIUM};
  display: none;

  @media ${({ theme }) => theme.devices.mobile} {
    display: block;
  }
`;

const OptionBox = styled.div`
  display: none;
  align-items: center;
  gap: 32px;

  @media ${({ theme }) => theme.devices.mobile} {
    display: flex;
  }
`;

const OptionButton = styled.button<{ active: boolean }>`
  font-size: 18px;
  font-weight: ${props => (props.active ? FONT_WEIGHT.SEMIBOLD : FONT_WEIGHT.MEDIUM)};
  color: ${props => (props.active ? props.theme.colors.black : props.theme.colors.gray[400])};
`;
