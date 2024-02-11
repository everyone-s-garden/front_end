import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconETC } from 'assets/chat/etc-icon.svg';

interface MobileHeaderProps {
  partnerNickname: string;
  partnerMannerGrade: string;
}

const MobileHeader = ({ partnerNickname, partnerMannerGrade }: MobileHeaderProps) => {
  return (
    <Container>
      <Name>{partnerNickname}</Name>
      <Grade>{partnerMannerGrade}</Grade>
      <StyledIconEtc />
      <Divider />
    </Container>
  );
};

const Container = styled.div`
  height: 51px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  @media ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;

const StyledIconEtc = styled(IconETC)`
  position: absolute;
  right: 0;
`;

const Name = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Grade = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

const Divider = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  margin: 0 16px;
`;

export default MobileHeader;
