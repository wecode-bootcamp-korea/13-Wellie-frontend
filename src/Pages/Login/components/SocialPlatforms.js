import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { KakaoLogin } from "./SocialLoginComponents/KakaoLogin";
import GoogleLogin from "./SocialLoginComponents/GoogleLogin";
import {
  socialLogosItems,
  socialLogoSpecs,
} from "../data/loginNjoinSocialLogosData";

function SocialPlatforms() {
  const [socialList, setSocialList] = useState([]);

  useEffect(() => {
    setSocialList(socialLogosItems);
  }, [socialList]);

  return (
    <SocialLoginContainerUl>
      <KakaoLogin />
      <GoogleLogin />
      {/* {socialList?.map((item) => {
        return (
          <SocialLogoItem name={item.name} color={item.color} key={item.id}>
            <img name={item.name} src={item.src} alt={`$login with {item.name}`} />
          </SocialLogoItem>
        );
      })} */}
    </SocialLoginContainerUl>
  );
}

export default SocialPlatforms;

const SocialLoginContainerUl = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 20px;
  margin-top: 20px;
`;

const SocialLogoItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;

  img {
    width: ${({ name }) => socialLogoSpecs[name].width};
    height: auto;
  }

  & {
    background: ${({ name }) => socialLogoSpecs[name].color};
  }
`;
