import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import Swal from "sweetalert2";
import { randomNNData } from "../data/randomNNData";
import { agreementItemsSignup } from "../data/agreementItemsSignup";
import { VALIDATE_SIGNUP_API, CHECK_NICKNAME_API } from "../../../config";

export default function SetAccount(props) {
  const history = useHistory();
  const location = useLocation();

  const [pwInput, setPwInput] = useState("");
  const [rePwInput, setRePwInput] = useState("");
  const handlePwInput = (e) => {
    e.target.name === "pwInput"
      ? setPwInput(e.target.value)
      : e.target.name === "rePwInput"
      ? setRePwInput(e.target.value)
      : alert("error");
  };
  const pwVerifRegex = /^(?=.{8,16})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/;
  const isPwValid = pwVerifRegex.test(pwInput);
  const isPwMatched = isPwValid && pwInput === rePwInput;

  const [nickNameInput, setNickNameInput] = useState("");
  const suggestedNickName = `${randomNNData.adj[randomNNData.adjRandIdx]}${
    randomNNData.noun[randomNNData.nounRandIdx]
  }_${randomNNData.num}`;
  const isValidNickName = nickNameInput.length > 2;
  const handleNickNameInput = (e) => {
    setNickNameInput(e.target.value);
  };
  const [isNickNameChecked, setIsNickNameChecked] = useState(false);
  const checkNickName = async () => {
    //   setIsNickNameChecked(true);
    // };
    try {
      const res = await fetch(CHECK_NICKNAME_API + nickNameInput);
      const data = await res.json();
      if (data.MESSAGE === "SUCCESS") {
        Swal.fire({
          icon: "success",
          iconColor: "rgba(164, 81, 247, 1)",
          text: "사용 가능한 필명입니다.",
          showConfirmButton: false,
          timer: 1700,
        });
        setIsNickNameChecked(true);
      } else {
        Swal.fire({
          icon: "warning",
          iconColor: "rgba(252, 235, 96, 1)",
          text: "이미 등록된 필명입니다.\n다른 필명을 입력해주세요.",
          confirmButtonText: "확인",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        iconColor: "rgba(252, 235, 96, 1)",
        text: " Server GET Error",
        showConfirmButton: false,
        timer: 1700,
      });
      setIsNickNameChecked(true);
    }
  };

  const checkNickNameOnEnter = (e) => {
    if (e.key === "Enter") {
      if (nickNameInput.length <= 2) {
        Swal.fire({
          icon: "warning",
          iconColor: "rgba(252, 235, 96, 1)",
          text: "필명은 3~12자로 입력해주세요.",
          confirmButtonText: "확인",
        });
      } else checkNickName();
    }
  };

  useEffect(() => {
    if (isNickNameChecked) {
      setIsNickNameChecked(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nickNameInput]);

  const [idFrontInput, setIdFrontInput] = useState("");
  const [idBackInput, setIdBackInput] = useState("");
  const yyyymmddVerifRegex = /^(\d{2})((0[1-9]|1[0-2]))((0[1-9])|([1-2][0-9])|(3[01]))$/;
  const idBackVerifRegex = /^[1234]$/;
  const isIdFrontValid = yyyymmddVerifRegex.test(idFrontInput);
  const isIdBackValid = idBackVerifRegex.test(idBackInput);
  const isIdNumValid = isIdFrontValid && isIdBackValid;
  const handleIdNumInput = (e) => {
    e.target.name === "idFrontInput"
      ? setIdFrontInput(e.target.value)
      : e.target.name === "idBackInput"
      ? setIdBackInput(e.target.value)
      : alert("error");
  };

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isMandatory1Checked, setIsMandatory1Checked] = useState(false);
  const [isMandatory2Checked, setIsMandatory2Checked] = useState(false);
  const [isMandatory3Checked, setIsMandatory3Checked] = useState(false);
  const [isOptionalChecked, setIsOptionalChecked] = useState(false);
  const isAllMandatoryChecked =
    isMandatory1Checked && isMandatory2Checked && isMandatory3Checked;
  const checkedItemsObj = {
    0: isAllChecked,
    1: isMandatory1Checked,
    2: isMandatory2Checked,
    3: isMandatory3Checked,
    4: isOptionalChecked,
  };
  const toggleCheckedItems = (e) => {
    const checkItemId = Number(e.target.id);
    if (checkItemId !== 0) {
      if (checkItemId === 1) setIsMandatory1Checked(!isMandatory1Checked);
      if (checkItemId === 2) setIsMandatory2Checked(!isMandatory2Checked);
      if (checkItemId === 3) setIsMandatory3Checked(!isMandatory3Checked);
      if (checkItemId === 4) setIsOptionalChecked(!isOptionalChecked);
    } else {
      if (!isAllChecked) {
        setIsMandatory1Checked(true);
        setIsMandatory2Checked(true);
        setIsMandatory3Checked(true);
        setIsOptionalChecked(true);
      } else {
        setIsMandatory1Checked(false);
        setIsMandatory2Checked(false);
        setIsMandatory3Checked(false);
        setIsOptionalChecked(false);
      }
    }
  };

  useEffect(() => {
    setIsAllChecked(
      isMandatory1Checked &&
        isMandatory2Checked &&
        isMandatory3Checked &&
        isOptionalChecked
    );
  }, [
    isMandatory1Checked,
    isMandatory2Checked,
    isMandatory3Checked,
    isOptionalChecked,
  ]);

  const areAllInputsValid =
    isPwValid && isPwMatched && isNickNameChecked && isIdNumValid;
  const isAllValid = areAllInputsValid && isAllMandatoryChecked;
  // const isAllValid = true;

  const goToLogin = () => {
    history.push("/login");
  };

  const validateSignup = async () => {
    try {
      const res = await fetch(VALIDATE_SIGNUP_API, {
        method: "POST",
        body: JSON.stringify({
          userType: 1,
          userCell: location.state.userCell,
          nickName: nickNameInput,
          password: pwInput,
        }),
      });
      const data = await res.json();
      if (data.MESSAGE === "SUCCESS") {
        Swal.fire({
          icon: "success",
          iconColor: "rgba(164, 81, 247, 1)",
          text: "Wellie 멤버가 되신 것을 환영합니다!",
          showConfirmButton: false,
          timer: 1700,
        });
        setTimeout(goToLogin, 2000);
      } else {
        Swal.fire({
          icon: "warning",
          iconColor: "rgba(252, 235, 96, 1)",
          text: "이미 등록된 가입정보 입니다. 확인 후 다시 시도해주세요.",
          confirmButtonText: "확인",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        iconColor: "rgba(252, 235, 96, 1)",
        text: " Server POST Error",
        showConfirmButton: false,
        timer: 1700,
      });
    }
  };

  return (
    <StyledSetAccount>
      <Header>
        계정 설정 및 서비스 약관 동의
        <img src="images/gnb_logo_yellow.png" alt="logo" />
      </Header>
      <SetAccountContainer>
        <PwHeading>
          비밀번호 설정<span>*</span>
        </PwHeading>
        <PwInputForm isPwValid={isPwValid} isPwMatched={isPwMatched}>
          <EnterPw
            placeholder="비밀번호 입력"
            value={pwInput}
            onChange={handlePwInput}
          />
          <EnterPwChecker isPwValid={isPwValid}>
            {isPwValid
              ? "비밀번호 조건 충족"
              : "영문 대/소문자, 숫자를 포함한 8~16자 조합으로 입력해주세요"}
          </EnterPwChecker>
          <ReEnterPw
            placeholder="비밀번호 재입력"
            value={rePwInput}
            onChange={handlePwInput}
          />
          <ReEnterPwChecker isPwMatched={isPwMatched}>
            {isPwMatched ? "비밀번호 일치" : "비밀번호가 일치하지 않습니다"}
          </ReEnterPwChecker>
        </PwInputForm>
        <NickNameHeading>
          필명 설정<span>*</span>
        </NickNameHeading>
        <NickNameContainer isNickNameChecked={isNickNameChecked}>
          <NickNameInput
            placeholder={`필명 입력 (예: ${suggestedNickName})`}
            value={nickNameInput}
            onChange={handleNickNameInput}
            onKeyPress={checkNickNameOnEnter}
          ></NickNameInput>
          <CheckNickNameButton
            onClick={checkNickName}
            isValidNickName={isValidNickName}
            isNickNameChecked={isNickNameChecked}
          >
            {isNickNameChecked ? "\u2713" : "중복 확인"}
          </CheckNickNameButton>
          <NickNameChecker isNickNameChecked={isNickNameChecked}>
            {isNickNameChecked
              ? "중복확인 완료"
              : "한글, 영문, 언더스코어 및 숫자 조합 최소 3자리. 필명 입력 후 중복확인을 진행해주세요"}
          </NickNameChecker>
        </NickNameContainer>
        <IdNumHeading>
          주민등록번호 앞 7자리 입력 <span>*</span>
          <p>(본인확인용)</p>
        </IdNumHeading>
        <IdNumContainer isIdNumValid={isIdNumValid}>
          <IdNumInputContainer>
            <IdFrontInput
              placeholder="YYMMDD"
              value={idFrontInput}
              onChange={handleIdNumInput}
            ></IdFrontInput>
            <p>-</p>
            <IdBackInput
              placeholder=""
              value={idBackInput}
              onChange={handleIdNumInput}
            ></IdBackInput>
            <IdBackRemainder>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </IdBackRemainder>
          </IdNumInputContainer>
          <IdNumChecker isIdNumValid={isIdNumValid}>
            {isIdNumValid
              ? "주민등록번호 입력 확인"
              : "주민등록번호 앞 생년월일 6자리와 뒤 1자리를 입력해주세요."}
          </IdNumChecker>
        </IdNumContainer>
        <AgreementHeading>약관 동의</AgreementHeading>
        <AgreementContainer>
          {agreementItemsSignup?.map((item) => {
            return (
              <AgreementLabel for={item.id} key={item.id}>
                {item.name}
                <input
                  type="checkbox"
                  name={item.name}
                  id={item.id}
                  checked={checkedItemsObj[item.id.toString()]}
                  onChange={toggleCheckedItems}
                />
                <span name={item.name} id={item.id} />
              </AgreementLabel>
            );
          })}
        </AgreementContainer>
        <SignupButton
          onClick={validateSignup}
          areAllInputsValid={areAllInputsValid}
          isAllValid={isAllValid}
        >
          가입 완료
        </SignupButton>
      </SetAccountContainer>
    </StyledSetAccount>
  );
}

const StyledSetAccount = styled.div`
  position: relative;
  z-index: 1;
`;

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

const SetAccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75vh;
  padding: 30px 0;
  position: relative;
  overflow: auto;
`;

const PwHeading = styled.label`
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

const PwInputForm = styled.div`
  width: 615px;
  margin: 10px 0;
  position: relative;

  &:after {
    position: absolute;
    content: "";
    left: 5%;
    right: 5%;
    height: 0.7px;
    width: 90%;
    border-bottom: 0.6px solid
      ${({ theme, isPwValid, isPwMatched }) =>
        isPwValid && isPwMatched ? theme.purple : theme.yellow};
  }
`;

const EnterPw = styled.input.attrs((props) => ({
  type: "password",
  name: "pwInput",
  maxLength: "16",
}))`
  width: 610px;
  height: 36px;
  border-radius: 3px;
  text-indent: 5px;
  letter-spacing: 0.1em;
  border: 1px solid #eee;

  &::placeholder {
    color: #a5a5a5;
  }
`;

const EnterPwChecker = styled.p`
  display: flex;
  width: 610px;
  font-size: 11px;
  text-indent: 5px;
  color: ${({ theme, isPwValid }) => (isPwValid ? theme.purple : "#cdcdcd")};
  padding-top: 5px;
  margin-bottom: 15px;

  &:before {
    display: ${({ isPwValid }) => (isPwValid ? "block" : "none")};
    content: "\u2713";
  }
`;

const ReEnterPw = styled(EnterPw).attrs((props) => ({
  type: "password",
  name: "rePwInput",
  maxLength: "16",
}))`
  background: "#eee";
`;

const ReEnterPwChecker = styled(EnterPwChecker)`
  color: ${({ theme, isPwMatched }) =>
    isPwMatched ? theme.purple : "#cdcdcd"};

  &:before {
    display: ${({ isPwMatched }) => (isPwMatched ? "block" : "none")};
  }
`;

const NickNameHeading = styled(PwHeading)``;

const NickNameContainer = styled(PwInputForm)`
  &:after {
    border-bottom: 0.6px solid
      ${({ theme, isNickNameChecked }) =>
        isNickNameChecked ? theme.purple : theme.yellow};
  }
`;

const NickNameInput = styled(EnterPw).attrs((props) => ({
  type: "text",
  name: "nickNameInput",
}))`
  width: 495px;
  margin-right: 10px;
  border: 0.2px solid
    ${({ isNickNameChecked }) =>
      !isNickNameChecked ? "#eee" : "rgba(164, 81, 247, 0.5)"};
`;

const CheckNickNameButton = styled.button.attrs((props) => ({
  disabled: !props.isValidNickName || props.isNickNameChecked,
}))`
  width: 100px;
  height: 40px;
  border-radius: 3px;

  ${({ theme, isValidNickName, isNickNameChecked }) => {
    if (!isValidNickName) {
      return `color: #000; background: ${theme.yellowOpacity};`;
    } else {
      if (isNickNameChecked) {
        return `color: #fff; background: ${theme.purpleOpacity}; cursor: default;`;
      } else {
        return `color: #000; background: ${theme.yellow}; cursor: pointer`;
      }
    }
  }}
