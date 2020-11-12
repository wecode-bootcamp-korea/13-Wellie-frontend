import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Page from "../Components/Page";

function Viewer({ isActiveReadNow, data }) {
  const [contents, setContents] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  useEffect(() => {
    fetch("/data/BookDetails/contents.json")
      .then((res) => res.json())
      .then((res) => setContents(res.CONTENTS));
  }, []);

  return (
    <BookContainer isActiveReadNow={isActiveReadNow}>
      <Slider {...settings}>
        <FirstPage>
          <img alt="bookCover" src={data.image_url} />
          <span>{data.title}</span>
        </FirstPage>
        {contents.map(({ content, page }) => (
          <Page content={content} page={page} />
        ))}
      </Slider>
    </BookContainer>
  );
}

export default Viewer;

const BookContainer = styled.div`
  display: ${({ isActiveReadNow }) => (isActiveReadNow ? "block" : "none")};
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 800px;
  background-color: rgba(252, 235, 96, 0.6);
  position: fixed;
  padding: 10px;
  top: 10%;
  left: 20%;
  border-radius: 10px;
  z-index: 999;
`;

const FirstPage = styled.div`
  height: 750px;
  background-color: white;
  padding: 40px;
  img {
    margin: 0 auto;
    width: 60%;
    margin-bottom: 40px;
    margin-top: 130px;
    box-shadow: 5px 5px 5px rgb(189, 189, 189);
  }
  span {
    font-size: 20px;
    font-weight: 700;
  }
`;
