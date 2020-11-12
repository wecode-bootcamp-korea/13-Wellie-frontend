import { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import styled from "styled-components";
import { API, TOKEN } from "../../config";

function MyBooksManager(props) {
  const [bookList, setBookList] = useState([]);
  const [bookShelfInput, setbookShelfInput] = useState("");
  const [checkBookList, setCheckBookList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    !history.location.state
      ? fetch(`${API}/library/mybook`, {
          headers: {
            Authorization: TOKEN,
          },
        })
          .then((res) => res.json())
          .then((res) => setBookList(res))
      : fetch(`${API}/library/mybook${history.location.state.id}`, {
          headers: {
            Authorization: TOKEN,
          },
        })
          .then((res) => res.json())
          .then((res) => setBookList(res));
  }, []);

  const handleChangeBookShelfNameInput = (e) => {
    const { value } = e.target;
    setbookShelfInput(value);
  };

  const handleChangesingleCheck = (e, id) => {
    const { checked } = e.target;

    if (checked) {
      setCheckBookList([...checkBookList, id]);
    } else {
      setCheckBookList(checkBookList.filter((el) => el !== id));
    }
  };

  const handleClickBookShelfAdd = () => {
    if (!bookShelfInput.length) {
      alert("책장 이름을 입력해주세요.");
    } else if (!checkBookList.length) {
      alert("도서를 선택해주세요.");
    } else {
      fetch(`${API}/library/shelfdetail`, {
        method: "post",
        headers: {
          Authorization: TOKEN,
        },
        body: JSON.stringify({
          booklist: checkBookList,
          shelfname: bookShelfInput,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          alert("책장이 추가되었습니다.");
          history.push("/my_books_manager");
        });
    }
  };

  return (
    <ManagerWrapper>
      {!history.location.state ? (
        <ManagerHeader>새로운 책장</ManagerHeader>
      ) : (
        <ManagerHeader>책장 수정</ManagerHeader>
      )}
      <Container>
        <TopBanner>
          <InputWrap>
            <BookShelfNameInput
              type="text"
              placeholder="책장 이름을 입력해주세요."
              onChange={handleChangeBookShelfNameInput}
            />
          </InputWrap>
        </TopBanner>
      </Container>
      <Container>
        <ListWrap>
          {bookList.books &&
            bookList.books.map((item) => (
              <List key={item.id}>
                <SelectInput
                  id={item.id}
                  type={"checkbox"}
                  checked={checkBookList.includes(item.id) ? true : false}
                  onChange={(e) => {
                    handleChangesingleCheck(e, item.id);
                  }}
                />
                <SelectLabel htmlFor={item.id}></SelectLabel>
                <ImgWrap>
                  <img src={item.bookCoverImg} alt="도서 책커버" />
                </ImgWrap>
                <BookInfo>
                  <h5>{item.bookName}</h5>
                  <p>
                    {item.writer.map((item, idx) => (
                      <span key={idx}>{item}</span>
                    ))}
                  </p>
                </BookInfo>
              </List>
            ))}
        </ListWrap>
        <AddBtnWrap>
          {!history.location.state ? (
            <BookShelfAddBtn onClick={() => handleClickBookShelfAdd()}>
              책장 만들기
            </BookShelfAddBtn>
          ) : (
            <BookShelfAddBtnWrap>
              <BookShelfAddBtn color="gray">삭제</BookShelfAddBtn>
              <BookShelfAddBtn>저장</BookShelfAddBtn>
            </BookShelfAddBtnWrap>
          )}
        </AddBtnWrap>
      </Container>
    </ManagerWrapper>
  );
}

export default withRouter(MyBooksManager);

const ManagerWrapper = styled.div`
  min-height: 100vh;
  background: #eee;
`;

const ManagerHeader = styled.header`
  position: fixed;
  top: 65px;
  width: 100%;
  padding: 16px;
  border-bottom: 1px solid #ddd;
  background: #fff;
  text-align: center;
  font-weight: 600;
  font-size: 17px;
  z-index: 2;
`;

const TopBanner = styled.div`
  position: fixed;
  top: 102px;
  width: 700px;
  background: rgb(134, 134, 134);
  z-index: 1;
`;

const Container = styled.div`
  position: relative;
  width: 700px;
  margin: 0 auto;
`;

const InputWrap = styled.div`
  min-height: 150px;
`;

const BookShelfNameInput = styled.input`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 12px;
  background: none;
  border-bottom: 1px solid rgb(155, 155, 155);
  font-size: 20px;
  color: rgba(255, 255, 255, 0.75);

  &::placeholder {
    color: rgba(255, 255, 255, 0.75);
  }
`;

const BookShelfAddBtnWrap = styled.div`
  display: flex;
  width: 100%;
`;

const ListWrap = styled.ul`
  min-height: 100vh;
  padding: 250px 0 50px;
  background: #fff;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
`;

const List = styled.li`
  position: relative;
  display: table;
  background: #fff;
  padding: 25px;
  border-bottom: 1px dashed #ddd;

  &:hover {
    background: rgb(250 250 250);
  }

  &:last-child {
    border-bottom: none;
  }

  img {
    max-width: 65px;
    border: 1px solid rgb(232 232 232);
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.125);
  }
`;

const ImgWrap = styled.div`
  display: table-cell;
`;

const BookInfo = styled.div`
  display: table-cell;
  width: 100%;
  padding: 20px;
  vertical-align: middle;

  h5 {
    margin-bottom: 8px;
    font-weight: 600;
  }

  p {
    font-size: 14px;
    color: rgb(121, 121, 121);
  }
`;

const AddBtnWrap = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  width: 700px;
  height: 50px;
`;

const BookShelfAddBtn = styled.button`
  width: 100%;
  background: ${({ color }) =>
    color === "gray" ? "rgb(229 229 229)" : "#9268bb"};
  font-size: 16px;
  font-weight: 600;
  transition: 0.35s ease;
  cursor: pointer;
  color: #fff;
`;

const SelectInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.125);
  }

  &:checked + label {
    background: rgba(164, 81, 247, 0.3);
  }

  &:checked + label + div > img {
    border: 1px solid rgb(164, 81, 247);
  }
`;

const SelectLabel = styled.label`
  background: rgba(164, 81, 247, 0);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  cursor: pointer;
`;
