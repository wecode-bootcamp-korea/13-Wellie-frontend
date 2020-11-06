import styled, { css } from "styled-components";
import { commonContainer } from "../../../Styles/Theme";

export const userProfileImg = css`
  display: block;
  width: 75px;
  height: 75px;
  margin: 0 auto;
  position: relative;
  border-radius: 50%;
  border: 1px solid #eee;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.125);
  overflow: hidden;
`;

export const SortingWrap = styled.div`
  ${commonContainer}
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto 40px;

  > ul {
    display: flex;

    li + li {
      margin-left: 5px;
    }
  }

  b {
    font-weight: 600;
  }
`;

export const SortingBtns = styled.button`
  display: inline-block;
  width: 30px;
  height: 30px;
  padding: 0;
  background: none;
  font-size: 22px;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;

export const BtnsWrap = styled.ul`
  display: flex;
  align-items: center;
  height: 100%;
`;

export const InputWrap = styled.li`
  position: relative;
  background: rgb(250, 250, 250);
  margin: 0 15px 0 0;
  padding: 5px 15px;
  border-radius: 50px;

  input {
    width: 100%;
    height: 30px;
    padding-right: 25px;
    background: transparent;
    color: rgb(102, 102, 102);
  }

  span {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.7);
  }
`;

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
`;

export const SubmitBtn = styled.button`
  position: absolute;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);
  width: 250px;
  padding: 12px 15px;
  background: rgb(146, 104, 187);
  border-radius: 3px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
`;
