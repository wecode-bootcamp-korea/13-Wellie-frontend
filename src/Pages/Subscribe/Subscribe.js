import { useHistory } from "react-router";
import styled from "styled-components";

export default function Subscribe(props) {
  const history = useHistory();
  const userCell = window.localStorage.getItem("userCell");

  const today = new Date(Date.now());
  const currentMonth = today.getMonth() === 11 ? 1 : today.getMonth() + 1;
  const currentDay = today.getDate();
  const monthFromNow = currentMonth === 12 ? 1 : currentMonth + 1;

  const EbookSubscribeOptionItems = [
    {
      period: "1개월",
      price: 9500,
      type: "전자책",
      discountMessage: "첫 달 무료*",
    },
    {
      period: "1년",
      price: 95000,
      type: "전자책",
      discountMessage: "2개월 무료",
    },
  ];
  const PaperbackSubscribeOptionItems = [
    {
      period: "1개월",
      price: 15500,
      type: "종이책",
      discountMessage: "첫 달 무료*",
    },
    {
      period: "1년",
      price: 177000,
      type: "종이책",
      discountMessage: "2개월 무료",
    },
  ];

  return (
    <StyledSubscribe>
      <ContentContainer>
        <FirstMonthFreeAnounce>
          <h1>
            첫 달 무료
            <br />
            {`${monthFromNow}월 ${currentDay}일 까지`}
          </h1>
          <h2>{`결제일자 전인 ${monthFromNow}월 ${currentDay}일까지 언제든 해지할 수 있어요.`}</h2>
        </FirstMonthFreeAnounce>
        <SubscribeOptionsContainer>
          <EbookSubscribeContainer>
            <h3>전자책 정기구독</h3>
            <h4>10만권의 책을 언제 어디서나 만나보세요</h4>
            <EbookSubscribeOptionsContainer>
              {EbookSubscribeOptionItems?.map((item) => {
                return (
                  <SubscribeOptionItem
                    key={item.price}
                    onClick={() => {
                      history.push({
                        pathname: `/payments`,
                        state: {
                          period: item.period,
                          price: item.price,
                          type: item.type,
                          userCell: userCell,
                        },
                      });
                    }}
                  >
                    <h5>{item.period}</h5>
                    <span>{item.price.toLocaleString("en-US")}</span>
                    <p>{`${item.discountMessage} >`}</p>
                  </SubscribeOptionItem>
                );
              })}
            </EbookSubscribeOptionsContainer>
          </EbookSubscribeContainer>
          <PaperbackSubscribeContainer>
            <h3>윌리 오리지널 종이책 정기구독</h3>
            <h4>전자책 무제한에 종이책도 격월로 받아보세요</h4>
            <PaperbackSubscribeOptionsContainer>
              {PaperbackSubscribeOptionItems?.map((item) => {
                return (
                  <SubscribeOptionItem
                    key={item.price}
                    onClick={() => {
                      history.push({
                        pathname: "/payments",
                        state: {
                          period: item.period,
                          price: item.price,
                          type: item.type,
                          userCell: userCell,
                        },
                      });
                    }}
                  >
                    <h5>{item.period}</h5>
                    <span>{item.price.toLocaleString("en-US")}</span>
                    <p>{`${item.discountMessage} >`}</p>
                  </SubscribeOptionItem>
                );
              })}
            </PaperbackSubscribeOptionsContainer>
          </PaperbackSubscribeContainer>
        </SubscribeOptionsContainer>
        <UsageInfoContainer>
          <h4>이용 안내</h4>
          <ul>
            <li>
              ※ 첫 달 무료 체험 시 결제정보 등록을 위해 1원이 결제됩니다 (실
              결제금액 1원).
            </li>
            <li>
              ※ 첫 달 무료 체험 후, 위약금이나 약정없이 언제든지 쉽게 해지할 수
              있습니다.
            </li>
            <li>
              ※ 모든 정기구독은 결제 후 7일간 미사용 시 취소할 수 있습니다.
            </li>
            <li>
              ※ 정기구독 중 전자책 연 정기구독 또는 종이책 월/연 정기구독으로
              전환 가입 시, 남은 이용기간은 연장해 드립니다.
            </li>
            <li>
              ※ 윌리 오리지널 종이책은 상품이 손상되지 않은 경우, 교환/반품할 수
              있습니다 (왕복 배송비 별도).
            </li>
            <li>※ 윌리 오리지널 종이책은 국내 배송만 가능합니다.</li>
          </ul>
        </UsageInfoContainer>
      </ContentContainer>
    </StyledSubscribe>
  );
}

const StyledSubscribe = styled.div``;

const ContentContainer = styled.div`
  width: 700px;
  margin: 15px auto;
`;

const FirstMonthFreeAnounce = styled.div`
  padding: 30px 15px 30px 15px;

  h1 {
    width: 180px;
    font-weight: 700;
    font-size: 26px;
    background: linear-gradient(45deg, #be7ed2, #f2d57c);
    -webkit-background-clip: text;
    color: transparent;
    line-height: 1.1em;
    margin-bottom: 5px;
  }

  h2 {
    font-size: 14px;
  }
`;

const SubscribeOptionsContainer = styled.div`
  display: flex;
`;

const EbookSubscribeContainer = styled.div`
  width: 700px;
  color: #000;
  background: ${({ theme }) => theme.yellow};
  padding: 20px 0 30px 0;

  h3 {
    font-weight: 700;
    font-size: 18px;
    margin-left: 20px;
    margin-bottom: 5px;
  }

  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-left: 20px;
    maring-bottom: 10px;
  }
`;

const SubscribeOptionItem = styled.li`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 5px;
  border: 1px solid #cdcdcd;
  padding: 20px 0;
  margin: 10px 10px;
  cursor: pointer;

  &:hover {
    box-shadow: inset 0 0 2px grey;
  }

  h5 {
    font-weight: 700;
    font-size: 14px;
    color: black;
  }

  span {
    font-weight: 400;
    font-size: 12px;
    margin-left: 80px;
    color: black;
  }

  p {
    font-weight: 700;
    font-size: 16px;
    margin-left: 10px;
    margin-right: 30px;
    color: black;
  }
`;

const EbookSubscribeOptionsContainer = styled.ul`
  width: 90%;
  margin: 15px auto;
  padding: 1px;
  border-radius: 5px;
  background: #fff;

  ${SubscribeOptionItem}
`;

const PaperbackSubscribeContainer = styled(EbookSubscribeContainer)`
  color: #fff;
  background: ${({ theme }) => theme.purple};
`;

const PaperbackSubscribeOptionsContainer = styled(
  EbookSubscribeOptionsContainer
)``;

const UsageInfoContainer = styled.div`
  padding: 30px 20px 30px 20px;
  background: #ededed;

  h4 {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 10px;
  }

  ul li {
    color: #7d7d7d;
    font-size: 11px;
    margin: 6px 0;
  }
`;
