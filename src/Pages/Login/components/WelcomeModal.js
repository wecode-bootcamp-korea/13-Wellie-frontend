import { useHistory } from "react-router";
import styled from "styled-components";

export default function WelcomeModal(props) {
  const history = useHistory();

  return (
    <StyledWelcomeModal isActive={props.isActive}>
      <WelcomeModalContent>
        <ButtonsContainer>
          <ToSubscribeButton onClick={() => history.push("/subscribe")}>
            구독하러 가기
          </ToSubscribeButton>
          <ToLoginButton onClick={() => history.push("/today")}>
            메인으로 가기
          </ToLoginButton>
        </ButtonsContainer>
      </WelcomeModalContent>
    </StyledWelcomeModal>
  );
}

const StyledWelcomeModal = styled.div`
  display: ${({ isActive }) => (isActive ? "block" : "none")};
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const WelcomeModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 40vh;
  margin: 0 auto;
  margin-top: 18%;
  border-radius: 10px;
  background: #fefefe;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToLoginButton = styled.button`
  width: 200px;
  height: 80px;
  border-radius: 10px;
  background: ${({ theme }) => theme.yellow};
  color: #000;
  font-size: 18px;
  cursor: pointer;
  margin: 15px 0;

  &:hover {
    box-shadow: 0 0 5px 2px #cdcdcd;
  }
`;

const ToSubscribeButton = styled(ToLoginButton)`
  background: ${({ theme }) => theme.purple};
  color: #fff;

  &:hover {
    box-shadow: 0 0 5px 2px #cdcdcd;
  }
`;
