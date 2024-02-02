import { BREAK_POINT } from 'constants/style';
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
    <Container>
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
    </Container>
  );
};

export default PurchaseHistory;
const Container = styled.div`
  flex: 1;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 24px;
  }
`;

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
    @media screen and (max-width: ${BREAK_POINT.TABLET}) {
      width: 210px;
    }

    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      width: 160px;
      margin-right: 0;
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 276px;
  height: 151px;
  border-radius: 10px;
  margin-bottom: 12px;
  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    width: 190px;
    height: 160px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 160px;
    height: 151px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;
