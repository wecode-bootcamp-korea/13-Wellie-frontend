import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const TYPES = [
  { value: "all", type: "전체" },
  { value: "title", type: "제목" },
  { value: "author", type: "저자" },
  { value: "publisher", type: "출판사" },
];

export default function InnerInput(props) {
  const history = useHistory();
  const [type, setType] = useState("all");
  const [inputValue, setInputValue] = useState("");

  function goToResultPage() {
    history.push({
      pathname: `/search/result/${inputValue}?type=${type}&sort=${props.sort}`,
      searchValue: { inputValue: inputValue },
    });
  }

  function changeType(e) {
    setType(e.target.value);
  }

  function deleteInputValue() {
    document.getElementsByTagName("input")[0].value = "";
  }

  function updateInputValue() {
    setInputValue(document.getElementsByTagName("input")[0].value);
  }

  return (
    <InnerInputSection>
      <FilterType>
        <select onChange={changeType}>
          {TYPES?.map((eachtype) => {
            return <option value={eachtype.value}>{eachtype.type}</option>;
          })}
        </select>
      </FilterType>
      <InputArea>
        <FaSearch className="searchIcon" onClick={goToResultPage} />
        <input
          type="text"
          onKeyUp={(e) => {
            e.keyCode === 13 && goToResultPage();
          }}
          onChange={updateInputValue}
          value={inputValue}
          placeholder={
            type === "all"
              ? "검색어를 입력하세요."
              : type === "title"
              ? "제목 검색"
              : type === "author"
              ? "저자명 검색"
              : type === "publisher"
              ? "출판사명 검색"
              : "검색어를 입력하세요."
          }
        />
        <IoIosCloseCircle className="closeIcon" onClick={deleteInputValue} />
      </InputArea>
    </InnerInputSection>
  );
}

const InnerInputSection = styled.div`
  padding: 26px 0 2px;
  align-items: center;
  position: relative;
  height: 93px;
`;

const FilterType = styled.div`
  margin-bottom: 15px;

  select {
    width: 75px;
    height: 32px;
    border-radius: 6px;
    font-weight: 700;
    position: relative;
    outline: none;
    border: none;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1), 0 4px 5px rgba(0, 0, 0, 0.05),
      0 2px 4px rgba(0, 0, 0, 0.02);
    color: rgb(102, 102, 102);
  }
`;

const InputArea = styled.div`
  position: relative;
  padding: 0 28px 12px 0;
  border-bottom: 2px solid rgb(215, 217, 221);

  .searchIcon {
    display: inline-block;
    padding-left: 6px;
    color: rgb(153, 153, 153);
    cursor: pointer;
  }

  input {
    z-index: -1;
    display: inline-block;
    width: 1180px;
    height: 32px;
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
    margin-left: 10px;
    color: rgb(51, 51, 51);
  }

  .closeIcon {
    position: absolute;
    right: 15px;
    bottom: 18px;
    font-size: 20px;
    cursor: pointer;
    color: rgb(215, 217, 221);
  }
`;
