import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components";
import TextBox from "./Components/TextBox";
import PriceCard from "./Components/PriceCard";
import AOS from "aos";
import { BEAPIROOT, LOCALHOST } from "../../config";
import "aos/dist/aos.css";
import { FaHeadphones } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";

const WellieMain = () => {
  const history = useHistory();
  const [leftStrings, setLeftStrings] = useState([]);
  const [covers, setCovers] = useState([]);
  const [priceCardString, setPriceCardString] = useState([]);

  useEffect(() => {
    fetch(`${BEAPIROOT}/book?limit=55`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res.MESSAGE);
        setCovers(res.MESSAGE);
      })
      .catch((err) => console.log("Catched errors!!", err));
  }, []);

  useEffect(() => {
    fetch(`${LOCALHOST}/data/dataOfMain.json`)
      .then((res) => res.json())
      .then(
        (res) => {
          console.log("res", res);
          setLeftStrings(res.LEFTSTRINGS);
          setPriceCardString(res.PRICECARDSTRINGS);
        },
        () => {
          console.log("에러!!!");
        }
      );
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 400,
    });
  }, []);

  return (
    <Main>
      <FirstView>
        <div className="contents">
          <div className="logo">
            <img src="./images/logo_black.png" alt="Black logo of Wellie" />
          </div>
          <p>
            <TextBox bigStr={leftStrings[0]?.bigStr} />
            <TextBox smallStr={leftStrings[0]?.smallStr} />
          </p>
          <div className="aniBox">
            <img id="library" src="./images/library.png" alt="Library"></img>
            <img
              data-aos="slide-down"
              id="book1"
              src="./images/book1.png"
              alt="First Book"
            ></img>
            <img
              data-aos="slide-down"
              id="book2"
              src="./images/book2.png"
              alt="Second book"
            ></img>
          </div>
        </div>
      </FirstView>
      <CircleLogo>
        <img src="./images/logo_circle.png" alt="Circle logo of Wellie" />
      </CircleLogo>
      <LoginButton onClick={() => history.push(`/login`)}>로그인</LoginButton>
      <ProductButton onClick={() => history.push(`/subscribe`)}>
        구독상품안내
      </ProductButton>
      <CloseToBooks>
        <div className="contents">
          <p>
            독서와
            <br />
            <span>무제한</span>
            <br />
            친해지리
          </p>
          <div data-aos="fade" className="bookShelves">
            <img
              id="shelf1"
              src="./images/bookshelf1.png"
              alt="First bookshelf"
            ></img>
            <img
              id="shelf2"
              src="./images/bookshelf2.png"
              alt="Second bookshelf"
            ></img>
            <img
              id="shelf3"
              src="./images/bookshelf3.png"
              alt="Third bookshelf"
            ></img>
          </div>
          <div className="mark">
            <span>
              국내 최대 독서 플랫폼
              <br />
            </span>
            <span>
              <img
                src="./images/logo_circle.png"
                alt="Circle logo of Wellie"
              ></img>
              <span> 윌리의 서재 </span>
            </span>
          </div>
        </div>
      </CloseToBooks>
      <ManyBooks>
        <div className="contents">
          <TextBox bigStr={leftStrings[1]?.bigStr} />
          <TextBox smallStr={leftStrings[1]?.smallStr} />
          <div data-aos="fade-down" className="detailParagraph">
            <p>
              어제, <br />
              오늘 그리고 <br />
              미래의 베스트 셀러까지!
            </p>
            <br />
            <p>
              무제한 독서를 통해 <br />
              <b>당신의 인생책</b>
              을<br /> 만나보세요
            </p>
          </div>
          <div data-aos="fade-up-left" className="booksBox">
            {covers?.map(({ book_img }) => {
              return (
                <img
                  data-aos="fade-up-left"
                  src={book_img}
                  alt="Book cover"
                ></img>
              );
            })}
          </div>
        </div>
      </ManyBooks>
      <GenreContents>
        <div className="contents">
          <TextBox bigStr={leftStrings[2]?.bigStr} />
          <TextBox smallStr={leftStrings[2]?.smallStr} />
          <div data-aos="fade-down" className="detailParagraph">
            <p>
              판타지•무협•로맨스를 포함한 <br />
              <b>장르문학</b>과
            </p>
            <br />
            <p>
              시간 순삭
              <br />
              <b>만화 콘텐츠</b>도<br />
              무제한으로 즐겨보세요!
            </p>
          </div>
          <div className="bookImages">
            <img
              data-aos="fade-down"
              src={covers[41]?.book_img}
              alt="Book Cover"
            />
            <img
              data-aos="fade-down"
              src={covers[43]?.book_img}
              alt="Book Cover"
            />
          </div>
        </div>
      </GenreContents>
      <AudioChatBooks>
        <div className="contents">
          <TextBox bigStr={leftStrings[3]?.bigStr} />
          <TextBox smallStr={leftStrings[3]?.smallStr} />
          <div data-aos="fade-down" className="detailParagraph">
            <p>
              유명 셀럽이
              <br />
              <b>30분만에 읽어주는 오디오북</b>과
            </p>
            <br />
            <p>
              <b>20분만에 톡 톡 읽는 챗북</b>을<br />
              만나보세요!
            </p>
          </div>
          <Rectangle data-aos="fade-up">
            <div className="header">
              <span>
                <FaHeadphones />
              </span>
              <span>
                <p>30분 만에 읽어주는 오디오북 독서법</p>
                <p>오디오북</p>
              </span>
            </div>
            <div className="contentsOfCard">
              <img src={covers[38]?.book_img} alt="Book cover"></img>
              <img
                src="https://files.mormonsud.net/wp-content/uploads/2016/09/two-people-debate.png"
                alt="Speaking"
              ></img>
              <a href="https://www.youtube.com/watch?v=kUiqEQOtCoc&feature=youtu.be">
                <button>Try</button>
              </a>
            </div>
          </Rectangle>
          <Square data-aos="fade-up">
            <div className="header">
              <span>
                <FaMobileAlt />
              </span>
              <span>
                <p>20분 만에 톡톡 읽는 챗북 독서법</p>
                <p>챗북</p>
              </span>
            </div>
            <div className="contentsOfCard">
              <img src={covers[36]?.book_img} alt="Book cover"></img>
              <img
                src="https://d3udu241ivsax2.cloudfront.net/common/images/company/brand/millieBookCard2Img.png"
                alt="Chat Book example"
              ></img>
            </div>
          </Square>
        </div>
      </AudioChatBooks>
      <GiftBox>
        <div className="contents">
          <span className="wellieOriginal">
            <img src="./images/logo_yellow.png" alt="Wellie Logo" />
            <p>O R I G I N A L</p>
          </span>
          <TextBox bigStr={leftStrings[4]?.bigStr} />
          <TextBox smallStr={leftStrings[4]?.smallStr} />
          <div data-aos="fade-down" className="detailParagraph">
            <p>
              국내 최고 작가진이 집필한
              <br />
              <b>윌리 오리지널</b> 콘텐츠를
            </p>
            <br />
            <p>
              <b>한정판 종이책</b>으로,
              <br />
              격월간 받아보세요
            </p>
          </div>
          <GiftWrapper>
            <Books data-aos="zoom-in-up">
              <div className="stringBox">
                <p>윌리 오리지널 한정판 종이책</p>
                <p className="earth">
                  <span>Vol.08</span>
                  <span>《 지구 끝의 온실 》</span>
                </p>
                <p className="winter">
                  <span>Vol.09</span>
                  <span>《 겨울장면 》</span>
                </p>
              </div>
              <div className="images">
                <img
                  className="bookCover1"
                  src="https://cphoto.asiae.co.kr/listimglink/6/2020101812552349065_1602993323.jpg"
                  alt="지구 끝의 온실 책표지"
                ></img>
                <img
                  className="bookCover2"
                  src="https://img.millie.co.kr/400x/service/cover/179467119/2686b0b8367f47a3add385218a6564ba.jpg"
                  alt="겨울장면 책표지"
                ></img>
              </div>
            </Books>
            <Books data-aos="zoom-in-up">
              <div className="stringBox">
                <p>알랭 드 보통 작가 스페셜 에디션</p>
                <p className="note">
                  《 행복의 건축 》 에디션과 이기주의 필사노트
                </p>
              </div>
              <div className="images">
                <img
                  className="bookCover1"
                  src="https://images-na.ssl-images-amazon.com/images/I/91ICTmpM5GL.jpg"
                  alt="The architecture of happiness 책표지"
                ></img>
                <img
                  className="bookCover2"
                  src="https://alaindebotton.com/wp-content/uploads/2016/02/the_course_of_love_cover.jpg"
                  alt="The course of Love 책표지"
                ></img>
              </div>
            </Books>
            <Books data-aos="zoom-in-up">
              <div className="stringBox">
                <p>
                  <span>종이책 정기구독 회원</span>
                  <br />
                  <span>전용 </span>콘텐츠
                </p>
                <p className="voice">
                  배우 백은진의 목소리로 읽는
                  <br />
                  《지구 끝의 온실》
                  <br />
                  《겨울장면》
                </p>
              </div>
              <div className="images">
                <img
                  className="actress"
                  src="./images/kimgoeun.png"
                  alt="김고은"
                ></img>
              </div>
            </Books>
          </GiftWrapper>
        </div>
      </GiftBox>
      <LastView>
        <div className="contents">
          <StringBox>
            <div className="smallString">
              <p>윌리의 서재를</p>
              <p>정기구독하고</p>
            </div>
            <div className="bigString">
              <p>시간을</p>
              <p>가치있게</p>
              <p>채워</p>
              <p>나가세요</p>
            </div>
          </StringBox>
          <PriceWrap>
            <PriceCard
              firstLineBold={priceCardString[0]?.firstLineBold}
              firstLineNormal={priceCardString[0]?.firstLineNormal}
              secondLineNormal={priceCardString[0]?.secondLineNormal}
              thirdLineBold={priceCardString[0]?.thirdLineBold}
              monthPrice={priceCardString[0]?.monthPrice}
              yearPrice={priceCardString[0]?.yearPrice}
              originalPrice={priceCardString[0]?.originalPrice}
              description1={priceCardString[0]?.description1}
              color="rgb(0, 0, 0)"
              backgroundColor="rgb(249, 235, 96)"
              month="rgb(249, 235, 96)"
              year="rgb(243,191,6)"
              monthlyPlan={
                () => {
                  alert("로그인 후 결제 신청이 가능합니다.");
                  history.push(`/login`);
                }
                // () =>
                // history.push({
                //   pathname: `/login`,
                //   state: {
                //     period: "1개월",
                //     price: 9500,
                //     type: "전자책",
                //     discountMessage: "첫 달 무료*",
                //   },
                // })
              }
              annualPlan={
                () => {
                  alert("로그인 후 결제 신청이 가능합니다.");
                  history.push(`/login`);
                }
                // () =>
                // history.push({
                //   pathname: `/login`,
                //   state: {
                //     period: "1년",
                //     price: 95000,
                //     type: "전자책",
                //     discountMessage: "2개월 무료",
                //   },
                // })
              }
            />
            <PriceCard
              firstLineBold={priceCardString[1]?.firstLineBold}
              firstLineNormal={priceCardString[1]?.firstLineNormal}
              secondLineNormal={priceCardString[1]?.secondLineNormal}
              thirdLineBold={priceCardString[1]?.thirdLineBold}
              monthPrice={priceCardString[1]?.monthPrice}
              yearPrice={priceCardString[1]?.yearPrice}
              originalPrice={priceCardString[1]?.originalPrice}
              description1={priceCardString[1]?.description1}
              color="rgb(255, 255, 255)"
              backgroundColor="rgb(106,49,164)"
              month="rgb(168,125,223)"
              year="rgb(106,49,164)"
              monthlyPlan={
                () => {
                  alert("로그인 후 결제 신청이 가능합니다.");
                  history.push(`/login`);
                }
                // () =>
                //   history.push({
                //     pathname: `/login`,
                //     state: {
                //       period: "1개월",
                //       price: 15500,
                //       type: "종이책",
                //       discountMessage: "첫 달 무료*",
                //     },
                //   }))
              }
              annualPlan={
                () => {
                  alert("로그인 후 결제 신청이 가능합니다.");
                  history.push(`/login`);
                }
                // () =>
                // history.push({
                //   pathname: `/login`,
                //   state: {
                //     period: "1년",
                //     price: 177000,
                //     type: "종이책",
                //     discountMessage: "2개월 무료",
                //   },
                // })
              }
            />
          </PriceWrap>
        </div>
      </LastView>
    </Main>
  );
};

