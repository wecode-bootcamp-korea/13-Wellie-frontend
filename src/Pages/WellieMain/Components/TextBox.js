import styled from "styled-components";

export default function TextBox(props) {
  return (
    <TitleBox data-aos="fade-down">
      <Title>
        <p>{props.bigStr && props.bigStr[0]}</p>
        <p>{props.bigStr && props.bigStr[1]}</p>
        <p>{props.bigStr && props.bigStr[2]}</p>
        <p>{props.bigStr && props.bigStr[3]}</p>
      </Title>
      <SubTitle>
        <p>{props.smallStr && props.smallStr[0]}</p>
        <span>{props.smallStr && props.smallStr[1]}</span>
        <span>{props.smallStr && props.smallStr[2]}</span>
        <p>{props.smallStr && props.smallStr[3]}</p>
      </SubTitle>
    </TitleBox>
  );
}

const TitleBox = styled.div`
  top: 70px;
  position: relative;
  left: 20px;
  font-size: 70px;
  font-weight: 900;
`;

const Title = styled(TitleBox)`
  margin-bottom: 15px;
  font-size: 76px;
  font-weight: 800;
  line-height: 1.5;
  letter-spacing: 10px;
`;

const SubTitle = styled(TitleBox)`
  font-size: 22px;
  font-weight: 800;
  line-height: 1.5;
  letter-spacing: 4px;

  span {
    &:nth-child(2) {
      color: rgb(164, 81, 247);
    }
  }
`;
