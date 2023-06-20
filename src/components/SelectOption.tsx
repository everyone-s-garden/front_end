import React from 'react';
import { useSetRecoilState } from 'recoil';
import { searchTypeAtom } from 'recoil/atom';
import styled from 'styled-components';

interface SelectOptionProps {
  index: number;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setIsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SelectOption({ index, title, setTitle, setIsListOpen }: SelectOptionProps) {
  const setSearchType = useSetRecoilState(searchTypeAtom);

  const onOptionClicked = () => {
    setTitle(title);
    setSearchType(index);
    setIsListOpen(false);
  };

  return <Option onClick={onOptionClicked}>{title}</Option>;
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
