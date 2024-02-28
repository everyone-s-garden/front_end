import { useGetComments } from 'api/CommunityAPI';
import React from 'react';
import styled from 'styled-components';
import defaultProfile from 'assets/default-profile.png';

const Comments = ({ postId }: { postId: string }) => {
  const { data: comments } = useGetComments(Number(postId));

  if (!comments) {
    return <></>;
  }

  // const commentCount = comments.length + comments.reduce((acc, curr) => acc + curr.subComments.length, 0);

  return (
    <Container>
      {/* <div>
        <img src={defaultProfile} alt="프로필 이미지" />
        <input type="text" placeholder="댓글을 입력해주세요" />
      </div>
      <h2>댓글 {commentCount}</h2>
      {comments.map(({ authorId, commentId, content, isLikeClick, likeCount, subComments }) => {
        return (
          <div key={commentId}>
            <img src={defaultProfile} alt="프로필 이미지" />
            <div></div>
          </div>
        );
      })} */}
    </Container>
  );
};

// comment랑 subComment 컴포넌트를 분리하기
// comment에 subComments를 전달해줘서, 만약 length가 0이 아니면 SubComments 컴포넌트를 렌더링하도록 하기
// 스타일링은 똑같이 하기

const Comment = ({
  authorId,
  text,
  likeCount,
  commentCount,
  subState,
}: {
  authorId: number;
  text: string;
  likeCount: number;
  commentCount: number;
  subState: boolean;
}) => {
  return <></>;
};

const SubComments = ({ parentId }: { parentId: string }) => {
  return (
    <div>
      <h1>SubComments</h1>
    </div>
  );
};

export default Comments;

const Container = styled.section``;
