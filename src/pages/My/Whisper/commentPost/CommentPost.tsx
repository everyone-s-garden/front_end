import { useGetMyCommentedPosts } from 'api/CommunityAPI';
import PostListItem from 'components/PostListItem';
import React from 'react';
import styled from 'styled-components';
import { items } from 'utils/dummydata';

const CommentPost = () => {
  const { data: commentedPosts } = useGetMyCommentedPosts();

  return (
    <Container>
      <PostListItem items={items} />
    </Container>
  );
};

export default CommentPost;

const Container = styled.ul`
  display: flex;
  flex: 1;
  max-width: 662px;
  min-width: 334px;
`;
