import { Link } from "react-router-dom";
import styled from "styled-components";

export function BookCardSixcolum({ id, bookCoverImg, bookName, writer }) {
  return (
    <Card key={id} colum="6">
      <Link to={`/book_details/${id}`}>
        <img src={bookCoverImg} alt="도서 책커버" />
        <h5>{bookName}</h5>
        <p>
          {writer.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </p>
      </Link>
    </Card>
  );
}

export function BookCardEightcolum({ id, bookCoverImg, bookName, writer }) {
  return (
    <Card key={id} colum="8">
      <Link to={`/book_details/${id}`}>
        <img src={bookCoverImg} alt="도서 책커버" />
        <h5>{bookName}</h5>
        <p>
          {writer.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </p>
      </Link>
    </Card>
  );
}

export const Card = styled.div`
  display: inline-block;
  width: ${({ colum }) => (colum <= 6 ? "16.6666%" : "12.5%")};
  margin: 0 0 35px;

  a {
    display: block;
    padding: 0 8px;
  }

  img {
    width: 100%;
    border: 1px solid #ddd;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.125);
  }

  h5 {
    margin: 10px 0 5px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    font-weight: 600;
    font-size: 16px;
    text-overflow: ellipsis;
    color: #111;
  }

  p {
    font-size: 12px;
    color: #999;
  }
`;
