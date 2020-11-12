/* global gapi */

import { useEffect } from "react";
import styled from "styled-components";

// export const initiateGoogleLoginAPI = () => {
//   window.gapi.load("auth2", () => {
//     const auth2 = window.gapi.auth2.init({
//       client_id:
//         "801910834418-rffe6g21mfunkail5e3gmhuiaij24oi4.apps.googleusercontent.com",
//     });
//   });
// };

export default function GoogleLogin() {
  // window.gapi.load("auth2", function () {
  //   window.gapi.auth2.init({
  //     client_id:
  //       "801910834418-rffe6g21mfunkail5e3gmhuiaij24oi4.apps.googleusercontent.com",
  //   });
  // });

  const onSignIn = (googleUser) => {
    const accessToken = googleUser.getAuthResponse().access_token;
    const validateLoginAPI = "http://10.58.7.192:8000/user/login";
    try {
      const res = fetch(validateLoginAPI, {
        method: "POST",
        headers: {
          token: accessToken,
        },
        body: JSON.stringify({
          userType: 5,
        }),
      });
      const data = res.json();
      if (data.MESSAGE === "SUCCESS") {
        window.localStorage.setItem("Authorization", data.Authorization);
        alert("Login success");
      } else {
        alert("Response: Fail");
      }
    } catch (err) {
      alert("POST Error");
    }
  };

  // window.gapi.load("signin2", () => {
  //   window.gapi.signin2.render("my-signin2", {
  //     onsuccess: onSignIn,
  //     // onfailure: onSignInFail,
  //   });
  // });

  // const onSignIn = () => {
  //   console.log("hihihi");
  // const profile = googleUser.getBasicProfile();
  // console.log(`ID: ${profile.getId()}`);
  // };

  // useEffect(() => {
  //   gapi.load("auth2", () => {
  //     gapi.auth2.init({
  //       client_id:
  //         "801910834418-rffe6g21mfunkail5e3gmhuiaij24oi4.apps.googleusercontent.com",
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   gapi.load("signin2", () => {
  //     gapi.signin2.render("my-signin2", {
  //       onsuccess: onSignIn,
  //     });
  //   });
  // }, []);

  return (
    <GoogleButton>
      <div className="g-signin2" data-onsuccess={onSignIn}></div>
      <img
        src="./images/Login/google_signin_buttons/web/1x/btn_google_signin_light_pressed_web.png"
        alt="login with google"
      />
    </GoogleButton>
  );
}

const GoogleButton = styled.div`
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  .g-signin2 {
    position: absolute;
    z-index: 3;
    left: 3px;
  }

  img {
    position: absolute;
    z-index: 2;
    left: 0;
    height: 100%;
    width: auto;
  }

  & {
    background: #fff;
  }
`;
