import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconArrow } from 'assets/arrow-icon.svg';
import { Link } from 'react-router-dom';
import { CropInfo } from 'types/Crop';
import { AnimatePresence, motion } from 'framer-motion';
import useSelect from 'hooks/useSelect';

const MonthCropItem = ({ cropInfo }: { cropInfo: CropInfo }) => {
  const { description, link, name } = cropInfo;
  const { isOpen, toggleSelect } = useSelect();

  return (
    <Container>
      <TitleWrapper onClick={toggleSelect}>
        <Title>{name}</Title>
        <StyledIconArrow open={isOpen} />
      </TitleWrapper>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
          >
            <DescriptionWrapper>
              <Description>{description}</Description>
              <StyledLink to={link} target="_blank">
                더 알아보기
              </StyledLink>
            </DescriptionWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
`;

const TitleWrapper = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 4px 8px 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
  @media ${({ theme }) => theme.devices.mobile} {
    padding: 0 4px 12px 4px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 500;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 24px;
  }
`;

const StyledIconArrow = styled(IconArrow)<{ open: boolean }>`
  width: 20px;
  height: 20px;
  transform: ${({ open }) => (open ? 'rotate(90deg)' : 'rotate(270deg)')};
  transition: transform 0.1s ease-in;
  @media ${({ theme }) => theme.devices.mobile} {
    width: 24px;
    height: 24px;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 4px;
  display: flex;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 16px;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  text-decoration: underline;
  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 16px;
  }
`;

export default MonthCropItem;
