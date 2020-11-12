import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setType, setSearchValue } from "../../../store/actions/index";
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
  const dispatch = useDispatch();
  const type = useSelector((store) => store.searchReducer.type);
  const sort = useSelector((store) => store.searchReducer.sort);
  const [inputValue, setInputValue] = useState("");

  function changeType(e) {
    console.log("changeType", e.target.value);
    dispatch(setType(e.target.value));
  }

  function updateInputValue(e) {
    setInputValue(e.target.value);
  }

  const onSubmitHandler = async (e) => {
    await e.preventDefault();
    dispatch(setSearchValue(inputValue));
    history.push(`/search_result/${inputValue}?type=${type}&sort=${sort}`);
  };

  function deleteInputValue(e) {
    setInputValue("");
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
        <FaSearch className="searchIcon" onClick={onSubmitHandler} />
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
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
        </form>
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
  margin-bottom: 22px;

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
  form {
    display: inline-block;

    input {
      z-index: 100;
      width: 1180px;
      height: 32px;
      font-weight: 700;
      font-size: 20px;
      line-height: 32px;
      margin-left: 10px;
      color: rgb(51, 51, 51);
    }
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
