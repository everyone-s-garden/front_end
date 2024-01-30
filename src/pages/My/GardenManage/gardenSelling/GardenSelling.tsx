import PostListItem from 'components/PostListItem';
import React, { useState } from 'react';
import styled from 'styled-components';
import { items } from 'utils/dummydata';

const GardenSelling = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div style={{ flex: 1 }}>
      <Menu>
        {openMenu ? (
          <MenuButtonWrapper>
            <div>삭제</div>
            <div onClick={() => setOpenMenu(false)}>취소</div>
          </MenuButtonWrapper>
        ) : (
          <div onClick={() => setOpenMenu(true)}>편집</div>
        )}
      </Menu>
      <ul>
        <PostListItem items={items} />
      </ul>
    </div>
  );
};

export default GardenSelling;

const Menu = styled.div`
  padding-bottom: 11px;
  flex: 1;
  border-bottom: 1px solid #d7d7d7;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
`;
const MenuButtonWrapper = styled.div`
  display: flex;
  div:first-child {
    margin-right: 12px;
  }
  div {
    background-color: #dcebbd;
    padding: 4px 5px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    color: #000;
  }
`;
