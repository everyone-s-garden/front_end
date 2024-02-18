import React from 'react';
import styled from 'styled-components';
import { GardenForNameSearch } from 'types/Garden';

const GardenLocation = ({ garden }: { garden: GardenForNameSearch | null }) => {
  return (
    <Container>
      <Description>위치</Description>
      <Location>{garden?.address || '검색해서 등록 시 자동으로 불러와져요.'}</Location>
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

const Location = styled.div`
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[300]};
`;

export default GardenLocation;
