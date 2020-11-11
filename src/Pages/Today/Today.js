import React from "react";
import styled from "styled-components";

export default function Today() {
  return (
    <StyledToday>
      <div>투데이 페이지</div>
    </StyledToday>
  );
}

const StyledToday = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid red;

  div {
    font-weight: 700;
    font-size: 58px;
    color: ${({ theme }) => theme.purple};
  }
`;
