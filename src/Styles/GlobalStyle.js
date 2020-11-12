import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Noto+Serif+KR:wght@200;300;400;500;600;700;900&display=swap');

  ${reset}

  body{
    box-sizing: border-box;
    font-family: 'Noto Sans KR', 'Noto Serif KR', 'sans-serif', 'serif';
  }

  * {
    box-sizing: border-box;
  }
  
  a {
    text-decoration: none;
  }
  
  button,
  input {
    outline: none;
    border: none;
  }
`;

export default GlobalStyle;
