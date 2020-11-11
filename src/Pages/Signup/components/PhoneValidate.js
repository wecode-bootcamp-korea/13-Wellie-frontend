import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  USER_CELL_CHECK_API,
  PHONE_VALIDATE_CODE_CHECK_API,
} from "../../../config";

function PhoneValidate() {
  const history = useHistory();

  const [userCell, setUserCell] = useState("");
  const isCellInputValid = userCell.length >= 10;
  const handleCellInput = (e) => {
    setUserCell(e.target.value.replace(/^\D+$/, ""));
  };

  const initialTimer = 120;
  const [remainingTotalSeconds, setRemainingTotalSeconds] = useState(
    initialTimer
  );
  const remainingMinutes = Math.floor(remainingTotalSeconds / 60);
  const remainingSeconds = Math.floor(remainingTotalSeconds % 60);
  const remainingTime = `${remainingMinutes}:${remainingSeconds.toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2 }
  )}`;
  const [isRequestSent, setIsRequestSent] = useState(false);
  const sendRequest = async () => {
    setIsRequestSent(true);
  };
  //   if ((userCell.length === 11) & /^010.*$/.test(userCell)) {
  //     try {
  //       const res = await fetch(USER_CELL_CHECK_API, {
  //         method: "POST",
  //         body: JSON.stringify({
  //           userCell: userCell.toString(),
  //         }),
  //       });
  //       const data = await res.json();
  //       if (data.MESSAGE === "SUCCESS") {
  //         Swal.fire({
  //           icon: "success",
  //           iconColor: "rgba(164, 81, 247, 1)",
  //           text:
  //             "인증번호가 SMS로 전송되었습니다. 확인 후 제한시간 안에 입력해주세요.",
  //           confirmButtonText: "확인",
  //         });
  //         setIsRequestSent(true);
  //         setRemainingTotalSeconds(
  //           isRequestSent === true && remainingTotalSeconds !== initialTimer
  //             ? initialTimer
  //             : remainingTotalSeconds - 1
  //         );
  //       } else {
  //         Swal.fire({
  //           icon: "warning",
  //           iconColor: "rgba(252, 235, 96, 1)",
  //           text:
  //             "휴대폰 번호가 이미 등록되어 있습니다.\n해당 번호로 로그인을 진행하거나 다른 번호를 입력해주세요.",
  //           confirmButtonText: "확인",
  //         });
  //       }
  //     } catch (err) {
  //       Swal.fire({
  //         icon: "error",
  //         iconColor: "rgba(252, 235, 96, 1)",
  //         text: " Server POST Error",
  //         showConfirmButton: false,
  //         timer: 1700,
  //       });
  //     }
  //   } else {
  //     Swal.fire({
  //       icon: "error",
  //       iconColor: "rgba(252, 235, 96, 1)",
  //       text: "휴대폰 번호를 제대로 입력해주세요",
  //       showConfirmButton: false,
  //       timer: 1700,
  //     });
  //   }
  // };

  const sendRequestOnEnter = (e) => {
    if (e.key === "Enter") {
      sendRequest();
    }
  };

  const [codeInput, setCodeInput] = useState("");
  const handleCodeInput = (e) => {
    setCodeInput(e.target.value.replace(/^\D+$/, ""));
  };

  const isValidCode = codeInput.length === 6;
  const [isValidated, setIsValidated] = useState(false);
  const validateCode = () => {
    setIsValidated(true);
  };
  // const validateCode = async () => {
  //   try {
  //     const res = await fetch(PHONE_VALIDATE_CODE_CHECK_API, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         userCell: userCell,
  //         codeInput: codeInput,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (data.MESSAGE === "SUCCESS") {
  //       Swal.fire({
  //         icon: "success",
  //         iconColor: "rgba(164, 81, 247, 1)",
  //         text: "인증완료",
  //         showConfirmButton: false,
  //         timer: 1700,
  //       });
  //       setIsValidated(true);
  //     } else {
  //       Swal.fire({
  //         icon: "warning",
  //         iconColor: "rgba(252, 235, 96, 1)",
  //         text:
  //           "유효하지 않은 인증번호 입니다. 인증번호 재요청 또는 확인 후 다시 입력 바랍니다.",
  //         confirmButtonText: "확인",
  //       });
  //     }
  //   } catch (err) {
  //     Swal.fire({
  //       icon: "error",
  //       iconColor: "rgba(252, 235, 96, 1)",
  //       text: " Server POST Error",
  //       showConfirmButton: false,
  //       timer: 1700,
  //     });
  //   }
  // };

  const validateCodeOnEnter = (e) => {
    if (e.key === "Enter") {
      !isValidated
        ? validateCode()
        : history.push({
            pathname: "/set_account",
            state: { userCell: userCell },
          });
    }
  };

  useEffect(() => {
    if (isRequestSent && remainingTotalSeconds > 0) {
      const timerInterval = setInterval(() => {
        setRemainingTotalSeconds(remainingTotalSeconds - 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
    if (remainingTotalSeconds === 0 && !isValidated) {
      Swal.fire({
        icon: "warning",
        iconColor: "rgba(252, 235, 96, 1)",
        text:
          "입력시간이 초과되었습니다. 인증번호 재요청 후 다시 입력해주세요.",
        confirmButtonText: "확인",
      });
    }
  }, [isRequestSent, isValidated, remainingTotalSeconds]);

  return (
    <StyledPhoneValidate>
      <Header>
        휴대폰 인증
        <img src="images/gnb_logo_yellow.png" alt="logo" />
      </Header>
      <PhoneValidationContainer>
        <Label>
          휴대폰 번호<span>*</span>
        </Label>
        <RequestInputForm as="div">
          <RequestInput
            placeholder="휴대폰 번호 입력 ('-' 제외)"
            value={userCell}
            onChange={handleCellInput}
            onKeyPress={sendRequestOnEnter}
          />
          <RequestButton
            isCellInputValid={isCellInputValid}
            isRequestSent={isRequestSent}
            onClick={sendRequest}
          >
            {!isRequestSent ? "인증 요청" : "인증번호 재요청"}
          </RequestButton>
        </RequestInputForm>
        <CodeInputContainer isRequestSent={isRequestSent}>
          <CodeInput
            placeholder="인증번호 입력"
            value={codeInput}
            onChange={handleCodeInput}
            onKeyPress={validateCodeOnEnter}
            isRequestSent={isRequestSent}
            isValidated={isValidated}
          ></CodeInput>
          <ValidateButton
            isValidCode={isValidCode}
            isValidated={isValidated}
            onClick={validateCode}
          >
            인증 확인
          </ValidateButton>
          <CodeTimer isValidated={isValidated}>{remainingTime}</CodeTimer>
          <ValidationConfirm isValidated={isValidated}>
            인증완료
          </ValidationConfirm>
        </CodeInputContainer>
        <Info>
          <p>※ 본인 명의의 휴대폰 정보를 정확히 입력해 주시기 바랍니다.</p>
          <p>
            ※ 휴대폰 로그인의 경우, 해외 번호는 이용이 불가능하니 양해 바랍니다.
          </p>
          <p>
            ※ 타인의 명의를 도용하여 부정인증을 시도한 경우, 관련 법령에 따라
            처벌 (3년 이하의 징역 또는 1천만원 이하의 벌금)을 받을 수 있습니다.
          </p>
        </Info>
        <NextButton
          isRequestSent={isRequestSent}
          isValidated={isValidated}
          onClick={() =>
            history.push({
              pathname: "/set_account",
              state: { userCell: userCell },
            })
          }
        >
          다음
        </NextButton>
      </PhoneValidationContainer>
    </StyledPhoneValidate>
  );
}

export default PhoneValidate;

const StyledPhoneValidate = styled.div``;

const Header = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #000;
  text-align: center;
  padding: 15px 0;
  border-bottom: 1px solid #eeeeee;

  img {
    width: 80px;
    height: auto;
    position: absolute;
    right: 2%;
    top: 1%;
  }
`;

const PhoneValidationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 660px;
  height: 80vh;
  margin: 0 auto;
  padding: 30px 0;
  position: relative;
`;

const RequestInputForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const Label = styled.label`
  width: 615px;
  font-size: 16px;
  color: #000;
  text-indent: 5px;
  position: relative;

  span {
    position: absolute;
    top: 0;
    color: #a450f7;
  }
`;

const RequestInput = styled.input.attrs((props) => ({
  type: "text",
  name: "userCell",
  id: "userCell",
  maxLength: "11",
}))`
  width: 500px;
  height: 36px;
  margin-right: 10px;
  border-radius: 3px;
  text-indent: 5px;
  letter-spacing: 0.05em;
  border: 1px solid #eee;

  &::placeholder {
    color: #a5a5a5;
  }
`;

const RequestButton = styled.button.attrs((props) => ({
  type: "button",
  disabled: !props.isCellInputValid,
}))`
  width: 100px;
  height: 40px;
  border-radius: 3px;
  background: ${({ isRequestSent, theme }) =>
    isRequestSent ? theme.purple : theme.yellow};
  opacity: ${({ isRequestSent }) => (isRequestSent ? 0.7 : 1)};
  color: ${({ isRequestSent }) => (isRequestSent ? "#fff" : "#000")};
  cursor: ${({ isCellInputValid }) =>
    isCellInputValid ? "pointer" : "default"};
`;

const CodeInputContainer = styled.div`
  width: 615px;
  margin: 10px 0;
  position: relative;
  display: ${({ isRequestSent }) => (isRequestSent ? "flex" : "none")};
`;

const CodeInput = styled(RequestInput).attrs((props) => ({
  type: "text",
  name: "codeInput",
  id: "codeInput",
  maxLength: "6",
}))`
  width: ${({ isValidated }) => (isValidated ? "615px" : "500px")};
  margin-right: ${({ isValidated }) => (isValidated ? "0" : "10px")};
  border: 0.2px solid
    ${({ isRequestSent, theme }) =>
      isRequestSent ? theme.purpleOpacity : "#eee"};
`;

const CodeTimer = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.purple};
  position: absolute;
  right: 140px;
  top: 30%;
  visibility: ${({ isValidated }) => (isValidated ? "hidden" : "visible")};
`;

const ValidationConfirm = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.purple};
  position: absolute;
  right: ${({ isValidated }) => (isValidated ? "25px" : "140px")};
  top: 30%;
  visibility: ${({ isValidated }) => (isValidated ? "visible" : "hidden")};
`;

const ValidateButton = styled.button.attrs((props) => ({
  disabled: !props.isValidCode,
}))`
  width: 100px;
  height: 40px;
  border-radius: 3px;
  color: #000;
  background: #eee;
  border: ${({ isValidCode }) =>
    isValidCode ? "0.2px solid #7d7d7d" : "none"};
  display: ${({ isValidated }) => (isValidated ? "none" : "block")};
  cursor: ${({ isValidCode }) => (isValidCode ? "pointer" : "default")};
`;

const Info = styled.div`
  width: 615px;

  p {
    font-size: 10px;
    color: #cdcdcd;
    padding-top: 3px;
  }
`;

const NextButton = styled.button.attrs((props) => ({
  disabled: !props.isValidated,
}))`
  width: 615px;
  border-radius: 10px;
  position: absolute;
  bottom: 2%;
  padding: 10px 0;
  font-weight: 700;
  font-size: 16px;
  ${({ theme, isRequestSent, isValidated }) => {
    if (!isRequestSent) {
      return `color: #000; background: ${theme.yellowOpacity};`;
    } else {
      if (isValidated) {
        return `color: #fff; background: ${theme.purple}; cursor: pointer;`;
      } else {
        return `color: #ededed; background: ${theme.purpleOpacity};`;
      }
    }
  }}
`;
