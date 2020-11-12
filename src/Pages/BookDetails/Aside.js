import styled from "styled-components";
import { COMPLETED_BTN_IMG, SAVE_BTN_IMG } from "../../config";

function Aside({
  setIsActiveReadNow,
  isActiveReadNow,
  isSaved,
  setIsSaved,
  onSave,
}) {
  return (
    <AsideContainer>
      <Container>
        <ul>
          <Menu isSaved={isSaved} setIsSaved={setIsSaved}>
            <img alt="save" src={isSaved ? COMPLETED_BTN_IMG : SAVE_BTN_IMG} />
            <button onClick={onSave}>
              {isSaved ? "담기 완료" : "내 서재에 담기"}
            </button>
          </Menu>
          <Menu>
            <img
              alt="share"
              src="https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/share-sharing-socialmedia-social-network-exchange-256.png"
            />
            <button>공유하기</button>
          </Menu>
        </ul>
        <ReadNow onClick={() => setIsActiveReadNow(!isActiveReadNow)}>
          바로 읽기
        </ReadNow>
      </Container>
    </AsideContainer>
  );
}

export default Aside;

const AsideContainer = styled.div`
  width: 280px;
  position: relative;
`;

const Container = styled.aside`
  position: fixed;
  top: 64px;
  width: 280px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-left: 1px solid rgb(223, 223, 223);
  border-right: 1px solid rgb(223, 223, 223);
`;

const Menu = styled.li`
  height: 47px;
  width: 280px;
  background-color: transparent;
  border-bottom: 1px solid rgb(223, 223, 223);
  padding-left: 25px;
  display: flex;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
  }

  button {
    font-size: 15px;
    background-color: transparent;
    font-weight: 750;
    text-align: left;
    line-height: 47px;
    padding-left: 10px;
    color: ${({ isSaved }) => isSaved && "rgb(193,193,193)"};
  }
`;

const ReadNow = styled.button`
  width: 240px;
  height: 50px;
  color: white;
  background-color: rgb(51, 51, 51);
  border-radius: 7px;
  margin-bottom: 80px;
`;