export default WellieMain;

const Main = styled.div`
  background-color: rgb(249, 235, 96);
`;

const Section = styled.section`
  position: relative;
  width: 100%;
`;

const Card = styled.article`
  display: block;
  border-radius: 10px;
`;

const FirstView = styled(Section)`
  height: 1024px;

  .contents {
    width: 1440px;
    margin: 0 auto;

    .logo {
      position: relative;
      top: 100px;
      left: 40px;
      width: 70px;
      height: 24px;
      img {
        width: 100%;
        color: rgb(164, 81, 247);
      }
    }

    .aniBox {
      position: relative;
      #library {
        position: absolute;
        width: 1100px;
        right: 20px;
        top: -300px;
      }
      #book1 {
        position: absolute;
        right: 360px;
        top: -78.5px;
      }
      #book2 {
        position: absolute;
        right: -25px;
        top: -75px;
      }
    }
  }
`;

const CloseToBooks = styled(Section)`
  height: 100vh;
  position: relative;

  .contents {
    width: 1440px;
    margin: 0 auto;
    p {
      margin-bottom: 200px;
      font-size: 55px;
      line-height: 1.3;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      font-style: italic;

      span {
        color: rgb(164, 81, 247);
      }
    }

    .bookShelves {
      position: relative;

      #shelf1 {
        position: absolute;
        width: 820px;
        left: -120px;
        top: 60px;
      }
      #shelf2 {
        position: absolute;
        width: 820px;
        right: -240px;
        top: -90px;
      }
      #shelf3 {
        position: absolute;
        width: 820px;
        right: -100px;
        top: 210px;
      }
    }

    .mark {
      position: absolute;
      bottom: 6%;
      left: 50%;
      transform: translate(-50%, -50%);
      line-height: 1.5;
      text-align: center;

      img {
        width: 25px;
      }
      span:nth-child(2) {
        font-size: 25px;
      }
    }
  }
`;

