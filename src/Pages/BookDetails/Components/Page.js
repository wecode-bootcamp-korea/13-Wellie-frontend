import styled from "styled-components";

function Page({ content, page }) {
  return (
    <Container>
      <Content>{content}</Content>
      <span>- {page} -</span>
    </Container>
  );
}

export default Page;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 750px;
  background-color: white;
  padding: 20px;
`;

const Content = styled.div`
  line-height: 30px;
  color: rgb(51, 51, 51);
  height: 670px;
  overflow: hidden;
`;
