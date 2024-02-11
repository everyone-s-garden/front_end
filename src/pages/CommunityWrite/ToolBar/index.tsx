import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

const ToolBar = ({ children }: PropsWithChildren) => {
  return <ToolBarContainer>{children}</ToolBarContainer>;
};

const Group = ({ children }: PropsWithChildren) => {
  return <ToolGroup>{children}</ToolGroup>;
};

const Tool = ({ children }: PropsWithChildren) => {
  return <ToolItem>{children}</ToolItem>;
};

ToolBar.Group = Group;
ToolBar.Tool = Tool;

export default ToolBar;

const ToolBarContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 64px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  flex-shrink: 0;

  & > ul:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray[400]};
  }
`;

const ToolGroup = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 36px;
  gap: 36px;
`;

const ToolItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};

  & button {
    display: flex;
    align-items: center;
  }
`;
