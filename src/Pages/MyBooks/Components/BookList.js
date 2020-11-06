import styled from "styled-components";
import { BookCardEightcolum } from "../../../Components/BookCard/BookCard";
import { AiOutlineSetting } from "react-icons/ai";
import { GoSettings } from "react-icons/go";
import { BiSearch } from "react-icons/bi";
import { commonContainer } from "../../../Styles/Theme";
import { SortingWrap, SortingBtns, BtnsWrap, InputWrap } from "./Style";

export function BookList({
  books,
  bookList,
  setFilterListOpen,
  handleKeyPressSearchInput,
}) {
  return (
    <>
      <SortingWrap>
        <p>
          <b>{bookList?.bookCount}</b>권의 도서
        </p>
        <ul>
          <InputWrap>
            <label>
              <input
                type="search"
                placeholder="도서 검색"
                onKeyUp={handleKeyPressSearchInput}
              />
              <span>
                <BiSearch />
              </span>
            </label>
          </InputWrap>
          <li>
            <BtnsWrap>
              <li>
                <SortingBtns
                  onClick={() => {
                    setFilterListOpen(true);
                  }}
                >
                  <GoSettings />
                </SortingBtns>
              </li>
              <li>
                <SortingBtns>
                  <AiOutlineSetting />
                </SortingBtns>
              </li>
            </BtnsWrap>
          </li>
        </ul>
      </SortingWrap>
      <Article>
        {books &&
          books.map(({ id, bookCoverImg, bookName, writer }) => (
            <BookCardEightcolum
              id={id}
              key={id}
              bookCoverImg={bookCoverImg}
              bookName={bookName}
              writer={writer}
            />
          ))}
      </Article>
    </>
  );
}

const Article = styled.article`
  ${commonContainer}
`;
