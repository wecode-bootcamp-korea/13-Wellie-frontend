import { useHistory } from "react-router";
import styled from "styled-components";
import Swal from "sweetalert2";
import { SUBSCRIPTION_API } from "../../config";

export default function PaymentButton({
  isAllMandatoryChecked,
  selectedPaymentPG,
  productToOrder,
  finalPrice,
}) {
  const history = useHistory();
  const userCell = window.localStorage.getItem("userCell");

  const orderData = {
    pg: selectedPaymentPG,
    pay_method: selectedPaymentPG,
    merchant_uid: "merchant_" + new Date().getTime(),
    name: productToOrder,
    amount: finalPrice,
    buyer_tel: userCell,
    buyer_email: "null@null.com",
  };

  const paymentCallback = (res) => {
    const { success, error_msg } = res;
    const userToken = window.localStorage.getItem("Authorization");
    if (success) {
      try {
        fetch(SUBSCRIPTION_API, {
          method: "POST",
          headers: {
            Authorization: userToken,
          },
        });
      } catch (err) {
        alert("POST Error. Failed to send userToken to server.");
      }
      Swal.fire({
        icon: "success",
        iconColor: "rgba(164, 81, 247, 1)",
        text: `결제 성공. ${productToOrder}을 축하합니다.`,
        showConfirmButton: false,
        timer: 1700,
      });
      setTimeout(() => {
        history.push("/my_books");
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        iconColor: "rgba(252, 235, 96, 1)",
        text: `결제 실패: ${error_msg}`,
      });
    }
  };

  const onClickPayment = (props) => {
    const { IMP } = window;
    IMP.init("imp25869855");

    IMP.request_pay(orderData, paymentCallback);
  };

  return (
    <OrderButton
      isAllMandatoryChecked={isAllMandatoryChecked}
      selectedPayment={selectedPaymentPG}
      onClick={onClickPayment}
    >
      {`${finalPrice.toLocaleString("en-US")}원 결제하기`}
    </OrderButton>
  );
}

const OrderButton = styled.button.attrs((props) => ({
  disabled: !props.isAllMandatoryChecked,
}))`
  position: fixed;
  z-index: 5;
  bottom: 5%;
  width: 620px;
  border-radius: 10px;
  padding: 10px 0;
  font-weight: 700;
  font-size: 16px;
  ${({ theme, isAllMandatoryChecked, selectedPaymentPG }) => {
    if (isAllMandatoryChecked && selectedPaymentPG !== "") {
      return `color: #000; background: ${theme.yellow}; cursor: pointer;`;
    } else {
      return `color: #000; background: ${theme.yellowOpacity};`;
    }
  }}
`;
