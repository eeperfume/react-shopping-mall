import "./../App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = ({ shoes, navigate }) => {
  return (
    <>
      <div className="main-bg"></div>
      <Row>
        {shoes.map((shoe) => {
          return <Shoes key={shoe.id} shoe={shoe} navigate={navigate}></Shoes>;
        })}
      </Row>
    </>
  );
};

// 신발 목록을 보여주는 컴포넌트 생성
const Shoes = ({ shoe, navigate }) => {
  return (
    <Col>
      <img
        src={require("./../images/shoes" + shoe.id + ".png")}
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
