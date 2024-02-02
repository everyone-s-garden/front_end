import PostListItem from 'components/PostListItem';
import React from 'react';
import styled from 'styled-components';
import { items } from 'utils/dummydata';

const WhisperPost = () => {
  return (
    <Container>
      <PostListItem items={items} />
    </Container>
  );
};

export default WhisperPost;

const Container = styled.ul`
  display: flex;
  flex: 1;
  max-width: 662px;
  min-width: 334px;
`;
