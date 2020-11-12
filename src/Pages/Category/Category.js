import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Slider from "react-slick";
import styled from "styled-components";
<<<<<<< HEAD
import { BEAPIROOT } from "../../config";
=======
>>>>>>> 31a0cc3... Fix: resolved conflicts
import { FaArrowLeft } from "react-icons/fa";

const optionalCategory = {
  id: 2,
  title: "문학",
};

export default function Category(props) {
  const history = useHistory();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    fetch(`${BEAPIROOT}/book/category/${optionalCategory.id}`)
=======
    fetch(`http://10.58.7.192:8000/book/category/${optionalCategory.id}`)
>>>>>>> 31a0cc3... Fix: resolved conflicts
      .then((res) => res.json())
      .then((res) => setSubcategories(res.subcategories));
  }, []);

  return (
    <CategoryPage>
      <Header>
        <div>
          <span onClick={() => history.push(`/search`)}>
            <FaArrowLeft />
          </span>
          <h1>{optionalCategory.title}</h1>
        </div>
      </Header>
      <Contents>
        <SubcategoryContainer>
<<<<<<< HEAD
          {subcategories?.map((subcategory, i) => {
            return (
              <SubcategoryWrap key={i}>
=======
          {subcategories?.map((subcategory) => {
            return (
              <SubcategoryWrap>
>>>>>>> 31a0cc3... Fix: resolved conflicts
                <h4>{subcategory.subcategory_name}</h4>
                <SwiperWrap>
                  {subcategory.books.map((book) => {
                    return (
                      <Book
                        key={book.book_id}
                        onClick={() =>
<<<<<<< HEAD
                          history.push(`/book_details/${book.book_id}`)
=======
                          history.push(`/bookdetail/${book.book_id}`)
>>>>>>> 31a0cc3... Fix: resolved conflicts
                        }
                      >
                        <img src={book.book_image} alt="Subcategory book" />
                      </Book>
                    );
                  })}
                </SwiperWrap>
              </SubcategoryWrap>
            );
          })}
        </SubcategoryContainer>
      </Contents>
    </CategoryPage>
  );
}

const CategoryPage = styled.div``;

const Header = styled.header`
  width: 100%;
  display: flex;
  height: 50px;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(229, 229, 229);
  z-index: 100;
  font-size: 18px;
  font-weight: bolder;
  line-height: 50px;
  justify-content: center;

  div {
    position: relative;

    span {
      cursor: pointer;
      position: absolute;
      left: 15px;
      font-size: 18px;
      line-height: 55px;
      color: rgb(153, 153, 153);
    }

    h1 {
      text-align: center;
<<<<<<< HEAD
      width: 850px;
=======
      width: 700px;
>>>>>>> 31a0cc3... Fix: resolved conflicts
    }
  }
`;

const Contents = styled.main`
  padding-top: 50px;
  position: relative;
  padding: 20px 15px 15px 15px;
  margin: 0 auto;
<<<<<<< HEAD
  width: 850px;
=======
  width: 700px;
>>>>>>> 31a0cc3... Fix: resolved conflicts
`;

const SubcategoryContainer = styled.div`
  margin-top: 20px;
  padding: 20px 15px;
`;

const SubcategoryWrap = styled.div`
  padding: 30px 0 20px;
  position: relative;
  border-bottom: 1px solid rgb(238, 238, 238);

  h4 {
    margin-bottom: 5px;
    color: rgb(51, 51, 51);
    font-weight: 700;
    font-size: 19px;
  }
`;

const SwiperWrap = styled.div`
  position: relative;
  padding-top: 5px;
  width: auto;
  margin: 0 auto;
`;

const Book = styled.span`
  margin-right: 10px;
  img {
<<<<<<< HEAD
    height: 180px;
=======
    height: 150px;
>>>>>>> 31a0cc3... Fix: resolved conflicts
  }
`;
