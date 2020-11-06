import { css } from "styled-components";

export const theme = {
  yellow: "rgb(252,235,96)",
  purple: "rgb(164, 81, 247)",
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
