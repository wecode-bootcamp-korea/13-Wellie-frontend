import { useState, useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

// const priceCardStr =

export default function TestingAnimation() {
  const [covers, setCovers] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/data/dataOfMain.json`)
      .then((res) => res.json())
      .then((res) => {
        setCovers(res.BOOKCOVERS[0].cover);
      })
      .catch((err) => console.log("Catched errors!!", err));
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 500,
      delay: 400,
    });
  }, []);

  return (
    <Main>
      <div></div>
    </Main>
  );
}

const Main = styled.div`
  background-color: purple;
  height: 3000px;
`;
