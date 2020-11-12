import styled from "styled-components";
import { useHistory } from "react-router";

function Book({ bookId, bookName, bookImg, bookAuthor }) {
  const history = useHistory();

  return (
    <Container bookId={bookId}>
      <img
        onClick={() => {
          history.push(`/book_details/${bookId}`);
          window.scroll(0, 0);
        }}
        alt="book"
        src={bookImg}
      />
      <div>
        <span>{bookName}</span>
        <span>{bookAuthor}</span>
      </div>
    </Container>
  );
}

export default Book;

const Container = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px;

  img {
    width: 145px;
    box-shadow: 5px 5px 5px rgb(223, 223, 223);
    cursor: pointer;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
      &:first-child {
        margin-top: 10px;
        padding-bottom: 10px;
        font-size: 14px;
        font-weight: 700;
      }
      &:last-child {
        font-size: 12px;
        color: rgb(111, 111, 111);
      }
    }
  }
`;