`;

const NickNameChecker = styled(EnterPwChecker)`
  color: ${({ theme, isNickNameChecked }) =>
    isNickNameChecked ? theme.purple : "#cdcdcd"};

  &:before {
    display: ${({ isNickNameChecked }) =>
      isNickNameChecked ? "block" : "none"};
  }
`;

const IdNumHeading = styled(PwHeading)`
  display: flex;
  align-items: flex-end;
  position: relative;

  span {
    left: 185px;
  }

  p {
    position: absolute;
    right: 0;
    font-size: 12px;
    color: #a5a5a5;
  }
`;

const IdNumContainer = styled(PwInputForm)`
  &:after {
    border-bottom: 0.6px solid
      ${({ theme, isIdNumValid }) =>
        isIdNumValid ? theme.purple : theme.yellow};
  }
`;

const IdNumInputContainer = styled.div`
  width: 615px;
  display: flex;
  align-items: center;
`;

const IdFrontInput = styled(EnterPw).attrs((props) => ({
  type: "text",
  name: "idFrontInput",
  maxLength: 6,
}))`
  width: 395px;
  margin-right: 10px;
`;

const IdBackInput = styled(EnterPw).attrs((props) => ({
  type: "text",
  name: "idBackInput",
  maxLength: 1,
}))`
  width: 30px;
  margin-left: 10px;
  text-indent: 0;
  text-align: center;
