import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DescSection from "./DescSection";
import FinishBook from "./FinishBook";
import CommentSection from "./CommentSection";
import IntroSection from "./IntroSection";
import Aside from "./Aside";
import Book from "./Components/Book";
import Nav from "../../Components/Nav/Nav";

function BookDetails() {
  const [data, setData] = useState([]);
  const [isOpened, setIsOpened] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState(false);
  const [books, setBooks] = useState([]);

  const onSave = () => {
    setIsSaved(!isSaved);
    setIsActiveModal(true);
  };

  useEffect(() => {
    fetch("/data/BookDetails/data.json")
      .then((res) => res.json())
      .then((res) => setData(res.MESSAGE));
  }, []);

  useEffect(() => {
    fetch("/data/BookDetails/books.json")
      .then((res) => res.json())
      .then((res) => setBooks(res.BOOK));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsActiveModal(false);
    }, 2500);
  }, [isActiveModal]);

  return (
    <>
      <Nav />
      <Main>
        <article>
          <DescSection data={data} />
          <BestSection>
            <h1>에세이 분야 주간 베스트 도서</h1>
          </BestSection>
          <FinishBook data={data} />
          <IntroSection data={data} />
          <ContentSection isOpened={isOpened}>
            <div>
              <h1>목차</h1>
              <img
                onClick={() => setIsOpened(!isOpened)}
                alt="dd"
                src="https://cdn2.iconfinder.com/data/icons/essential-web-4/50/angle-down-arrow-direction-bottom-512.png"
              />
            </div>
            <ContentsContainer
            //  dangerouslySetInnerHTML={{ __html: "text" }}
            >
              {data.contents}
            </ContentsContainer>
          </ContentSection>
          <CommentSection />
          <Banner>
            <img alt="" src="https://i.ibb.co/1mS3GRC/2020-11-05-1-38-33.png" />
          </Banner>
          <RecommendBookContainer>
            <h1>다른 회원들이 함께 담은 책</h1>
            <RecommendBooks>
              {books.map(({ book_name, book_img, book_author }) => (
                <Book
                  bookName={book_name}
                  bookImg={book_img}
                  bookAuthor={book_author}
                />
              ))}
            </RecommendBooks>
          </RecommendBookContainer>
        </article>
        <Aside isSaved={isSaved} setIsSaved={setIsSaved} onSave={onSave} />
        <Modal isActiveModal={isActiveModal}>
          {isSaved ? "내 서재에 담겼습니다" : "담기 취소되었습니다"}
        </Modal>
      </Main>
    </>
  );
}

export default BookDetails;

const Main = styled.div`
  display: flex;
  width: 1280px;
  margin: 0 auto;

  article {
    width: 998px;
    border-left: 1px solid rgb(223, 223, 223);
  }
`;

const BestSection = styled.section`
  padding: 15px 24px;
  border-bottom: 1px solid rgb(247, 247, 247);

  h1 {
    display: flex;
    align-items: center;
    line-height: 31px;
    font-size: 14px;
    font-weight: 600;
    color: rgb(36, 36, 37);

    &::before {
      content: "";
      background-image: url("https://cdn1.iconfinder.com/data/icons/awards-trophies/512/medal_award_trophy_premium_win_first_place_19-512.png");
      background-size: 30px 30px;
      width: 30px;
      height: 30px;
      display: inline-block;
    }
  }
`;

const ContentSection = styled.section`
  padding: 24px;
  border-bottom: 12px solid rgb(247, 247, 247);

  div:first-child {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 16px;
      font-weight: 700;
    }

    img {
      cursor: pointer;
      width: 15px;
      height: 15px;
    }
  }

  div:last-child {
    margin: 20px 0;
    color: rgb(85, 85, 85);
    font-size: 14px;
    line-height: 25px;
    display: ${(props) => (props.isOpened ? "" : "none")};
  }
`;

const Banner = styled.section`
  img {
    width: 100%;
  }
`;

const RecommendBookContainer = styled.section`
  padding: 24px;
  h1 {
    font-size: 16px;
    font-weight: 700;
  }
`;

const RecommendBooks = styled.div`
  display: flex;
  overflow: hidden;
`;

const Modal = styled.div`
  display: ${({ isActiveModal }) => (isActiveModal ? "inline-block" : "none")};
  position: fixed;
  text-align: center;
  line-height: 55px;
  top: 45%;
  left: 35%;
  width: 300px;
  height: 60px;
  background-color: rgba(51, 51, 51, 0.9);
  color: white;
  border-radius: 7px;
`;

const ContentsContainer = styled.div`
  white-space: pre-line;
`;
