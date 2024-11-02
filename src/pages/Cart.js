import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { incrementCount } from "../features/cartSlice";

const Cart = () => {
  // 셀렉터에서 cart 상태 반환
  let selectCartItems = useSelector((state) => state.cart.item);

  // dispatch Hook 사용
  const dispatch = useDispatch();

  // 수량을 1씩 증가시키는 함수
  const handleIncrement = (id) => {
    dispatch(incrementCount(id));
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
        </tr>
      </thead>
      <tbody>
        {selectCartItems.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleIncrement(item.id)}
                >
                  수량 증가
                </Button>{" "}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Cart;
