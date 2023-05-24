import React from 'react';
import styled from 'styled-components';

interface SelectOptionProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

function SelectOption({ title, setTitle }: SelectOptionProps) {
  return <Option onClick={() => setTitle(title)}>{title}</Option>;
}

export default SelectOption;

const Option = styled.li`
  padding: 8px 14px;
  display: flex;
  cursor: pointer;
  color: #5a8534;

  &:hover {
    background-color: #ebf6df;
  }
`;
