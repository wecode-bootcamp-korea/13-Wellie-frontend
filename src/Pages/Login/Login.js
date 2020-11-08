import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import SocialPlatforms from "./SocialPlatforms";
import { loginImagesArr } from "./loginImagesData";

const loginImgWidth = window.innerWidth;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginImages: [],
      loginImgCount: 0,
      currentImgId: 1,
      loginImgsXcoordinate: 0,
      loginImgsTransitionDelay: 800,
      slideIntervalDelay: 5000,
      userCell: "",
      userPw: "",
      socialList: [],
    };
  }

  componentDidMount = () => {
    const { slideIntervalDelay } = this.state;
    this.setState({
      loginImages: loginImagesArr,
      loginImgCount: loginImagesArr.length,
    });
    this.timerId = setInterval(this.loginSlideAuto, slideIntervalDelay);
    window.addEventListener("resize", this.windowReload);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { currentImgId, slideIntervalDelay } = this.state;
    if (currentImgId !== prevState.currentImgId) {
      clearInterval(this.timerId);
      this.timerId = setInterval(this.loginSlideAuto, slideIntervalDelay);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.timerId);
  };

  windowReload = () => {
    window.location.reload();
  };

  loginSlideAuto = () => {
    const { loginImages, loginImgsXcoordinate, currentImgId } = this.state;
    const xIncrement = loginImgWidth * -1;
    const isLastImg = currentImgId === loginImages.length;
    this.setState({
      currentImgId: isLastImg ? 1 : currentImgId + 1,
      loginImgsXcoordinate: isLastImg ? 0 : loginImgsXcoordinate + xIncrement,
      loginImgsTransitionDelay: isLastImg ? 0 : 800,
      slideIntervalDelay: isLastImg ? 0 : 8000,
    });
  };

  handleIdPw = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: name === "userCell" ? e.target.value.replace(/^\D+$/, "") : value,
    });
  };

  validateAndGoToToday = async () => {
    const { userCell, userPw } = this.state;
    const validateLoginAPI = "http://10.58.7.192:8000/user/login";
    try {
      const res = await fetch(validateLoginAPI, {
        method: "POST",
        body: JSON.stringify({
          userType: 1,
          userCell: userCell,
          password: userPw,
        }),
      });
      const data = await res.json();
      if (data.MESSAGE === "SUCCESS") {
        Swal.fire({
          icon: "success",
          iconColor: "rgba(164, 81, 247, 1)",
          text: "Welcome to Wellie",
          showConfirmButton: false,
          timer: 1600,
        });
        setTimeout(() => {
          this.props.history.push("/today");
        }, 2000);
      } else {
        Swal.fire({
          icon: "warning",
          iconColor: "rgba(252, 235, 96, 1)",
          text:
            "휴대폰번호/비밀번호가 올바르지 않습니다. 확인 후 다시 로그인 해주세요.",
        });
      }
    } catch (err) {
      alert("POST Error");
    }
  };

  validateAndGoToTodayOnEnter = (e) => {
    if (e.key === "Enter") {
      this.validateAndGoToToday();
    }
  };

  render() {
    const {
      loginImages,
      loginImgsXcoordinate,
      loginImgsTransitionDelay,
      userCell,
      userPw,
    } = this.state;
    return (
      <StyledLogin className="Login">
        <BackgroundImgContainer
          className="backgroundImagesContainer"
          xCor={loginImgsXcoordinate}
          transDelay={loginImgsTransitionDelay}
        >
          {loginImages?.map((image) => {
            return (
              <BackgroundImg className="backgroundImagesItem" key={image.id}>
                <img
                  className="backgroundImages"
                  src={image.src}
                  alt={image.alt}
                />
              </BackgroundImg>
            );
          })}
        </BackgroundImgContainer>
        <LoginContents>
          <Logo
            className="login logo"
            src="./images/gnb_logo_yellow.png"
            alt="logo"
          />
          <LoginContainer>
            <LoginForm>
              <CellInput
                className="CellNumInput"
                placeholder="휴대폰 번호"
                value={userCell}
                onChange={this.handleIdPw}
                onKeyPress={this.validateAndGoToTodayOnEnter}
              />
              <PwInput
                className="PwInput"
                placeholder="비밀번호"
                value={userPw}
                onChange={this.handleIdPw}
                onKeyPress={this.validateAndGoToTodayOnEnter}
              />
              <LoginButton onClick={this.validateAndGoToToday}>
                휴대폰 번호 로그인
              </LoginButton>
            </LoginForm>
            <Or>또는</Or>
            <SocialPlatforms />
            <LoginJoinLinkContainer>
              <Link className="Link" to="/signup">
                <li className="signup">회원가입</li>
              </Link>
              <span>|</span>
              <Link className="Link" to="/pw_reset">
                <li className="pwReset">비밀번호 재설정</li>
              </Link>
            </LoginJoinLinkContainer>
          </LoginContainer>
        </LoginContents>
      </StyledLogin>
    );
  }
}

export default Login;

const StyledLogin = styled.div`
  height: 100vh;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 -35em 50em 18em rgba(0, 0, 0, 0.95);
`;

const BackgroundImgContainer = styled.ul`
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 1;
  height: 100%;
  transform: translate(${({ xCor }) => xCor}px, 0);
  transition: transform ${({ transDelay }) => transDelay}ms;
`;

const BackgroundImg = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  opacity: 0.3;

  .backgroundImages {
    width: 125%;
  }
`;

const LoginContents = styled.div`
  display: flex;
  flex-direction: column;
  justify=content: flex=end;
  align-items: center;
  width: 280px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
`;

const Logo = styled.img`
  height: 25px;
  width: auto;
  position: absolute;
  z-index: 2;
  top: 11%;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40%;
  position: absolute;
  z-index: 2;
  bottom: 11%;
  background: transparent;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #959494;
`;

const LoginInput = styled.input`
  width: 80%;
  background: transparent;
  color: #fff;
  font-size: 16px;
  text-indent: 0.6em;
  border-bottom: 2px solid #959494;
  padding-bottom: 7px;
  margin-top: 18px;

  &::placeholder {
    color: #959494;
    text-shadow: 0 0 2px black;
  }
`;

const CellInput = styled(LoginInput).attrs((props) => ({
  type: "text",
  name: "userCell",
  maxLength: "11",
}))``;

const PwInput = styled(LoginInput).attrs((props) => ({
  type: "password",
  name: "userPw",
}))``;

const LoginButton = styled.button.attrs((props) => ({
  type: "button",
}))`
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
  }

  span {
    font-size: 0.8em;
    font-weight: 700;
    margin: 0 10px;
  }
`;
