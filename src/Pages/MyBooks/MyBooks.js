import { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineSetting } from "react-icons/ai";
import { BookList } from "./Components/BookList";
import { BookShelf } from "./Components/BookShelf";
import { PostList } from "./Components/PostList";
import { StatsList } from "./Components/StatsList";
import { Modal } from "./Components/Modal";
import { FilterModal } from "./Components/FilterModal";
import { LIBRARY, LOCALHOST } from "../../config";
import { commonContainer, theme, positionCenter } from "../../Styles/Theme";
import { userProfileImg } from "./Components/Style";

function MyBooks() {
  const [menuTab, setMenuTab] = useState(0);
  const [myBooksInfo, setMyBooksInfo] = useState([]);
  const [bookSearchInput, setBookSearchInput] = useState("");
  const [bookListSearch, setBookListSearch] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [bookShelfListCard, setbookShelfListCard] = useState([]);
  const [bookShelfCase, setBookShelfCase] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterListOpen, setFilterListOpen] = useState(false);

  useEffect(() => {
    fetch(`${LOCALHOST}/data/MyBooks/MYBOOKSINFO.json`)
      .then((res) => res.json())
      .then((res) => {
        setMyBooksInfo(res.mybooksInfo);
      });

    fetch(`${LOCALHOST}/data/MyBooks/BOOKLIST.json`)
      .then((res) => res.json())
      .then((res) => {
        setBookList(res);
        setBookListSearch(res);
      });

    fetch(`${LOCALHOST}/data/MyBooks/BOOKSHELFLIST.json`)
      .then((res) => res.json())
      .then((res) => {
        setbookShelfListCard(res);
      });
  }, []);

  const handleClickBookShelfList = () => {
    fetch(`${LOCALHOST}/data/MyBooks/BOOKSHELFCASE.json`)
      .then((res) => res.json())
      .then((res) => {
        setBookShelfCase(res);
      });
    setIsOpen(true);
  };

  const handleKeyPressSearchInput = (e) => {
    let value = e.target.value;
    if (e.key === "Enter") {
      const sortData = () => {
        return bookList.books.filter((item) => item.bookName.includes(value));
      };
      setBookSearchInput(value);
      setBookListSearch(sortData);
    }
  };

  const content = {
    0: (
      <BookList
        books={bookSearchInput ? bookListSearch : bookList.books}
        bookList={bookList}
        setFilterListOpen={setFilterListOpen}
        handleKeyPressSearchInput={handleKeyPressSearchInput}
      />
    ),
    1: (
      <BookShelf
        bookShelfListCard={bookShelfListCard}
        handleClickBookShelfList={handleClickBookShelfList}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    ),
    2: <PostList />,
    3: <StatsList />,
  };

  return (
    <>
      {isOpen && <Modal setIsOpen={setIsOpen} bookShelfCase={bookShelfCase} />}
      <FilterModal
        filterListOpen={filterListOpen}
        setFilterListOpen={setFilterListOpen}
      />
      <TopBanner>
        <BgEditWrap>
          <EditBtn>
            <AiOutlineSetting />
          </EditBtn>
        </BgEditWrap>
        <UserInfo>
          <UserProfile>
            <div>
              <img src="/images/Mybooks/user.png" alt="유저 기본 아이콘" />
            </div>
            <MyBookName>{myBooksInfo?.myBooksName}</MyBookName>
            <UserName>{myBooksInfo?.userName}</UserName>
          </UserProfile>
          <UserAction>
            <UserActionItem>
              읽은책 <em>{myBooksInfo?.readBooks}</em>
            </UserActionItem>
            <UserActionItem>
              팔로워 <em>{myBooksInfo?.follower}</em>
            </UserActionItem>
            <UserActionItem>
              팔로잉 <em>{myBooksInfo?.following}</em>
            </UserActionItem>
          </UserAction>
          <UserEvent>
            <img src="/images/Mybooks/millie_level1.png" alt="밀리 level1" />
            <ProgressBar>
              <p>
                <b>밀리와 함께</b> 2일 6밀리
              </p>
              <Bar>
                <span></span>
                <p>D-98 100밀리 목표</p>
              </Bar>
            </ProgressBar>
          </UserEvent>
        </UserInfo>
      </TopBanner>
      <MenuTab>
        <CardList>
          {LIBRARY.map((item) => {
            return (
              <LibraryMenu
                key={item.id}
                active={item.id === menuTab}
                onClick={() => {
                  setMenuTab(item.id);
                }}
              >
                <span>{item.content}</span>
              </LibraryMenu>
            );
          })}
        </CardList>
      </MenuTab>
      {content[menuTab]}
    </>
  );
}

const BgEditWrap = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  z-index: 10;
`;

export const EditBtn = styled.button`
  width: 33px;
  height: 33px;
  padding: 4px 0 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  line-height: 33px;
  color: #fff;
`;

const TopBanner = styled.header`
  position: relative;
  min-height: 440px;
  background: url("https://images.unsplash.com/photo-1493219686142-5a8641badc78?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80")
    no-repeat center 100%;
  text-align: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  &:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.125);
  }
`;

const UserInfo = styled.div`
  ${positionCenter}
  z-index: 10;
`;

const ProgressBar = styled.div`
  margin-left: 10px;

  > p {
    text-align: left;
  }
`;

const Bar = styled.div`
  min-width: 600px;
  height: 35px;
  margin: 7px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid #ddd;
  background: rgba(255, 255, 255, 0.35);
  border-radius: 100px;
  overflow: hidden;

  span {
    position: absolute;
    left: 0;
    right: 50%;
    top: 0;
    bottom: 0;
    background: ${theme.yellow};
    z-index: 10;
  }

  p {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
`;

const MenuTab = styled.main`
  ${commonContainer}

  ul {
    display: flex;
    justify-content: center;
    margin: 25px 0;
  }
`;

const LibraryMenu = styled.li`
  padding: 5px 25px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;

  span {
    display: inline-block;
    padding: 0 0 8px;
    border-bottom: ${({ active }) => active && "3px solid rgb(17, 17, 17)"};
    font-weight: ${({ active }) => active && "600"};
  }
`;

const UserProfile = styled.div`
  div {
    ${userProfileImg}

    img {
      width: 100%;
    }

    button {
      position: absolute;
      right: -5px;
      bottom: 0;
    }
  }
`;

const MyBookName = styled.p`
  margin: 20px 0 10px;
  font-size: 24px;
  font-weight: 500;
  color: #fff;
`;

const UserName = styled.p`
  margin: 0 0 25px;
  color: rgba(255, 255, 255, 0.9);
`;

const UserAction = styled.ul`
  display: flex;
  justify-content: center;

  li {
    position: relative;
    margin-right: 45px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const UserActionItem = styled.li`
  position: relative;
  margin-right: 45px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);

  &:last-child {
    margin-right: 0;
  }

  &:last-child::after {
    display: none;
  }

  em {
    display: block;
    margin: 7px 0 0;
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    color: #fff;
  }

  &::after {
    content: "";
    display: inline-block;
    width: 1px;
    height: 15px;
    position: absolute;
    left: 65px;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const UserEvent = styled.div`
  margin: 25px 0 0;
  padding: 25px 0 0;
  display: flex;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  align-items: center;

  img {
    width: 37px;
    height: 40px;
    top: 6px;
    left: 0px;
  }
`;

const CardList = styled.ul`
  display: flex;
`;

export default MyBooks;
