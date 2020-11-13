/* global Kakao */

import styled from "styled-components";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { VALIDATE_SOCIAL_LOGIN_API } from "../../../../config";
import Swal from "sweetalert2";

export function KakaoLogin() {
  const history = useHistory();
  useEffect(() => {
    Kakao.init("27eda77757f6ae91d23a2e90cad22c6a");
  }, []);

  console.log(Kakao.isInitialized());
  const loginWithKakao = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        const kakaoAccessToken = authObj.access_token;
        console.log(kakaoAccessToken);
        fetch(VALIDATE_SOCIAL_LOGIN_API, {
          method: "POST",
          headers: {
            Authorization: authObj.access_token,
          },
          body: JSON.stringify({
            userType: 2,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.MESSAGE === "SUCCESS") {
              localStorage.setItem("Authorization", data.Authorization);
              Swal.fire({
                icon: "success",
                iconColor: "rgba(164, 81, 247, 1)",
                text: "Wellie 멤버가 되신 것을 환영합니다!",
                showConfirmButton: false,
                timer: 1700,
              });
              setTimeout(() => {
                history.push("/search");
              }, 2000);
            } else if (data.MESSAGE === "Signup_First") {
              Swal.fire({
                icon: "warning",
                iconColor: "rgba(252, 235, 96, 1)",
                text: "가입되지 않은 소셜 정보입니다. 회원가입을 진행해주세요.",
                confirmButtonText: "확인",
              });
              history.push({
                pathname: "/set_account",
                state: {
                  socialToken: kakaoAccessToken,
                  userType: 2,
                },
              });
            }
          });
      },
      fail: function (err) {
        alert(JSON.stringify(err));
      },
    });
  };

  return (
    <KakaoButton onClick={loginWithKakao}>
      <img src="./images/Login/kakao_logo.png" alt="kakao login" />
    </KakaoButton>
  );
}

const KakaoButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 55%;
    height: auto;
  }

  & {
    background: #ffe810;
  }
`;
