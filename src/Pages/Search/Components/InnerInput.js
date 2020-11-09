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
  return (
    <InnerInputSection>
      <FilterType>
        <select onChange={props.changeType}>
          {TYPES?.map((eachtype) => {
            return <option value={eachtype.value}>{eachtype.type}</option>;
          })}
        </select>
      </FilterType>
      <InputArea>
        <FaSearch className="searchIcon" onClick={props.goToResultPage} />
        <input
          type="text"
          onKeyUp={(e) => {
            e.keyCode === 13 && props.goToResultPage();
          }}
          onChange={props.updateInputValue}
          value={props.inputValue}
          placeholder={
            props.type === "all"
              ? "검색어를 입력하세요."
              : props.type === "title"
              ? "제목 검색"
              : props.type === "author"
              ? "저자명 검색"
              : props.type === "publisher"
              ? "출판사명 검색"
              : "검색어를 입력하세요."
          }
        />
        <IoIosCloseCircle
          className="closeIcon"
          onClick={props.deleteInputValue}
        />
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
