// import styled from "styled-components";
// import { useLocation } from "react-router";
// // import KakaoLogin from ".";

// // export default function KaKaoLoginPkg() {
// //   <KaoKaoLogin
// // }

// const kakaoLoginAPIData = {
//   client_id: "fd1ad94606691e18781b3fe557e3686e",
//   host_url: "http://localhost:3000",
//   redirect_uri: "http://localhost:3000/login",
//   response_type: "code",
// };

// function KakaoLogin(props) {
//   const location = useLocation();
//   const accessCode = location.search.slice(6);
//   console.log(accessCode);
//   const loginWithKakao = async () => {
//     console.log(
//       `getting kakao token....\nclient_id: ${kakaoLoginAPIData["client_id"]}`
//     );

//     const kakaoAccessTokenRequestAPI = "https://kauth.kakao.com/oauth/token";
//     if (accessCode !== null) {
//       try {
//         const res = await fetch(kakaoAccessTokenRequestAPI);
//         console.log(res);
//       } catch (err) {
//         alert("GET Error. Cannot get Access Code");
//       }
//     }
//   };

//   return (
//     <KakaoButton
//       href={`https://kauth.kakao.com/oauth/authorize?client_id=${kakaoLoginAPIData.client_id}&redirect_uri=${kakaoLoginAPIData.redirect_uri}&response_type=code`}
//       onClick={loginWithKakao}
//     >
//       <img src="./images/Login/kakao_logo.png" alt="kakao login" />
//     </KakaoButton>
//   );
// }

// export default KakaoLogin;

// const KakaoButton = styled.a`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   overflow: hidden;
//   cursor: pointer;

//   img {
//     width: 65%;
//     height: auto;
//   }

//   & {
//     background: #ffe810;
//   }
// `;

/* global Kakao */

import styled from "styled-components";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { KAKAO_LOGIN_API, VALIDATE_LOGIN_API } from "../../../../config";

const KakaoInit = () => {
  Kakao.init("27eda77757f6ae91d23a2e90cad22c6a");
};

export function KakaoLogin() {
  const history = useHistory();
  useEffect(() => {
    // Kakao.init("27eda77757f6ae91d23a2e90cad22c6a");
    KakaoInit();
  }, []);

  console.log(Kakao.isInitialized());
  // console.log(localStorage.getItem("Authorization"));
  const loginWithKakao = () => {
    Kakao.Auth.login({
      // success: async (authObj) => {
      //   const res = await fetch(VALIDATE_LOGIN_API, {
      //     method: "POST",
      //     headers: {
      //       token: authObj.access_token,
      //     },
      //     body: {
      //       userType: 2,
      //     },
      //   });
      //   const data = await res.json();
      //   if (data.MESSAGE === "SUCCESS") {
      //     localStorage.setItem("Authorization", data.Authorization);
      //     console.log(localStorage.getItem("Authorization"));
      //     alert("로그인 성공");
      //     history.push("/search");
      //   } else {
      //     alert("Server response: FAIL");
      //   }
      // },
      success: function (authObj) {
        const kakaoAccessToken = authObj.access_token;
        console.log(kakaoAccessToken);
        fetch(KAKAO_LOGIN_API, {
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
              alert("로그인 성공");
              history.push("/search");
            } else if (data.MESSAGE === "Signup_First") {
              history.push("/");
              alert("Server response: FAIL");
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
    width: 65%;
    height: auto;
  }

  & {
    background: #ffe810;
  }
`;
