import { useGetUser } from 'api/UserAPI';
import React from 'react';
import DefaultProfile from 'assets/default-profile.png';

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
      <img src={user.profileImageUrl ?? DefaultProfile} alt="작성자 프로필 이미지" />
      <span>{user.nickname}</span>
    </>
  );
};

export default Author;
