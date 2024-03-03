import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { communityParamsAtom } from 'recoil/atom';
import styled from 'styled-components';
import { POST_TYPE, POST_TYPE_REVERSE } from '../constants';

const PostTypeSelector = () => {
  const [params, setParams] = useRecoilState(communityParamsAtom);

  const handleClickType = useCallback(
    (type: keyof typeof POST_TYPE_REVERSE) => {
      if (params.postType === POST_TYPE_REVERSE[type]) {
        setParams({ ...params, postType: '' });
        return;
      }

      setParams(prevParams => ({ ...prevParams, postType: POST_TYPE_REVERSE[type] }));
    },
    [params, setParams],
  );

  return (
    <Container>
      {Object.values(POST_TYPE).map((type, index) => (
        <Type key={index} selected={params.postType === POST_TYPE_REVERSE[type]}>
          <button onClick={() => handleClickType(type)}>{type}</button>
        </Type>
      ))}
    </Container>
  );
};

export default PostTypeSelector;

const Container = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (${({ theme }) => theme.devices.mobile}) {
    gap: 14px;
  }

  & button {
    width: 100%;
    height: 100%;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};

    @media (${({ theme }) => theme.devices.mobile}) {
      font-size: 18px;
    }
  }
`;

const Type = styled.li<{ selected: boolean }>`
  background-color: ${({ theme, selected }) => (selected ? theme.colors.orange[300] : theme.colors.orange[200])};
  padding: 6px 10px;
  border-radius: 10px;
`;
