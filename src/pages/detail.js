import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";

// class Detail extends React.Component {
//   componentDidMount() {
//     // 컴포넌트 Mount 시 실행
//   }
//   componentDidUpdate() {
//     // 컴포넌트 Update 시 실행
//   }
//   componentWillUnmount() {
//     // 컴포넌트 Unmount 시 실행
//   }
// }

const Detail = ({ shoes }) => {
  // URL에서 가져온 ID 파라미터를 저장하는 params 생성
  let { id } = useParams();

  // 신발 데이터를 가져올 때 URL에서 가져온 ID 파라미터를 토대로 실제 데이터가 존재하면 해당 데이터를 찾아서 반환하는 변수 생성
  const shoe = shoes.find((shoe) => shoe.id == id);

  // 할인 패널을 숨겨주기 위한 state 생성
  let [alert, setAlert] = useState(true);

  useEffect(() => {
    // 컴포넌트 Mount, Update 시 실행
    let timeoutId = setTimeout(() => {
      setAlert(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  });

  // useEffect(() => {}); // 컴포넌트 Mount, Update 시 실행
  // useEffect(() => {}, []); // 컴포넌트 Mount 시 실행
  // useEffect(() => {}, [dependency]); // 컴포넌트 dependency state 변경 시 실행
  // useEffect(() => {
  //   return () => {
  //     // 컴포넌트 Unmount 시 실행
  //   };
  // }, []);

  // 서버에 데이터 요청하는 함수를 요청 취소하고 싶을 때
  // useEffect(() => {
  //   // AbortController 생성
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   // Fetch 요청 시작
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://example.com/api/data", {
  //         signal,
  //       }); // fetch 함수에 signal을 전달하여, 요청이 중간에 취소될 수 있도록 설정
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       if (error.name === "AbortError") {
  //         console.log("Fetch 요청이 취소되었습니다.");
  //       } else {
  //         console.error("Fetch 에러:", error);
  //       }
  //     }
  //   };

  //   fetchData();

  //   // 컴포넌트 Unmount 시 요청 취소
  //   return () => {
  //     controller.abort();
  //   };
  // }, []); // 빈 배열을 전달하여 Mount 및 Unmount 시에만 실행

  // 숫자만 입력됐는지 확인하기 위한 state 생성
  let [number, setNumber] = useState("");

  // 숫자만 입력됐는지 확인하는 함수
  const isNumberOnly = () => {
    const regex = /^[0-9]+$/;
    if (!number) {
      return setNumberAlert(false);
    }
    regex.test(number) ? setNumberAlert(false) : setNumberAlert(true);
  };

  // 할인 패널을 숨겨주기 위한 state 생성
  let [numberAlert, setNumberAlert] = useState(false);

  // number state 변경 시 실행
  useEffect(() => {
    isNumberOnly();
  }, [number]);

  // 탭 번호를 저장하기 위한 state 생성
  let [tabNumber, setTabNumber] = useState(0);

  let [pageFadeIn, setPageFadeIn] = useState("");

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setPageFadeIn("end");
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      setPageFadeIn("");
    };
  }, []);

  return (
    <div className={`start ${pageFadeIn}`}>
      <Container>
        {alert ? (
          <div className="alert alert-warning" id="discount">
            1초 이내 구매 시 할인
          </div>
        ) : null}
        <Row>
          <Col>
            <img
              src={require("./../images/shoes" + shoe.id + ".png")}
              width="100%"
              alt=""
            ></img>
          </Col>
          <Col>
            {numberAlert ? (
              <div className="alert alert-danger">경고: 숫자만 입력하세요</div>
            ) : null}
            <input
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            ></input>
            <h4>{shoe.title}</h4>
            <p>{shoe.content}</p>
            <p>{shoe.price}</p>
            <Button variant="danger">Danger</Button>{" "}
          </Col>
        </Row>
      </Container>
      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTabNumber(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTabNumber(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              setTabNumber(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <HandleTabContent tabNumber={tabNumber} shoe={shoe} />
    </div>
  );
};

const HandleTabContent = ({ tabNumber, shoe }) => {
  let [fadeIn, setFadeIn] = useState("");

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setFadeIn("end");
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      setFadeIn("");
    };
  }, [tabNumber]);

  return (
    <div className={`start ${fadeIn}`}>
      {
        [
          <div>{shoe.title}</div>,
          <div>{shoe.content}</div>,
          <div>{shoe.price}</div>,
        ][tabNumber]
      }
    </div>
  );
};

export default Detail;