const ManyBooks = styled(Section)`
  height: 1984px;

  .contents {
    width: 1440px;
    margin: 0 auto;

    .detailParagraph {
      color: transparent;
      top: 120px;
      left: 40px;
      transform: translateY(63.231px);
      position: relative;
      z-index: 200;
      line-height: 1.42857143;
      font-size: 15px;
      &:first-child {
        margin-top: 44px;
      }
      b {
        font-weight: 600;
      }
    }
    .booksBox {
      img {
        margin: 1%;
        width: 8%;
      }
    }
  }
`;

const GenreContents = styled(Section)`
  position: relative;
  background-color: rgb(52, 52, 52);
  color: rgb(255, 255, 255);
  height: 1024px;

  .contents {
    width: 1440px;
    margin: 0 auto;

    .detailParagraph {
      top: 120px;
      left: 40px;
      transform: translateY(63.231px);
      position: relative;
      z-index: 200;
      line-height: 1.42857143;
      font-size: 15px;
      &:first-child {
        margin-top: 44px;
      }
      b {
        font-weight: 600;
      }
    }

    .bookImages {
      img {
        padding-right: 20px;
        width: 370px;

        &:first-child {
          position: absolute;
          top: 16%;
          right: 10%;
        }
        &:last-child {
          position: absolute;
          top: 29%;
          right: 34%;
        }
      }
    }
  }
`;

