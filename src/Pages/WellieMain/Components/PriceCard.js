import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCheck } from "react-icons/fa";

export default function PriceCard(props) {
  console.log("PriceCard props >>>", props);

  return (
    <EachPriceCard data-aos="zoom-in">
      <CardHeader color={props.color} backgroundColor={props.backgroundColor}>
        <p>
          <i>❝</i>
          <br />
          <span>{props.firstLineBold}</span>
          {props.firstLineNormal}
          <br />
          {props.secondLineNormal}
        </p>
        <br />
        <p>
          <strong>
            {props.thirdLineBold}
            <br />
            {props.firstLineBold}
            <br />
            정기구독
          </strong>
        </p>
        <p>
          <span>월 </span>
          <span>{props.monthPrice}</span>
          <br />
          <span>연 </span>
          <span>{props.yearPrice} </span>
          <strike color={props.color}>{props.originalPrice}</strike>
        </p>
      </CardHeader>
      <CardBody>
        <dl>
          <dt>
            <span>
              <FaCheck />
            </span>
            전자책 10만 권 무제한
          </dt>
          <dt>
            <span>
              <FaCheck />
            </span>
            밀리 단독 콘텐츠
            <span> 오디오북, 챗북</span>
          </dt>
          <dt>
            <span>
              <FaCheck />
            </span>
            <span>첫 달 무료</span>
          </dt>
          <dd>{props.description1}</dd>
          <dd>유료 전환시, 미사용 여부가 확인되면 7일 내 환불 100%</dd>
        </dl>
      </CardBody>
      <div className="buttons">
        <PriceCardBtn
          month={props.month}
          color={props.color}
          onClick={props.monthlyPlan}
        >
          월 정기구독
        </PriceCardBtn>
        <PriceCardBtn
          year={props.year}
          color={props.color}
          onClick={props.annualPlan}
        >
          연 정기구독
        </PriceCardBtn>
      </div>
    </EachPriceCard>
  );
}

const Card = styled.figure`
  border-radius: 10px;
`;

const EachPriceCard = styled(Card)`
  position: relative;
  background-color: white;
  width: 350px;
  height: 784px;
  margin: 2px;
  padding-bottom: 16px;
  color: rgb(52, 52, 52);

  .buttons {
    position: absolute;
    width: 83%;
    margin: 0 8.5%;
    bottom: 0;
  }
`;

const CardHeader = styled.div`
  height: 424px;
  padding: 16px 8px 16px 16px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 10px 10px 0 0;

  p {
    &:first-child {
      line-height: 30px;
      font-size: 20px;
      margin-bottom: 12px;

      span {
        font-weight: 600;
      }
    }

    &:nth-child(3) {
      line-height: 50px;
      font-size: 40px;
      margin-bottom: 12px;
      font-weight: 600;
    }

    &:last-child {
      padding-top: 30px;
      line-height: 40px;

      span {
        &:nth-child(1),
        &:nth-child(4) {
          font-size: 24px;
        }

        &:nth-child(2),
        &:nth-child(5) {
          font-size: 32px;
          font-weight: 600;
        }
      }

      strike {
        color: ${(props) => props.color};
        opacity: 0.5;
        font-size: 24px;
      }
    }
  }
`;

const CardBody = styled.div`
  dl {
    margin: 16px 12px 16px 0;
    line-height: 20px;

    dt {
      padding: 2px 0 2px 16px;
      font-weight: bold;
      font-size: 14px;

      span {
        padding-right: 10px;
        opacity: 0.5;
      }

      &:nth-child(3) {
        span:last-child {
          color: red;
          opacity: 1;
        }
      }
    }

    dd {
      padding-left: 40px;
      opacity: 0.6;
      font-size: 12px;
    }
  }
`;

const PriceCardBtn = styled.button`
  color: ${(props) => props.color};
  background-color: ${(props) =>
    props.month ? props.month : props.year ? props.year : "rgb(243,191,6)"};
  width: 100%;
  height: 40px;
  margin: 8px 0 16px;
  display: block;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  border-radius: 50px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
