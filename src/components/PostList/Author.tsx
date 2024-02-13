import { useGetUser } from 'api/UserAPI';
import React from 'react';

const Author = ({ authorId }: { authorId: number }) => {
  const { data: user } = useGetUser(authorId);

  if (!user) {
    return (
      <>
        <figure />
      </>
    );
  }

  return (
    <>
      {user.profileImageUrl ? <img src={user.profileImageUrl} alt="작성자 프로필 이미지" /> : <figure />}
      <span>{user.nickname}</span>
    </>
  );
};

export default Author;
