import { useState } from "react";
import styled from "styled-components";
import Comment from "./Components/Comment";
import { DEFAULT_IMG, API_BOOK } from "../../config";

function CommentSection({
  comments,
  setComments,
  data,
  moreBtnColor,
  setMoreBtnColor,
}) {
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [isActiveMoreBtn, setIsActiveMoreBtn] = useState(false);
  const [commentValue, setCommentValue] = useState("");

  const getValueInput = (e) => {
    setCommentValue(e.target.value);
  };

  const changeBtnColor = () => {
    commentValue.length >= 1 ? setIsActiveBtn(true) : setIsActiveBtn(false);
    comments.length > 3 ? setMoreBtnColor(true) : setMoreBtnColor(false);
  };

  const addComment = (id) => {
    const newComment = {
      user_name: data.user_name,
      user_img: DEFAULT_IMG,
      user_comment: commentValue,
      date: "2020.10.23",
    };

    fetch(`${API_BOOK}/${data.book_id}/comment`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
      body: JSON.stringify({
        content: newComment.user_comment,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (commentValue.length >= 1) {
          setComments([
            ...comments,
            { ...newComment, comment_id: res.MESSAGE },
          ]);
          setCommentValue("");
        }
      });

    setIsActiveMoreBtn(true);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      addComment();
    }
  };

  const handleMoreComments = () => {
    setIsActiveMoreBtn(!isActiveMoreBtn);
  };

  const onRemove = (id) => {
    fetch(`${API_BOOK}/${data.book_id}/comment?comment_id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("Authorization"),
      },
    }).then((response) => {
      if (response.status === 204) {
        setComments(comments.filter((comment) => comment.comment_id !== id));
      }
    });
  };

  return (
    <Container isActiveMoreBtn={isActiveMoreBtn}>
      <div className="reviewContainer">
        <h1>
          한 줄 리뷰
          <p>{comments?.length}</p>
        </h1>
      </div>
      <CommentList comments={comments} isActiveMoreBtn={isActiveMoreBtn}>
        {comments.map(
          ({
            comment_id,
            user_name,
            user_comment,
            user_img,
            date,
            likebutton,
          }) => (
            <Comment
              onRemove={onRemove}
              id={comment_id}
              key={comment_id}
              userName={user_name}
              userComment={user_comment}
              userImg={user_img}
              date={date}
              likeBtn={likebutton}
            />
          )
        )}
        <MoreComment moreBtnColor={moreBtnColor} onClick={handleMoreComments}>
          {isActiveMoreBtn ? "접기" : "더보기"}
        </MoreComment>
      </CommentList>

      <CommentResister>
        <img
          src="https://secure.gravatar.com/avatar/64c49b6f852ad598fd9f6ad571a663a8?s=1024&d=mm&r=g"
          alt=""
        />
        <div>
          <input
            maxLength="50"
            value={commentValue}
            onChange={getValueInput}
            onKeyDown={handleEnter}
            onKeyUp={changeBtnColor}
            placeholder="한 줄 리뷰를 남겨주세요"
          />
          <Button isActiveBtn={isActiveBtn} onClick={addComment}>
            등록
          </Button>
        </div>
      </CommentResister>
      <p className="commentLength">
        {commentValue.length} <span>/</span> 50
      </p>
    </Container>
  );
}

export default CommentSection;

const Container = styled.section`
  padding: 24px;
  max-height: ${({ isActiveMoreBtn }) => (isActiveMoreBtn ? "" : "480px")};
  position: relative;
  .reviewContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      display: flex;
      font-size: 16px;
      font-weight: 700;
      p {
        margin-left: 5px;
        color: rgb(255, 185, 1);
      }
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  .commentLength {
    text-align: right;
    font-size: 14px;
    color: rgb(139, 139, 139);
    margin-right: 10px;
    span {
      color: rgb(196, 196, 196);
    }
  }
`;

const CommentList = styled.ul`
  max-height: ${({ isActiveMoreBtn }) => (isActiveMoreBtn ? "" : "330px")};
  overflow: hidden;
  position: relative;
`;

const MoreComment = styled.button`
  cursor: pointer;
  width: 60px;
  height: 30px;
  border-radius: 20px;
  position: absolute;
  bottom: 0;
  left: 49%;
  background-color: transparent;
  color: ${({ moreBtnColor }) =>
    moreBtnColor ? "rgb(195,195,195)" : "rgb(250,250,244)"};
  border: ${({ moreBtnColor }) =>
    moreBtnColor ? "1px solid rgb(195,195,195)" : "1px solid rgb(250,250,244)"};
`;

const CommentResister = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 30px;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  div {
    width: 910px;
    height: 48px;
    border: 1px solid rgb(223, 223, 223);
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      margin-left: 20px;
      width: 100%;
      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: rgb(193, 193, 193);
      }
    }
  }
`;

const Button = styled.button`
  width: 64px;
  height: 30px;
  border-radius: 5px;
  font-size: 12px;
  color: ${({ isActiveBtn }) => (isActiveBtn ? "white" : "rgb(195, 195, 195)")};
  background-color: ${({ isActiveBtn }) =>
    isActiveBtn ? "rgb(106,108,164)" : "rgb(223, 223, 223)"};
  margin-right: 10px;
`;
