import styled from "styled-components";
import { ModalContent } from "./ModalContent";
import { MdClose } from "react-icons/md";
import { ModalBackground } from "./Style";
import { flexCenter } from "../../../Styles/Theme";

export function Modal({ setIsOpen, bookShelfCase }) {
  return (
    <Wrapper>
      <ModalBackground
        onClick={() => {
          setIsOpen(false);
        }}
      />
      <ModalContainer>
        <BookShelfName>{bookShelfCase?.bookShelfName}</BookShelfName>
        <CloseBtn
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <MdClose />
        </CloseBtn>
        <Inner>
          <ModalContent bookShelfCase={bookShelfCase} />
        </Inner>
      </ModalContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
`;

const ModalContainer = styled.div`
  width: 960px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  z-index: 999;
`;

const Inner = styled.div`
  position: relative;
  height: 560px;
  margin-top: 50px;
  padding: 30px 30px 30px 20px;
  overflow-y: scroll;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  font-size: 28px;
  color: rgb(0, 0, 0, 0.3);
  cursor: pointer;
`;

const BookShelfName = styled.h4`
  position: absolute;
  left: 30px;
  top: 30px;
  font-size: 18px;
  font-weight: 600;
`;
