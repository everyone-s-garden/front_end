import React from 'react';
import Dropdown from '../Dropdown';
import { ArrowBelowIcon } from 'assets/community';
import { useFormContext } from 'react-hook-form';
import { Post } from '../types';
import styled from 'styled-components';

const postTypes = ['정보 공유', '텃밭 자랑', '질문하기', '기타'] as const;

const PostTypeSelector = () => {
  const {
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext<Post>();

  const postType = watch('postType');

  return (
    <Container>
      <Dropdown>
        <Dropdown.Trigger>
          <TypeButton errorState={!!errors.postType}>
            <span>{postType}</span>
            <ArrowBelowIcon />
          </TypeButton>
        </Dropdown.Trigger>
        <Dropdown.Menu top={45}>
          {postTypes.map((type, index) => (
            <li
              key={index}
              onClick={() => {
                setValue('postType', type);
                clearErrors('postType');
              }}
            >
              <Dropdown.Item>{type}</Dropdown.Item>
            </li>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  );
};

export default PostTypeSelector;

const Container = styled.div`
  display: block;
  margin: 18px 20px;

  @media (${({ theme }) => theme.devices.mobile}) {
    display: none;
  }
`;

const TypeButton = styled.div<{ errorState?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 30px;
  padding: 0 10px;
  font-size: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.orange[100]};
  border: 1px solid ${({ errorState, theme }) => (errorState ? theme.colors.error : 'none')};
`;
