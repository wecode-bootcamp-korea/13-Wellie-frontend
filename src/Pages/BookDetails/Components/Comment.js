import React, { useState } from "react";
import styled from "styled-components";

export default function Comment({
  id,
  userName,
  userImg,
  userComment,
  date,
  onRemove,
}) {
  const [count, setCount] = useState(2);
  const [heartColor, setHeartColor] = useState(false);

  return (
    <Container id={id}>
      <li>
        <img
          className="user"
          alt="userImg"
          src={
            userImg === null
              ? "https://secure.gravatar.com/avatar/64c49b6f852ad598fd9f6ad571a663a8?s=1024&d=mm&r=g"
              : { userImg }
          }
        />
        <div className="commentBox">
          <p>{userName}</p>
          <span>{date}</span>
          <p>{userComment}</p>
          <p>이 리뷰가 마음에 드시나요?</p>
        </div>
        <DeleteBtn onClick={() => onRemove(id)}>
          <img
            alt="delete_btn"
            src="https://cdn4.iconfinder.com/data/icons/mayssam/512/cross-512.png"
          />
        </DeleteBtn>
        <Heart
          onClick={() =>
            heartColor ? setCount(count - 1) : setCount(count + 1)
          }
        >
          <i
            className={heartColor ? "fa fa-heart" : "fa fa-heart-o"}
            onClick={() => setHeartColor(!heartColor)}
          />
          <p>{count}</p>
        </Heart>
      </li>
    </Container>
  );
}

const Container = styled.ul`
  width: 950px;
  li {
    position: relative;
    width: 100%;
    height: 86px;
    display: flex;
    margin: 20px 0;
    .user {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .commentBox {
      p {
        font-size: 14px;
        color: rgb(85, 85, 85);
        margin: 7px 0;
        &:first-child {
          font-size: 12px;
          color: rgb(85, 85, 85);
          margin: 0;
        }
        &:last-child {
          font-size: 12px;
          color: rgb(165, 165, 165);
          margin: 1px 0;
        }
      }
      span {
        font-size: 10px;
        color: rgb(165, 165, 165);
      }
    }
  }
`;

const DeleteBtn = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  width: 15px;
  height: 15px;
  background-color: transparent;
  position: absolute;
  right: 0px;
  top: 10px;
  img {
    width: 10px;
    height: 10px;
  }
`;

const Heart = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: 22px;
  border: 1px rgb(165, 165, 165) solid;
  border-radius: 15px;
  position: absolute;
  bottom: 1px;
  right: 1px;
  padding: 0 5px;

  img {
    background-color: transparent;
    width: 15px;
    height: 15px;
  }

  p {
    font-size: 15px;
    color: rgb(139, 139, 139);
  }

  i {
    transition: 0.3s;
    margin: 0 2px;
    color: rgb(165, 165, 165);

    &:active {
      transform: scale(1.3);
    }

    &.fa.fa-heart {
      color: crimson;
    }
  }
`;
