import React, { useState } from 'react';
import styled from 'styled-components';
import { MonthCrop } from 'types/Crop';
import { ReactComponent as IconArrow } from 'assets/arrow-icon.svg';
import { Link } from 'react-router-dom';

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
  border-bottom: 1px solid #e1e1e1;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
`;

const StyledIconArrow = styled(IconArrow)<{ open: boolean }>`
  width: 20px;
  height: 20px;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(270deg)')};
  transition: transform 0.2s ease-in;
`;

const DescriptionWrapper = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 4px;
  height: auto;
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  max-height: ${({ open }) => (open ? '500px' : '0')};
  opacity: ${({ open }) => (open ? '1' : '0')};
  transition: all 0.2s ease-in-out;
`;

const Description = styled.p`
  color: #585858;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
`;

const StyledLink = styled(Link)`
  color: #585858;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-decoration: underline;
`;

export default MonthCropItem;
