import React from 'react';
import styled from 'styled-components';

interface GardenTermProps {
  term: {
    useStartDate: string;
    useEndDate: string;
  };
  setTerm: React.Dispatch<
    React.SetStateAction<{
      useStartDate: string;
      useEndDate: string;
    }>
  >;
}

const GardenTerm = ({ term, setTerm }: GardenTermProps) => {
  return (
    <Container>
      <Description>기간</Description>
      <Input type="date" value={term.useStartDate} onChange={e => setTerm({ ...term, useStartDate: e.target.value })} />
      <Input type="date" value={term.useEndDate} onChange={e => setTerm({ ...term, useEndDate: e.target.value })} />
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

const Input = styled.input`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  border: none;
  border-radius: 10px;
  padding: 15px 20px;
`;

const Description = styled.div`
  font-size: 16px;
`;

export default GardenTerm;