`;

const IdBackRemainder = styled.ul`
  display: flex;
  align-items: center;

  li {
    width: 15px;
    height: 15px;
    margin: 0 5px;
    border-radius: 50%;
    background: #000;
  }
`;

const IdNumChecker = styled(EnterPwChecker)`
  color: ${({ theme, isIdNumValid }) =>
    isIdNumValid ? theme.purple : "#cdcdcd"};

  &:before {
    display: ${({ isIdNumValid }) => (isIdNumValid ? "block" : "none")};
  }
`;

const AgreementHeading = styled(PwHeading)``;

const AgreementContainer = styled.div`
  width: 615px;
  padding: 5px 0;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #eee;
`;

const AgreementLabel = styled.label`
  display: block;
  padding: 10px 0 10px 30px;
  font-size: 12px;
  position: relative;
  margin-bottom: 5px 0;
  cursor: pointer;

  input,
  span {
    margin: 8px 0 10px 5px;
    position: absolute;
    top: 0;
    left: 2px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }

  input {
    z-index: 2;
    opacity: 0;
  }

  span {
    z-index: 1;
    border-radius: 50%;
    background: ${({ theme }) => theme.yellowOpacity};

    &:after {
      position: absolute;
      top: 3px;
      left: 4px;
      content: "\u2713";
      font-size: 80%;
      color: #fff;
      display: none;
    }
  }

  & input:checked ~ span {
    background: ${({ theme }) => theme.purpleOpacity};
  }

  & input:checked ~ span:after {
    display: block;
  }

  &:first-child {
    font-size: 14px;
    margin-bottom: 15px 0;
    border-bottom: 1px solid #eee;

    input,
    span {
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
    }

    span {
      &:after {
        top: 4px;
        left: 5.5px;
      }
    }
  }

  &:last-child {
    padding-bottom: 5px;
  }
`;

const SignupButton = styled.button.attrs((props) => ({
  disabled: !props.isAllValid,
}))`
  position: fixed;
  z-index: 5;
  bottom: 5%;
  width: 620px;
  border-radius: 10px;
  padding: 10px 0;
  font-weight: 700;
  font-size: 16px;
  ${({ theme, areAllInputsValid, isAllValid }) => {
    if (!areAllInputsValid) {
      return `color: #000; background: ${theme.yellowOpacity};`;
    } else {
      if (isAllValid) {
        return `color: #fff; background: ${theme.purple}; cursor: pointer;`;
      } else {
        return `color: #ededed; background: ${theme.purpleOpacity};`;
      }
    }
  }}
`;
