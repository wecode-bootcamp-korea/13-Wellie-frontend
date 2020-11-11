import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import PaymentButton from "./PaymentButton";
import { agreementItemsPayment } from "../Signup/data/agreementItemsPayment";

export default function Payments() {
  const history = useHistory();
  const location = useLocation();

  const today = new Date(Date.now());
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() === 11 ? 1 : today.getMonth() + 1;
  const currentDay = today.getDate();
  const yearFromNow = currentYear + 1;
  const monthFromNow = currentMonth === 12 ? 1 : currentMonth + 1;

  const period = location.state.period ? location.state.period : "1개월";
  const price = location.state.price ? location.state.price : 9500;
  const type = location.state.type ? location.state.type : "전자책";
  const productToOrder = `${type} ${period === "1개월" ? "월" : "연"} 정기구독`;

  const currentDateString = `${currentYear}/${currentMonth}/${currentDay}`;
  const endDateString =
    period === "1개월"
      ? `${
          currentMonth === 12 ? yearFromNow : currentYear
        }/${monthFromNow}/${currentDay}`
      : `${yearFromNow}/${monthFromNow}/${currentDay}`;

  const discount =
    period === "1개월" ? price - 1 : Math.round((price / 12) * 2);
  const originalPrice =
    period === "1개월" ? price : Math.round(price + discount);
  const finalPrice = originalPrice - discount;
  const priceList = [
    {
      priceType: "상품금액",
      price: `${originalPrice.toLocaleString("en-US")}원`,
    },
    {
      priceType: "할인금액",
      price: `(-) ${discount.toLocaleString("en-US")}원`,
    },
    {
      priceType: "총 결제금액",
      price: `${finalPrice.toLocaleString("en-US")}원`,
    },
  ];

  const paymentMethodList = [
    {
      paymentTypeImg:
        "https://icons.iconarchive.com/icons/iconsmind/outline/512/Credit-Card-2-icon.png",
      paymentTypeName: "신용카드",
      paymentTypePG: "html5_inicis",
    },
    {
      paymentTypeImg:
        "https://www.pngkey.com/png/full/388-3889634_introduction-of-kakao-pay-kakaopay-png.png",
      paymentTypeName: "카카오페이",
      paymentTypePG: "kakao",
    },
    {
      paymentTypeImg:
        "https://ozimg.flyasiana.com/temp/image/20200114/e6d84679-be5f-442b-a814-812be0d83395.png",
      paymentTypeName: "페이코",
      paymentTypePG: "payco.AUTOPAY",
    },
  ];

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isMandatory1Checked, setIsMandatory1Checked] = useState(false);
  const [isMandatory2Checked, setIsMandatory2Checked] = useState(false);

  const isAllMandatoryChecked = isMandatory1Checked && isMandatory2Checked;
  const checkedItemsObj = {
    0: isAllChecked,
    1: isMandatory1Checked,
    2: isMandatory2Checked,
  };

  const toggleCheckedItems = (e) => {
    const checkItemId = Number(e.target.id);
    if (checkItemId !== 0) {
      if (checkItemId === 1) setIsMandatory1Checked(!isMandatory1Checked);
      if (checkItemId === 2) setIsMandatory2Checked(!isMandatory2Checked);
    } else {
      if (!isAllChecked) {
        setIsMandatory1Checked(true);
        setIsMandatory2Checked(true);
      } else {
        setIsMandatory1Checked(false);
        setIsMandatory2Checked(false);
      }
    }
  };

  useEffect(() => {
    setIsAllChecked(isMandatory1Checked && isMandatory2Checked);
  }, [isMandatory1Checked, isMandatory2Checked]);

  const [selectedPayment, setSelectedPayment] = useState("");
  const [selectedPaymentPG, setSelectedPaymentPG] = useState("");
  const selectPaymentMethod = (e) => {
    setSelectedPayment(e.target.name);
    setSelectedPaymentPG(e.target.id);
  };

  return (
    <StyledPayments>
      <Header>
        결제정보 입력
        <img
          src="images/gnb_logo_yellow.png"
          alt="logo"
          onClick={() => history.push("/today")}
        />
      </Header>
      <PaymentsContainer>
        <SubscriptionInfo>
          <h2>{productToOrder}</h2>
          <h3>{`구독기간: ${currentDateString} ~ ${endDateString}`}</h3>
          <h3>{`다음결제일: ${endDateString}`}</h3>
        </SubscriptionInfo>
        <PaymentPriceHeading>결제 금액</PaymentPriceHeading>
        <PaymentPriceContainer>
          {priceList?.map((item) => {
            return (
              <PaymentPriceItem>
                <h3>{item.priceType}</h3>
                <p>{item.price}</p>
              </PaymentPriceItem>
            );
          })}
        </PaymentPriceContainer>
        <PaymentPriceHeading>결제 금액</PaymentPriceHeading>
        <PaymentMethodContainer>
          {paymentMethodList?.map((item) => {
            return (
              <PaymentMethodItem
                name={item.paymentTypeName}
                id={item.paymentTypePG}
                selectedPayment={selectedPayment}
                onClick={selectPaymentMethod}
              >
                <div>
                  <img src={item.paymentTypeImg} alt={item.paymentTypeName} />
                </div>
                <p>{item.paymentTypeName}</p>
              </PaymentMethodItem>
            );
          })}
        </PaymentMethodContainer>
        <CellInputHeading>
          휴대폰 번호<span>*</span>
        </CellInputHeading>
        <CellInputContainer>
          <CellInput
            disabled={true}
            value={window.localStorage.getItem("userCell")}
          />
          <CellUpdateInfo>
            휴대폰번호 수정은 마이페이지에서 가능합니다.
          </CellUpdateInfo>
        </CellInputContainer>
        <AgreementHeading>약관 동의</AgreementHeading>
        <AgreementContainer>
          {agreementItemsPayment?.map((item) => {
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
        <PaymentButton
          isAllMandatoryChecked={isAllMandatoryChecked}
          selectedPaymentPG={selectedPaymentPG}
          productToOrder={productToOrder}
          finalPrice={finalPrice}
        />
      </PaymentsContainer>
    </StyledPayments>
  );
}

const StyledPayments = styled.div`
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #000;
  text-align: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;

  img {
    width: 80px;
    height: auto;
    position: absolute;
    right: 2%;
    top: 1%;
    cursor: pointer;
  }
`;

const PaymentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75vh;
  padding: 30px 0;
  position: relative;
  overflow: auto;
`;

const SubscriptionInfo = styled.div`
  width: 610px;
  margin-bottom: 20px;

  h2 {
    font-weight: 700;
    font-size: 17px;
    margin-bottom: 10px;
  }

  h3 {
    margin-bottom: 5px;
    font-size: 15px;
    color: #666;
  }
`;

const PaymentPriceHeading = styled.div`
  width: 615px;
  font-size: 18px;
  font-weight: 700;
  color: #000;
  text-indent: 3px;
  margin-bottom: 5px;
  position: relative;
`;

const PaymentPriceItem = styled.li`
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 15px 5px;
  margin: 0 10px;

  h3,
  p {
    font-size: 16px;
  }

  h3 {
    color: #666;
  }

  p {
    color: #000;
    margin-right: 15px;
  }

  &:last-child:before {
    content: "";
    position: absolute;
    top: 5%;
    height: 1px;
    width: 98%;
    background: #666;
  }

  &:last-child h3,
  &:last-child p {
    padding: 10px 0;
  }

  &:last-child p {
    font-weight: 700;
    font-size: 18px;
  }
`;

const PaymentPriceContainer = styled.ul`
  width: 610px;
  border-radius: 10px;
  padding: 10px 0;
  margin-bottom: 30px;
  border: 1px solid #ccc;

  ${PaymentPriceItem}
`;

const PaymentMethodItem = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 195px;
  height: 90px;
  border-radius: 5px;
  background: #fff;
  border: ${({ theme, name, selectedPayment }) =>
    name === selectedPayment ? `2px solid ${theme.yellow}` : "1px solid #ccc"};
  cursor: pointer;

  div {
    width: 50px;
    height: 20px;
    margin-bottom: 5px;
    background-color: rbga(0, 0, 0, 0.3);
    opacity: ${({ name, selectedPayment }) =>
      name === selectedPayment ? "1" : "0.4"};
    overflow: hidden;

    img {
      height: 100%;
    }
  }

  p {
    font-size: 12px;
  }
`;

const PaymentMethodContainer = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 610px;
  margin-bottom: 30px;

  ${PaymentMethodItem}
`;

const CellInputContainer = styled.div`
  margin-bottom: 30px;
`;

const CellInputHeading = styled(PaymentPriceHeading)`
  span {
    position: absolute;
    top: 0;
    color: #a450f7;
  }
`;

const CellInput = styled.input.attrs((props) => ({
  type: "text",
  name: "userCell",
  id: "userCell",
  maxLength: "11",
}))`
  width: 610px;
  height: 36px;
  border-radius: 3px;
  text-indent: 5px;
  letter-spacing: 0.05em;
  border: 1px solid #eee;

  &::placeholder {
    color: #a5a5a5;
  }
`;

const CellUpdateInfo = styled.p`
  width: 610px;
  font-size: 11px;
  text-indent: 5px;
  margin-top: 5px;
  color: #666;
`;

const AgreementHeading = styled(PaymentPriceHeading)``;

const AgreementContainer = styled.div`
  width: 615px;
  padding: 5px 0;
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
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  input {
    z-index: 2;
    opacity: 0;
  }

  span {
    z-index: 1;
    background: ${({ theme }) => theme.yellowOpacity};

    &:after {
      position: absolute;
      top: 3px;
      left: 4.5px;
      content: "\u2713";
      font-size: 80%;
      color: #000;
      display: none;
    }
  }

  & input:checked ~ span:after {
    display: block;
  }

  &:first-child {
    font-size: 14px;
    margin-bottom: 15px 0;
    border-bottom: 1px solid #eee;
  }

  &:last-child {
    padding-bottom: 5px;
  }
`;
