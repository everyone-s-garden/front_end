import React, { useEffect } from 'react';
import styled from 'styled-components';
import { purchaseItems } from 'utils/dummydata';
import { getCropTradeAPI } from 'utils/fetchGardenData';

const PurchaseHistory = () => {
  useEffect(() => {
    (async () => {
      const res = await getCropTradeAPI.fetchPurChaseHIstoryAPI();
      console.log(res);
    })();
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <Ul>
        {purchaseItems.map((item, idx) => {
          return (
            <li key={item.cropPostId}>
              <ImageWrapper>
                <Image src={item.imageUrl} />
              </ImageWrapper>
              <span>{item.title}</span>
              <span>고양시 · 행신동 / 1분전</span>
              <span>18,000원</span>
            </li>
          );
        })}
      </Ul>
    </div>
  );
};

export default PurchaseHistory;

const Ul = styled.ul`
  display: flex;
  flex-wrap: wrap;

  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 36px;
    margin-right: 30px;
    div {
      margin-bottom: 8px;
    }
    span {
      margin-bottom: 8px;
    }
    span:nth-child(2) {
      font-size: 18px;
      font-weight: 600;
    }

    span:nth-child(3) {
      font-size: 16px;
      font-weight: 500;
    }

    span:nth-child(4) {
      font-size: 18px;
      font-weight: 700;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 276px;
  height: 151px;
  border-radius: 10px;
  margin-bottom: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
