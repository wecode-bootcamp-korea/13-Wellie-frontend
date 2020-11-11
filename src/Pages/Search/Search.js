import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { BEAPIROOT } from "../../config";
import InnerInput from "./Components/InnerInput";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${BEAPIROOT}/book/category`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res.MESSAGE >>>", res.MESSAGE);
        setCategories(res.categories);
      })
      .catch((err) => console.log("Catched errors >>> ", err));
  }, []);

  function goToSubCatePage(id, name) {
    history.push({
      pathname: `/search/category?category_id=${id}`,
      name: name,
    });
  }

  return (
    <SearchPage>
      <div className="innerSearch">
        <InputWrap>
          <InnerInput />
        </InputWrap>
        <RecommendWrap>
          <h2>밀리 추천 검색어</h2>
          <div className="searchRecommend">
            <ul>
              <li>
                <FaSearch className="searchIcon" />
                <span
                  onClick={() =>
                    history.push({
                      pathname: `/search/result/최준?type=all&sort=keyword`,
                      searchValue: { inputValue: "최준" },
                    })
                  }
                >
                  지금 주목 받는
                  <strong> 최 준 작가</strong>
                </span>
              </li>
              <li>
                <FaSearch className="searchIcon" />
                <span
                  onClick={() =>
                    history.push({
                      pathname: `/search/result/개발?type=all&sort=keyword`,
                      searchValue: { inputValue: "개발" },
                    })
                  }
                >
                  세상을 움직이는
                  <strong> 개발자의 철학</strong>
                </span>
              </li>
              <li>
                <FaSearch className="searchIcon" />
                <span
                  onClick={() =>
                    history.push({
                      pathname: `/search/result/아무튼?type=all&sort=keyword`,
                      searchValue: { inputValue: "아무튼" },
                    })
                  }
                >
                  좋아하는 게 너무 많아,
                  <strong> 아무튼 시리즈</strong>
                </span>
              </li>
              <li>
                <FaSearch className="searchIcon" />
                <span
                  onClick={() =>
                    history.push({
                      pathname: `/search/result/프로그래밍?type=all&sort=keyword`,
                      searchValue: { inputValue: "프로그래밍" },
                    })
                  }
                >
                  누구나 쉽게 하는
                  <strong> 프로그래밍</strong>
                </span>
              </li>
            </ul>
          </div>
        </RecommendWrap>
        <Banner>
          <a href="https://www.millie.co.kr/viewfinder/millie_best.html">
            <h2>지금 인기 있는 책 TOP 30</h2>
            <p>밀리 회원이 많이 읽은 책을 살펴보세요.</p>
          </a>
        </Banner>
        <CategoryContainer>
          <h2>밀리 도서 카테고리</h2>
          <ul>
            {categories?.map(({ category_id, image, name }) => {
              return (
                <Category
                  key={category_id}
                  onClick={() => goToSubCatePage(category_id, name)}
                >
                  <img src={image} alt="Category cover" />
                  <span>{name}</span>
                </Category>
              );
            })}
          </ul>
        </CategoryContainer>
      </div>
    </SearchPage>
  );
}

const SearchPage = styled.section`
  width: 1280px;
  padding: 0 16px;
  margin: 64px auto 0;
  box-sizing: border-box;
`;

const InputWrap = styled.section`
  position: relative;
`;

const RecommendWrap = styled.section`
  position: relative;
  padding-top: 32px;
  margin-bottom: 25px;

  h2 {
    margin-bottom: 8px;
    font-size: 16px;
    line-height: 19px;
    font-weight: bold;
  }

  li {
    .searchIcon {
      padding-left: 6px;
      color: rgb(153, 153, 153);
    }
    span {
      display: inline-block;
      padding: 8px 0 8px 10px;
      font-size: 16px;
      line-height: 22px;
      color: rgb(153, 153, 153);
      cursor: pointer;

      strong {
        font-weight: bolder;
      }
    }
  }
`;

const Banner = styled.section`
  position: relative;
  margin-bottom: 45px;
  border-radius: 6px;
  background-color: rgb(253, 250, 243);

  a {
    display: block;
    position: relative;
    padding: 16px;
    cursor: pointer;

    line-height: 1.3;

    h2 {
      margin-bottom: 4px;
      font-size: 16px;
      font-weight: bold;
      color: rgb(51, 51, 51);
    }

    p {
      font-size: 12px;
      color: rgb(102, 102, 102);
    }
  }
`;

const CategoryContainer = styled.section`
  position: relative;

  h2 {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: bold;
    line-height: 19px;
    color: rgb(51, 51, 51);
  }
  ul {
    flex-wrap: wrap;
    display: flex;
    justify-content: space-between;
  }
`;

const Category = styled.li`
  position: relative;
  width: 19%;
  padding-bottom: 1.2%;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
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

  span {
    position: absolute;
    left: 12px;
    bottom: 28px;
    font-weight: 700;
    font-size: 20px;
    color: rgb(255, 255, 255);
  }
`;
