import styled from "styled-components";
import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { positionCenter } from "../../../Styles/Theme";

export function BookShelfList({
  bookShelfListCard,
  handleClickBookShelfList,
  handleClickBookShelfDelete,
}) {
  const [modify, setModify] = useState(0);
  const [modifyToggle, setModifyToggle] = useState(false);

  const handleClickModifyToggle = (id) => {
    setModify(id);
    setModifyToggle(!modifyToggle);
  };

  return (
    bookShelfListCard.myBookShelfList &&
    bookShelfListCard.myBookShelfList.map((item) => (
      <List key={item.id} id={item.id}>
        <EditWrap>
          <EditBtn onClick={() => handleClickModifyToggle(item.id)}>
            <HiOutlineDotsVertical />
          </EditBtn>
          <Modify active={item.id === modify && modifyToggle}>
            <ul>
              <li>수정</li>
              <li onClick={() => handleClickBookShelfDelete(item.id)}>삭제</li>
            </ul>
          </Modify>
        </EditWrap>
        <div onClick={() => handleClickBookShelfList(item.id)}>
          <BookShelfBackground>
            <BookCoverWrap>
              {item.bookPreviewImg.map((item) => {
                return <img src={item} alt="도서 책커버" key={item} />;
              })}
            </BookCoverWrap>
          </BookShelfBackground>
        </div>
        <h4>{item.bookShelfName}</h4>
      </List>
    ))
  );
}

const List = styled.li`
  position: relative;
  width: 33.3333%;
  margin: 0 0 30px;
  padding: 0 8px;
  list-style: none;

  > div {
    cursor: pointer;
  }

  h4 {
    margin: 10px 0 0;
    font-size: 16px;
    font-weight: 600;
    color: rgb(36, 36, 36);
  }
`;

const BookShelfBackground = styled.div`
  position: relative;
  padding: 20px 15px;
  height: 215px;
  background: rgb(246, 244, 238);
  border-radius: 15px;
`;

const BookCoverWrap = styled.div`
  ${positionCenter};
  width: 112px;
  height: 165px;
  text-align: center;

  img {
    position: absolute;
    top: 0;
    display: inline-block;
    width: 112px;
    height: 165px;
    border: 1px solid rgb(221, 221, 221);
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);

    &:nth-child(1) {
      left: 0;
      z-index: 2;
    }

    &:nth-child(2) {
      left: 30px;
      z-index: 1;
    }
  }
`;

const EditWrap = styled.div`
  position: absolute;
  right: 15px;
  top: 20px;
  z-index: 1;
`;

const EditBtn = styled.button`
  position: relative;
  background: none;
  font-size: 20px;
  color: rgb(174 174 174);
  cursor: pointer;
`;

const Modify = styled.div`
  display: ${({ active }) => (active ? "block" : "none")};
  position: absolute;
  left: 50%;
  top: calc(100% + 10px);
  bottom: 0;
  min-width: 75px;
  transform: translateX(-50%);
  text-align: center;

  &:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: calc(100% - 6px);
    transform: translateX(-50%) rotate(45deg);
    width: 8px;
    height: 8px;
    background: #fff;
    border-width: 1px;
    border-color: #ddd transparent transparent #ddd;
    border-style: solid;
  }

  ul {
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.125);

    li {
      padding: 7px 10px;
      background: #fff;
      border: 1px solid #ddd;
      font-size: 12px;
      color: #333;
    }

    li:hover {
      font-weight: 600;
    }

    li + li {
      border-top: none;
    }
  }
`;
