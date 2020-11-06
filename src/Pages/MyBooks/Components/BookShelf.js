import styled from "styled-components";
import { GoSettings } from "react-icons/go";
import { BsPlusCircle } from "react-icons/bs";
import { BookShelfList } from "../Components/BookShelfList";
import { commonContainer } from "../../../Styles/Theme";
import { SortingWrap, SortingBtns } from "./Style";

export function BookShelf({ bookShelfListCard, handleClickBookShelfList }) {
  return (
    <>
      <SortingWrap>
        <p>
          <b>{bookShelfListCard.bookShelfCount}</b>개의 책장
        </p>
        <ul>
          <li>
            <SortingBtns>
              <GoSettings />
            </SortingBtns>
          </li>
          <li>
            <SortingBtns>
              <BsPlusCircle />
            </SortingBtns>
          </li>
        </ul>
      </SortingWrap>
      <Article>
        <BookShelfListWrap>
          <BookShelfList
            bookShelfListCard={bookShelfListCard}
            handleClickBookShelfList={handleClickBookShelfList}
          />
        </BookShelfListWrap>
      </Article>
    </>
  );
}

const Article = styled.article`
  ${commonContainer}
`;

const BookShelfListWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
