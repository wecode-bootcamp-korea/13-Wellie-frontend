import { css } from "styled-components";

export const theme = {
  yellow: "rgba(252, 235, 96, 1)",
  purple: "rgba(164, 81, 247, 1)",
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
