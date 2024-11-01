import "./../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useState } from "react";

const Home = ({ shoes, setShoes, navigate }) => {
  // rows 배열을 생성하여 3개씩 묶음
  const shoeRows = [];
  for (let i = 0; i < shoes.length; i += 3) {
    shoeRows.push(shoes.slice(i, i + 3));
  }

  // 로딩 중이라고 알려주는 패널을 보여주기 위한 state 생성
  let [isLoading, setIsLoading] = useState(false);

  // 상품이 없다고 알려주는 패널을 보여주기 위한 state 생성
  let [noShoes, setNoShoes] = useState(false);

  // 더보기 버튼을 숨기기 위한 state 생성
  const [isLoadMoreShoes, setIsLoadMoreShoes] = useState(true);

  // 더보기 버튼을 누른 횟수
  const [count, setCount] = useState(0);

  // 신발 더보기 함수
  const loadMoreShoes = () => {
    setIsLoading(true);

    if (count > 1) {
      setIsLoading(false);
      setNoShoes(true);
      setIsLoadMoreShoes(false);
      return;
    }

    let url =
      count == 0
        ? "https://codingapple1.github.io/shop/data2.json"
        : "https://codingapple1.github.io/shop/data3.json";

    setTimeout(() => {
      axios
        .get(url)
        .then((response) => {
          let updatedShoes = [...shoes];
          for (let data of response.data) {
            updatedShoes.push({
              id: data.id,
              title: data.title,
              content: data.content,
              price: data.price,
            });
          }
          setShoes(updatedShoes);
          setCount(count + 1);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }, 500);
  };

  return (
    <>
      <div className="main-bg"></div>
      {shoeRows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((shoe) => (
            <Shoes key={shoe.id} shoe={shoe} navigate={navigate} />
          ))}
        </Row>
      ))}
      {isLoadMoreShoes ? <button onClick={loadMoreShoes}>더보기</button> : null}
      {noShoes ? (
        <div className="alert alert-danger">상품이 없습니다.</div>
      ) : null}
      {isLoading ? (
        <div className="alert alert-warning">로딩 중입니다.</div>
      ) : null}
    </>
  );
};

// 신발 목록을 보여주는 컴포넌트 생성
const Shoes = ({ shoe, navigate }) => {
  let imageSrc;

  try {
    imageSrc = require("./../images/shoes" + shoe.id + ".png");
  } catch (error) {
    imageSrc = null;
  }

  return (
    <Col>
      <img
        src={imageSrc}
        width="80%"
        alt=""
        onClick={() => {
          navigate("/detail/" + shoe.id);
        }}
      ></img>
      <h4>{shoe.title}</h4>
      <p>{shoe.price}</p>
    </Col>
  );
};

export default Home;
