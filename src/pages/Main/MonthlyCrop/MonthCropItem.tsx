import React, { useState } from 'react';
import styled from 'styled-components';
import { MonthCrop } from 'types/Crop';
import { ReactComponent as IconArrow } from 'assets/arrow-icon.svg';
import { Link } from 'react-router-dom';
import { BREAK_POINT } from 'constants/style';

const MonthCropItem = ({ cropInfo }: { cropInfo: MonthCrop }) => {
  const { description, link, name } = cropInfo;
  const [open, setOpen] = useState(false);

  const toggleDescription = () => {
    setOpen(prev => !prev);
  };

  return (
    <Container>
      <TitleWrapper onClick={toggleDescription}>
        <Title>{name}</Title>
        <StyledIconArrow open={open} />
      </TitleWrapper>
      <DescriptionWrapper open={open}>
        <Description>{description}</Description>
        <StyledLink to={link} target="_blank">
          더 알아보기
        </StyledLink>
      </DescriptionWrapper>
    </Container>
  );
};

const Container = styled.li``;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 4px 8px 4px;
  border-bottom: 1px solid #c4c4c4;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    padding: 0 4px 12px 4px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 24px;
  }
`;

const StyledIconArrow = styled(IconArrow)<{ open: boolean }>`
  width: 20px;
  height: 20px;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(270deg)')};
  transition: transform 0.1s ease-in;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    width: 24px;
    height: 24px;
  }
`;

const DescriptionWrapper = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 4px;
  display: ${({ open }) => (open ? 'flex' : 'none')};
`;

const Description = styled.p`
  color: #585858;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 16px;
  }
`;

const StyledLink = styled(Link)`
  color: #585858;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-decoration: underline;
  @media (min-width: ${BREAK_POINT.MOBILE}) {
    font-size: 16px;
  }
`;

export default MonthCropItem;
