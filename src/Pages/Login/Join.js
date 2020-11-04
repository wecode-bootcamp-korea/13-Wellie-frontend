import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SocialPlatforms from "./SocialPlatforms";

export default class Join extends Component {
  constructor() {
    super();
    this.state = {
      socialList: [],
    };
  }

  goToSignup = () => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <StyledJoin>
        <BackgroundImgContainer>
          <img
            className="joinImage"
            src="./images/Login/library7.jpeg"
            alt="join page background"
          />
        </BackgroundImgContainer>
        <JoinContents>
          <FreeMonthAnnounce>
            <h2 className="freeMonthText">
              첫 달은
              <br />
              <span>무료로</span>
              <br />
              시작하기
            </h2>
            <img
              className="logoIcon"
              src="./images/logo_icon.png"
              alt="logo icon"
            />
          </FreeMonthAnnounce>
          <JoinContainer>
            <JoinButton onClick={this.goToSignup}>
              휴대폰 번호로 시작하기
            </JoinButton>
            <Or>또는</Or>
            <SocialPlatforms />
            <LoginJoinLinkContainer>
              <Link className="Link" to="/">
                <li className="signup">이미 회원이신가요? 로그인</li>
              </Link>
            </LoginJoinLinkContainer>
          </JoinContainer>
        </JoinContents>
      </StyledJoin>
    );
  }
}

const StyledJoin = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 -35em 50em 18em rgba(0, 0, 0, 0.95);
`;

const BackgroundImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  bottom: -5%;
  z-index: 1;
  overflow: hidden;
  opacity: 0.4;

  .joinImage {
    width: 100%;
  }
`;

const JoinContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 280px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
`;

const FreeMonthAnnounce = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  position: absolute;
  z-index: 2;
  top: 11%;
  transform: rotate(-1deg);

  .freeMonthText {
    font-family: "Noto Serif KR", serif;
    font-size: 48px;
    font-weight: 200;
    font-style: italic;
    line-height: 1.2em;
    letter-spacing: -0.1em;
    color: #fff;

    span {
      font-family: "Noto Serif KR", serif;
      font-weight: 700;
      color: #ebcb76;
    }
  }

  .logoIcon {
    width: 11px;
    height: 11px;
    position: absolute;
    bottom: 8%;
    right: 15%;
  }
`;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 40%;
  position: absolute;
  z-index: 2;
  bottom: 11%;
  padding-bottom: 6px;
  background: transparent;
`;

const JoinButton = styled.button`
  width: 80%;
  font-size: 16px;
  color: white;
  text-shadow: 0 0 2px gray;
  border-radius: 50px;
  padding: 12px 0;
  margin-top: 30px;
  background: linear-gradient(45deg, #be7ed2, #f2d57c);
  opacity: 0.9;
  cursor: pointer;
  transition: opacity 500ms;

  &:hover {
    opacity: 1;
  }
`;

const Or = styled.p`
  text-align: center;
  width: 100%;
  color: #959494;
  font-size: 10px;
  margin-top: 25px;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    height: 1px;
    bottom: 40%;
    right: 10%;
    width: 35%;
    background: #959494;
  }

  &::after {
    position: absolute;
    content: "";
    height: 1px;
    bottom: 40%;
    left: 10%;
    width: 35%;
    background: #959494;
  }
`;

const LoginJoinLinkContainer = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  margin-top: 20px;
  position: relative;

  .Link {
    color: #fff;

    li::after {
      position: absolute;
      content: "";
      height: 1px;
      width: 54%;
      bottom: -30%;
      left: 23%;
      background: #fff;
    }
  }
`;
