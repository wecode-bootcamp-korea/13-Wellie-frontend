import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import { BEAPIROOT } from "../../config";
import InnerInput from "./Components/InnerInput";
import { FaList } from "react-icons/fa";
import { HiOutlineViewGrid } from "react-icons/hi";

const SORTS = [
  { value: "keyword", sort: "키워드 일치 순" },
  { value: "popular", sort: "인기순" },
  { value: "page", sort: "업데이트 순" },
  { value: "published", sort: "발간일 순" },
];

export default function SearchResult() {
  const location = useLocation();
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [sort, setSort] = useState("keyword");
  const [searchValue, setSearchValue] = useState(
    window.location.pathname.split("/").pop()
  );

  useEffect(() => {
    fetch(`${BEAPIROOT}/book/search/${searchValue}?type=all&sort=${sort}`)
      .then((res) => res.json())
      .then((res) => {
        setBooks(res.MESSAGE);
      })
      .catch((err) => console.log("Catched errors!! >>>", err));
  }, [sort]);

  const changeSort = (e) => {
    setSort(e.target.value);
  };

  const goToBookDetail = (id) => {
    history.push(`/BookDetails/${id}`);
  };

  return (
    <SearchResultPage>
      <SubNav>검색결과</SubNav>
      <ContentBody>
        <InnerInput sort={sort} />
        <SearchSortWrap>
          <CategoryList>
            <ul>
              <li>
                <a href="#top" id="books" smooth={true} duration={1000}>
                  통합검색
                </a>
              </li>
              <li>
                <a href="#books" smooth={true} duration={1000}>
                  도서
                </a>
              </li>
              <li>
                <a href="#map" smooth={true} duration={1000}>
                  지도
                </a>
              </li>
            </ul>
          </CategoryList>
          <SearchSort>
            <p>
              총<span> {books?.length} 건</span>의 검색결과
            </p>
            <div className="rightside">
              <span>
                <FaList />
              </span>
              <FilterSort>
                <select onChange={changeSort}>
                  {SORTS?.map((eachsort) => {
                    return (
                      <option value={eachsort.value}>{eachsort.sort}</option>
                    );
                  })}
                </select>
              </FilterSort>
            </div>
          </SearchSort>
        </SearchSortWrap>
        <BookContainer id="books">
          <h2>도서</h2>
          <ul>
            {books?.map(({ book_id, book_image, book_title, author }) => {
              return (
                <Book key={book_id} onClick={() => goToBookDetail(book_id)}>
                  <img src={book_image} alt="Book cover" />
                  <div>{book_title}</div>
                  <div>
                    {author?.map((eachName) => {
                      return <span>{eachName}</span>;
                    })}
                  </div>
                </Book>
              );
            })}
          </ul>
        </BookContainer>
        <MapContainer>
          <h2 id="map">지도</h2>
        </MapContainer>
      </ContentBody>
    </SearchResultPage>
  );
}

const SearchResultPage = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
`;

const SubNav = styled.nav`
  height: 50px;
  position: fixed;
  top: 65px;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(238, 238, 238);
  text-align: center;
  font-size: 18px;
  font-weight: bolder;
  line-height: 50px;
`;

const ContentBody = styled.section`
  padding: 0 16px;
  margin: 115px auto 0;
  width: 1280px;
  box-sizing: border-box;
`;

const SearchSortWrap = styled.section`
  padding-top: 12px;
  margin-bottom: 32px;
`;

const CategoryList = styled.div`
  margin-bottom: 20px;

  ul {
    display: flex;
    padding-bottom: 10px;

    li {
      margin-left: 25px;

      &:first-child {
        margin-left: 0;
      }

      a {
        font-weight: 700;
        font-size: 14px;
        color: rgb(68, 68, 68);
        scroll-behavior: smooth;
      }
    }
  }
`;

const SearchSort = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  padding: 10px 0 10px 8px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  font-size: 14px;

  p {
    color: rgb(153, 153, 153);

    span {
      color: rgb(51, 51, 51);
      font-weight: bold;
    }
  }

  .rightside {
    display: flex;
    align-items: center;
    margin-left: auto;

    span {
      display: block;
      font-size: 18px;
      color: rgb(200, 200, 200);
      line-height: 30px;
      position: relative;
      height: 24px;
      padding-right: 10px;
    }

    .select {
      width: 110px;
      height: 30px;
    }
  }
`;

const FilterSort = styled.div`
  select {
    align-items: center;
    padding: 0 auto;
    padding-left: 6px;
    width: 110px;
    height: 50px;
    border-radius: 6px;
    font-weight: 700;
    position: relative;
    outline: none;
    border: none;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05),
      0 2px 4px rgba(0, 0, 0, 0.02);
    color: rgb(102, 102, 102);
  }
`;

const BookContainer = styled.section`
  h2 {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: rgb(68, 68, 68);
    font-weight: bold;
  }

  ul {
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
`;

const Book = styled.li`
  position: relative;
  width: 13%;
  padding-bottom: 1.2%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;

    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1), 0 0 2px rgba(0, 0, 0, 0.2);
    border-radius: 0 3px 3px 0;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.1), transparent 5.83%),
      linear-gradient(
        0.17deg,
        rgba(33, 33, 33, 0.55) 0.11%,
        rgba(33, 33, 33, 0.36) 29.2%,
        rgba(33, 33, 33, 0) 54.32%
      );
  }

  div {
    margin-bottom: 5px;
    display: block;

    &:nth-child(2) {
      font-weight: bolder;
      font-size: 14px;
      color: rgb(68, 68, 68);
      line-height: 1.4;
    }

    &:nth-child(3) {
      font-size: 12px;
      color: rgb(119, 119, 119);

      span {
        padding-right: 5px;
      }
    }
  }
`;

const MapContainer = styled.section`
  margin-top: 60px;
  h2 {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: rgb(68, 68, 68);
    font-weight: bold;
  }
`;
