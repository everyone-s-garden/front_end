import { IPostListItem } from 'api/type';
import React from 'react';
import styled from 'styled-components';

interface IProps {
  items: IPostListItem[];
}

const PostListItem = ({ items }: IProps) => {
  return (
    <div>
      {items.map((item, idx) => {
        return (
          <li
            style={{ display: 'flex', borderBottom: '1px solid #D7D7D7', paddingBottom: 12, marginBottom: 32 }}
            key={item.gardenId}
          >
            <ImageWrapper>
              <img src={item.images[0]} />
            </ImageWrapper>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{item.gardenName}</span>
              <span style={{ color: '#5A5A5A', marginBottom: 8 }}>{item.size}평</span>
              <span style={{ color: '#282828' }}>평당 {item.price.toLocaleString()}원</span>
            </div>
          </li>
        );
      })}
    </div>
  );
};

export default PostListItem;
const ImageWrapper = styled.div`
  width: 234px;
  height: 122px;
  flex-shrink: 0;
  border-radius: 8px;
  margin-right: 24px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;
