import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { GoSettings } from "react-icons/go";
import { BsPlusCircle } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BookShelfList } from "../Components/BookShelfList";
import { commonContainer } from "../../../Styles/Theme";
import { SortingWrap, SortingBtns, AddBookShelf } from "./Style";

export function BookShelf({
  bookShelfListCard,
  handleClickBookShelfList,
  handleClickBookShelfDelete,
}) {
  const history = useHistory();

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
            <SortingBtns onClick={() => history.push("/my_books_manager")}>
              <BsPlusCircle />
            </SortingBtns>
          </li>
        </ul>
      </SortingWrap>
      {bookShelfListCard.bookShelfCount > 0 ? (
        <Article>
          <BookShelfListWrap>
            <BookShelfList
              bookShelfListCard={bookShelfListCard}
              handleClickBookShelfList={handleClickBookShelfList}
              handleClickBookShelfDelete={handleClickBookShelfDelete}
            />
          </BookShelfListWrap>
        </Article>
      ) : (
        <EmptyBookShelfWrapper>
          <img
            src="/images/Mybooks/empty_shelf.png"
            alt="비어있는 서재 아이콘"
          />
          <h5>나만의 책장을 만들어보세요!</h5>
          <AddBookShelf onClick={() => history.push("/my_books_manager")}>
            <span>
              <AiOutlinePlus />
            </span>
            새 책장 만들기
          </AddBookShelf>
        </EmptyBookShelfWrapper>
      )}
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

const EmptyBookShelfWrapper = styled.div`
  ${commonContainer}
  padding: 70px 0;
  min-height: 400px;
  text-align: center;

  img {
    max-width: 100px;
  }

  h5 {
    margin: 15px 0 30px;
    color: rgb(127 127 127);
  }
`;