const AudioChatBooks = styled(Section)`
  background-color: rgb(253, 250, 243);
  height: 1024px;

  .contents {
    width: 1440px;
    margin: 0 auto;
    position: relative;

    .detailParagraph {
      top: 120px;
      left: 40px;
      transform: translateY(63.231px);
      position: relative;
      z-index: 200;
      line-height: 1.42857143;
      font-size: 15px;
      &:first-child {
        margin-top: 44px;
      }
      b {
        font-weight: 600;
      }
    }
  }
`;

const Rectangle = styled(Card)`
  width: 388px;
  height: 614px;
  background-color: rgb(255, 255, 255);
  color: rgb(195, 141, 250);
  box-shadow: 5px 5px 10px rgb(239, 236, 231);
  position: absolute;
  top: 100px;
  right: 400px;

  .header {
    border-bottom: 5px groove rgba(195, 141, 250, 0.5);
    padding: 20px 20px 20px 25px;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
    }
    span:first-child {
      font-size: 25px;
      padding: 5px;
    }

    span:last-child {
      line-height: 25px;
      p:first-child {
        font-size: 14px;
      }
      p:last-child {
        font-size: 22px;
      }
    }
  }

  .contentsOfCard {
    position: relative;
    img:first-child {
      width: 220px;
      position: absolute;
      top: 35px;
      right: 25px;
    }
    img:nth-child(2) {
      width: 370px;
      position: absolute;
      top: 220px;
      left: -50px;
    }
    button {
      position: absolute;
      font-size: 20px;
      font-weight: 600;
      color: gray;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 3px outset;
      top: 420px;
      right: 40px;
      cursor: pointer;
    }
  }
`;

