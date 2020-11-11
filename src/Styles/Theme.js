import { css } from "styled-components";

export const theme = {
  yellow: "rgba(252, 235, 96, 1)",
  purple: "rgba(164, 81, 247, 1)",
  yellowOpacity: "rgba(252, 235, 96, 0.5)",
  purpleOpacity: "rgba(164, 81, 247, 0.5)",
};

export const commonContainer = css`
  width: 1280px;
  margin: 0 auto;
`;

export const clearFix = css`
  &::after {
    content: "";
    display: block;
    clear: both;
  }
`;

export const positionCenter = css`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
