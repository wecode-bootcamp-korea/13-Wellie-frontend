import styled from "styled-components";

function DescSection({ data, comments }) {
  return (
    <Container data={data}>
      <Book alt="" src={data.image_url} />
      <div className="container">
        <BookDesc>
          <p>{data.title}</p>
          <p>{data.author} (지은이)</p>
          <p>내서재에 담긴 책 5권 이상부터 취향지수 제공</p>
        </BookDesc>
        <div className="descBox">
          <InfoBox>
            <img
              src="https://secure.gravatar.com/avatar/64c49b6f852ad598fd9f6ad571a663a8?s=1024&d=mm&r=g"
              alt=""
            />
            <p>함께 읽는 사람</p>
            <p>5,724명</p>
          </InfoBox>
          <div></div>
          <InfoBox>
            <img
              alt=""
              src="https://cdn0.iconfinder.com/data/icons/free-daily-icon-set/512/Comments-256.png"
            />
            <p>한 줄 리뷰</p>
            <p>{comments?.length}개</p>
          </InfoBox>
        </div>
      </div>
    </Container>
  );
}

export default DescSection;

const Container = styled.section`
  display: flex;
  border-bottom: 12px solid rgb(247, 247, 247);
  padding: 32px 24px;
  .container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-left: 40px;
    .descBox {
      width: 690px;
      height: 88px;
      background-color: rgb(250, 250, 246);
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div:nth-child(2) {
        width: 1px;
        height: 50px;
        background-color: rgb(223, 223, 223);
      }
    }
  }
`;

const Book = styled.img`
  width: 220px;
  height: 322px;
  box-shadow: 5px 5px 5px rgb(189, 189, 189);
`;

const BookDesc = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  p {
    &:first-child {
      height: 32px;
      margin-bottom: 2px;
      font-size: 20px;
      font-weight: 700;
    }
    &:nth-child(2) {
      margin-bottom: 19px;
      font-size: 12px;
      color: rgb(139, 139, 139);
    }
    &:last-child {
      font-size: 14px;
    }
  }
`;

const InfoBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  img {
    width: 20px;
    height: 20px;
    background-color: transparent;
    border-radius: 50%;
  }

  p {
    font-size: 10px;
    color: rgb(139, 139, 139);

    &:last-child {
      font-size: 14px;
      font-weight: 750;
      color: rgb(85, 85, 85);
    }
  }
`;
