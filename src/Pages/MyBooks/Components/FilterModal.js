import styled from "styled-components";
import { GoSettings } from "react-icons/go";
import { BiSortUp } from "react-icons/bi";
import { ModalBackground, SubmitBtn } from "./Style";

export function FilterModal({ filterListOpen, setFilterListOpen }) {
  return (
    <Wrapper active={filterListOpen === true}>
      {filterListOpen && <ModalBackground />}
      <FilterContainer active={filterListOpen === true}>
        <FilterTit>
          <GoSettings /> 필터
        </FilterTit>
        <ul>
          <InputWrap>
            <FilterInput
              defaultChecked
              id="all"
              type="radio"
              name="bookFilter"
            />
            <CheckIcon />
            <FilterLabel htmlFor="all">전체 도서</FilterLabel>
          </InputWrap>
          <InputWrap>
            <FilterInput id="read" type="radio" name="bookFilter" />
            <CheckIcon />
            <FilterLabel htmlFor="read">읽은 도서</FilterLabel>
          </InputWrap>
        </ul>
        <Border />
        <ul>
          <InputWrap>
            <CategoryInput
              defaultChecked
              id="date"
              type="radio"
              name="categoryFilter"
            />
            <FilterLabel htmlFor="date">서재등록 순으로 정렬</FilterLabel>
            <SortIcon>
              <BiSortUp />
            </SortIcon>
          </InputWrap>
          <InputWrap>
            <CategoryInput id="subject" type="radio" name="categoryFilter" />
            <FilterLabel htmlFor="subject">제목 순으로 정렬</FilterLabel>
            <SortIcon>
              <BiSortUp />
            </SortIcon>
          </InputWrap>
          <InputWrap>
            <CategoryInput id="day" type="radio" name="categoryFilter" />
            <FilterLabel htmlFor="day">발행 순으로 정렬</FilterLabel>
            <SortIcon>
              <BiSortUp />
            </SortIcon>
          </InputWrap>
        </ul>
        <SubmitBtn
          onClick={() => {
            setFilterListOpen(false);
          }}
        >
          확인
        </SubmitBtn>
      </FilterContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
`;

const FilterContainer = styled.aside`
  position: fixed;
  top: 0;
  bottom: 0;
  right: ${({ active }) => (active ? "0" : "-300px")};
  padding: 40px 25px;
  width: 300px;
  background: #fff;
  transition: 0.35s ease;
  z-index: 999;
`;

const FilterTit = styled.h5`
  margin: 0 0 30px;
  font-size: 18px;
  color: rgb(153 153 153);
`;

const InputWrap = styled.li`
  position: relative;

  + li {
    margin-top: 7px;
  }
`;

const FilterInput = styled.input`
  margin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:checked + span {
    background-position: 0 -25px;
  }

  &:checked + span + label {
    font-weight: 600;
  }
`;

const CategoryInput = styled.input`
  margin: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:checked + label {
    font-weight: 600;
  }

  &:checked + label + span {
    opacity: 1;
  }
`;

const CheckIcon = styled.span`
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 5px;
  background-image: url(/images/MyBooks/spl_input.png);
  background-repeat: no-repeat;
  background-size: 100px 100px;
  background-position: 0 0;
`;

const SortIcon = styled.span`
  display: inline-block;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: rgb(153 153 153);
  opacity: 0;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  line-height: 24px;
  vertical-align: top;
`;

const Border = styled.hr`
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ddd;
`;
