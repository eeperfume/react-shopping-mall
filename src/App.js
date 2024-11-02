/* eslint-disable */
import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import About from "./pages/About";
import Cart from "./pages/Cart";
import data from "./data";
import { useState } from "react";

function App() {
  // 신발들을 저장하는 state 생성
  let [shoes, setShoes] = useState(data);

  const navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Shoe</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/about");
              }}
            >
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/event");
              }}
            >
              Event
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* <Link to="/detail">상세 페이지</Link> */}
      <Routes>
        <Route
          path="/"
          element={
            <Home shoes={shoes} setShoes={setShoes} navigate={navigate} />
          }
        />
        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>사원 정보</div>} />
          <Route path="location" element={<div>회사 위치 정보</div>} />
        </Route>
        <Route
          path="/event"
          element={
            <div>
              <h4>오늘의 이벤트</h4>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일 기념 쿠폰 받기</div>} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/*" element={<div>404 Page</div>} />
      </Routes>
    </div>
  );
}

export default App;