const Square = styled(Card)`
  width: 388px;
  height: 614px;
  background-color: rgb(255, 255, 255);
  color: rgb(237, 136, 93);
  box-shadow: 5px 5px 10px rgb(239, 236, 231);
  position: absolute;
  top: 250px;
  right: 0px;

  .header {
    border-bottom: 5px groove rgba(237, 136, 93, 0.5);
    padding: 20px 20px 20px 25px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
    }
    span:first-child {
      font-size: 25px;
      padding: 5px;
    }

    span:last-child {
      line-height: 25px;
      p:first-child {
        font-size: 14px;
      }
      p:last-child {
        font-size: 22px;
      }
    }
  }

  .contentsOfCard {
    position: relative;
    img:first-child {
      width: 220px;
      position: absolute;
      top: 35px;
      right: 25px;
    }
    img:last-child {
      width: 250px;
      position: absolute;
      top: 170px;
    }
  }
`;

const GiftBox = styled(Section)`
  background-color: rgb(84, 35, 133);
  color: rgb(255, 255, 255);
  height: 2000px;
  position: relative;

  .contents {
    width: 1440px;
    margin: 0 auto;

    .giftbox {
      bottom: 0;
    }

    .wellieOriginal {
      position: absolute;
      top: 4%;
      right: 0%;
      text-align: center;
      img {
        width: 40%;
      }
    }

    .detailParagraph {
      top: 120px;
      left: 40px;
      transform: translateY(63.231px);
      position: relative;
      z-index: 200;
      line-height: 1.42857143;
      font-size: 15px;
      &:first-child {
        margin-top: 44px;
      }
      b {
        font-weight: 600;
      }
    }
  }
`;

const LastView = styled(Section)`
  background-color: rgb(52, 52, 52);
  height: 100vh;

  .contents {
    width: 1440px;
    margin: 0 auto;
  }
`;

const StringBox = styled.div`
  opacity: 1;
  top: 70px;
  left: 40px;
  position: relative;
  font-size: 70px;
  font-weight: 900;
  color: white;
  font-family: "Noto-serif", serif;

  .smallString {
    font-size: 22px;
    font-weight: 800;
    line-height: 1.5;
    letter-spacing: 4px;
  }

  .bigString {
    margin: 40px 0 15px 0;
    font-size: 50px;
    font-weight: 900;
    line-height: 1.5;
    letter-spacing: 10px;
  }
`;

const GiftWrapper = styled.div`
  float: right;
`;

const Books = styled(Card)`
  background-color: rgb(255, 255, 255);
  width: 400px;
  height: 400px;
  position: relative;
  margin: 40px;

  .stringBox {
    padding: 32px 28px 0;
    line-height: 32px;

    p:first-child {
      color: rgb(65, 64, 65);
      font-size: 20px;
      font-weight: 600;
      span:nth-child(3) {
        color: rgb(165, 117, 212);
      }
    }

    .earth {
      color: rgb(62, 68, 146);
      font-weight: 600;
      font-size: 18px;
    }

    .winter {
      color: rgb(104, 122, 166);
      font-weight: 600;
      font-size: 18px;
    }

    .note {
      color: rgb(165, 117, 212);
      font-weight: 600;
      font-size: 18px;
    }

    .voice {
      padding-top: 5px;
      color: rgb(116, 116, 116);
      font-size: 13px;
      line-height: 22px;
    }
  }

  .images {
    position: absolute;
    right: 45px;
    bottom: 1px;

    img {
      width: 160px;
    }
    .bookCover1 {
      transform: rotate(-10deg);
    }
    .bookCover2 {
      transform: rotate(15deg);
    }
    .actress {
      width: 300px;
    }
  }
`;

const PriceWrap = styled.div`
  margin: 30% 0 0;
  display: flex;
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: 50%;
`;

const Button = styled.button`
  background: transparent;
  color: rgb(164, 81, 247);
  font-size: 75%;
  font-weight: 600;
  margin: 1em;
  padding: 0.25em 1em;
  border: 1px solid rgb(164, 81, 247);
  border-radius: 50px;
  cursor: pointer;
  z-index: 100;
  opacity: 1;
  transition: 0.5s;
`;

const CircleLogo = styled.span`
  img {
    flood-color: purple;
    position: fixed;
    top: 30px;
    left: 30px;
    width: 22px;
    height: 22px;
    transition: 0.5s;
  }
`;

const LoginButton = styled(Button)`
  position: fixed;
  top: 30px;
  right: 135px;
  width: 67px;
  height: 29px;
`;

const ProductButton = styled(Button)`
  position: fixed;
  top: 30px;
  right: 30px;
  width: 95px;
  height: 29px;
`;
