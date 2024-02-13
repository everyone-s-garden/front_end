import { ArrowBelowIcon } from 'assets/community';
import Dropdown from 'components/Dropdown';
import React from 'react';
import styled from 'styled-components';

const OrderDropdown = () => {
  return (
    <Container>
      <Dropdown>
        <Dropdown.Trigger>
          <Order>
            <span>정렬</span>
            <ArrowBelowIcon />
          </Order>
        </Dropdown.Trigger>
        <Dropdown.Menu top={30} width={110} portal="bottom-right">
          <List>
            <Dropdown.Item>댓글순</Dropdown.Item>
          </List>
          <List>
            <Dropdown.Item>최근 날짜순</Dropdown.Item>
          </List>
          <List>
            <Dropdown.Item>오래된 날짜순</Dropdown.Item>
          </List>
          <List>
            <Dropdown.Item>좋아요 순</Dropdown.Item>
          </List>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default OrderDropdown;

const Container = styled.div`
  margin-top: 15px;

  @media (${({ theme }) => theme.devices.mobile}) {
    margin-top: 67px;
  }
`;

const List = styled.li`
  & button {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray[700]};
  }
`;

const Order = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[700]};

  & svg {
    width: 12px;
    height: 12px;
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    font-size: 18px;

    & svg {
      width: 18px;
      height: 18px;
    }
  }
`;
