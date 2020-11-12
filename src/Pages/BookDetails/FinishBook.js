import styled from "styled-components";

function FinishBook({ data }) {
  return (
    <Container>
      <SubjectBox>
        <h1>윌리 완독 지수 (그래프 부분)</h1>
      </SubjectBox>
      <MainBox>
        <PercentBox>
          <FirstLine>완독할 확률</FirstLine>
          <SecondLine>{data.complete_per}%</SecondLine>
          <ThirdLine>
            자기계발 분야 평균 {data.category_complete_per}%
          </ThirdLine>
        </PercentBox>
        <PercentBox margin>
          <img
            src="https://cdn2.iconfinder.com/data/icons/ui-basic-glyph/512/UI_Basic_GLYPH-82-512.png"
            alt="clock"
          />
          <FirstLine>완독 예상 시간</FirstLine>
          <SecondLine>{data.complete_time}</SecondLine>
          <ThirdLine>
            자기계발 분야 평균 {data.category_complete_time}
          </ThirdLine>
        </PercentBox>
      </MainBox>
    </Container>
  );
}

export default FinishBook;

const Container = styled.section`
  padding: 15px 24px;
  border-bottom: 12px solid rgb(247, 247, 247);
`;

const SubjectBox = styled.div`
  padding: 10px 0;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    background-image: url("https://cdn3.iconfinder.com/data/icons/solid-locations-icon-set/64/LIBRARY_2-512.png");
    background-size: 20px 20px;
    width: 20px;
    height: 20px;
    display: inline-block;
  }
  h1 {
    display: flex;
    align-items: center;
    margin-left: 10px;
    font-size: 14px;
  }
`;

const MainBox = styled.div`
  display: flex;
  margin: 10px 0;
`;

const PercentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 467px;
  height: 155px;
  background-color: rgb(247, 247, 247);
  border-radius: 25px;
  margin-left: ${(props) => (props.margin ? "15px" : "")};
  padding: 24px 0;

  img {
    width: 30px;
    height: 30px;
  }
`;

const FirstLine = styled.span`
  font-size: 13px;
  font-weight: 700;
  margin-top: 10px;
`;

const SecondLine = styled(FirstLine)`
  font-size: 24px;
  margin: 10px 0;
`;

const ThirdLine = styled.span`
  font-size: 12px;
  color: rgb(165, 165, 165);
`;
