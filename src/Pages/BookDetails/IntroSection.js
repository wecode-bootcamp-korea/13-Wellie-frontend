import React, { useState } from "react";
import styled from "styled-components";

function IntroSection({ data }) {
  const [closed, setClosed] = useState(false);

  const toggleMoreBtn = () => {
    setClosed(!closed);
  };

  return (
    <Container closed={closed}>
      <div>
        <h1>책 소개</h1>
        <div>
          <p className={closed ? "" : "close"}>{data.introduction}</p>
        </div>
        <button onClick={toggleMoreBtn}>더보기</button>
      </div>
      <IntroBox>
        <IntroInfo bottom>
          <span>카테고리</span>
          <span>{data.category}</span>
        </IntroInfo>
        <Border></Border>
        <IntroInfo>
          <span>페이지</span>
          <span>{data.page}P</span>
        </IntroInfo>
        <Border></Border>
        <IntroInfo>
          <span>용량</span>
          <span>{data.volume} MB</span>
        </IntroInfo>
        <Border></Border>
        <IntroInfo bottom>
          <span>출판사</span>
          <span>{data.publisher}</span>
        </IntroInfo>
        <Border></Border>
        <IntroInfo>
          <span>출간일</span>
          <span>{data.date}</span>
        </IntroInfo>
      </IntroBox>
    </Container>
  );
}

export default IntroSection;

const Container = styled.section`
  padding-top: 15px;

  div:first-child {
    position: relative;
    padding: 15px 24px;

    h1 {
      font-size: 16px;
      color: rgb(36, 36, 36);
      font-weight: 750;
      margin-bottom: 10px;
    }

    div {
      margin-bottom: 10px;

      p {
        max-height: 100%;
        font-size: 14px;
        color: rgb(85, 85, 85);
        line-height: 30px;
      }

      p.close {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    button {
      position: absolute;
      margin-right: 24px;
      background-color: transparent;
      right: 0;
      bottom: 0;
      font-size: 14px;
      color: rgb(164, 81, 247);
      font-weight: 500;
      cursor: pointer;
    }
  }
`;

const IntroBox = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: rgb(250, 250, 245);
  padding: 0 30px;
  margin-top: 30px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      &:first-child {
        color: rgb(139, 139, 139);
        font-size: 12px;
        margin-bottom: 20px;
      }

      &:last-child {
        color: rgb(85, 85, 85);
        font-size: 14px;
        font-weight: 700;
        text-decoration: ${({ bottom }) => (bottom ? "underline" : "")};
      }
    }
  }
`;

const IntroInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    &:first-child {
      color: rgb(139, 139, 139);
      font-size: 12px;
      margin-bottom: 20px;
    }
    &:last-child {
      color: rgb(85, 85, 85);
      font-size: 14px;
      font-weight: 700;
      text-decoration: ${({ bottom }) => (bottom ? "underline" : "")};
    }
  }
`;

const Border = styled.div`
  width: 1px;
  height: 60%;
  background-color: rgb(223, 223, 223);
`;
