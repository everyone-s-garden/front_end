import React, { useCallback } from 'react';
import { CommentIcon, HeartIcon } from 'assets/community';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Author from './Author';

interface PostListProps {
  posts: {
    postId: number;
    title: string;
    likeCount: number;
    commentCount: number;
    content: string;
    preview: string;
    authorId: number;
    postType: 'INFORMATION_SHARE' | 'GARDEN_SHOWCASE' | 'QUESTION' | 'ETC';
    createdDate: string;
  }[];
}

const PostList = ({ posts }: PostListProps) => {
  const navigate = useNavigate();

  const getPlainText = useCallback((content: string) => {
    const $div = document.createElement('div');
    $div.innerHTML = content;
    return $div.textContent || $div.innerText || '';
  }, []);

  return (
    <Container>
      {posts.map(post => {
        const { postId, postType, title, content, preview, likeCount, commentCount, authorId } = post;

        return (
          <List key={postId}>
            <PostItem onClick={() => navigate(`/community/${postId}`)}>
              <Info>
                <Flex>
                  <Badge>{postType}</Badge>
                  <h3>{title}</h3>
                </Flex>
                <summary>{getPlainText(content)}</summary>
                <Profile>
                  <Author authorId={authorId} />
                  <div>
                    <HeartIcon />
                    <span>{likeCount}</span>
                  </div>
                  <div>
                    <CommentIcon />
                    <span>{commentCount}</span>
                  </div>
                </Profile>
              </Info>
              {preview ? <PostImage src={preview} /> : <Box></Box>}
            </PostItem>
          </List>
        );
      })}
    </Container>
  );
};

export default PostList;

const Container = styled.ul`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (${({ theme }) => theme.devices.mobile}) {
    gap: 40px;
  }
`;

const List = styled.li`
  padding-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
`;

const PostItem = styled.article`
  height: 106px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  @media (${({ theme }) => theme.devices.mobile}) {
    height: 132px;
  }
`;

const Info = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 8px;

  & h3 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;

    @media (${({ theme }) => theme.devices.mobile}) {
      font-size: 20px;
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  & > summary {
    display: none;

    @media (${({ theme }) => theme.devices.mobile}) {
      display: block;
      font-size: 18px;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.5;
    }
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    margin-right: 40px;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (${({ theme }) => theme.devices.mobile}) {
    align-items: center;
    flex-direction: row;
    gap: 12px;
  }
`;

const Box = styled.div`
  flex-shrink: 0;
  width: 106px;
  height: 106px;
  border-radius: 10px;

  @media (${({ theme }) => theme.devices.mobile}) {
    width: 132px;
    height: 132px;
  }
`;

const Badge = styled.p`
  display: inline-block;
  width: fit-content;
  flex-shrink: 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.orange[200]};
  padding: 4px 6px;
  font-size: 14px;

  @media (${({ theme }) => theme.devices.mobile}) {
    padding: 6px 10px;
    border-radius: 8px;
    font-size: 18px;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  & > img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  & div {
    display: flex;
    gap: 4px;
    align-items: center;

    @media (${({ theme }) => theme.devices.mobile}) {
      gap: 6px;
    }
  }

  & span {
    font-size: 14px;
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    gap: 10px;

    & > span {
      font-size: 16px;
    }
  }

  & > figure {
    height: 24px;
    width: 24px;
    background-color: ${({ theme }) => theme.colors.gray[100]};
    border-radius: 50%;
  }
`;

const PostImage = styled.img`
  object-fit: cover;
  border-radius: 10px;

  width: 109px;
  height: 109px;

  @media (${({ theme }) => theme.devices.mobile}) {
    width: 132px;
    height: 132px;
  }
`;
