import React, { useCallback, useEffect } from 'react';
import { ArrowBelowIcon } from 'assets/community';
import Dropdown from 'components/Dropdown';
import { useRecoilState } from 'recoil';
import { communityParamsAtom } from 'recoil/atom';
import styled from 'styled-components';
import { ORDER_BY, ORDER_BY_REVERSE } from '../constants';

const OrderDropdown = () => {
  const [params, setParams] = useRecoilState(communityParamsAtom);

  const handleClickOrder = useCallback(
    (order: keyof typeof ORDER_BY_REVERSE) => {
      if (params.orderBy === ORDER_BY_REVERSE[order]) return;

      setParams(prevParams => ({ ...prevParams, orderBy: ORDER_BY_REVERSE[order] }));
    },
    [params.orderBy, setParams],
  );

  return (
    <Container>
      <Dropdown>
        <Dropdown.Trigger>
          <Order>
            <span>{ORDER_BY[params.orderBy as keyof typeof ORDER_BY] || '정렬'}</span>
            <ArrowBelowIcon />
          </Order>
        </Dropdown.Trigger>
        <Dropdown.Menu top={30} width={110} portal="bottom-right">
          {Object.values(ORDER_BY).map((order, index) => (
            <List key={index} onClick={() => handleClickOrder(order)}>
              <Dropdown.Item>{order}</Dropdown.Item>
            </List>
          ))}
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
    font-size: 16px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
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
