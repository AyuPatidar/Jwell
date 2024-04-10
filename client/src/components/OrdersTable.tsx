import { useEffect, useState } from "react";
import { API_BaseUrl } from "../constants";
import { IOrder } from "../interfaces/order.interface";
import { useNavigate } from "react-router-dom";

const OrdersTable = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`${API_BaseUrl}/users/${userId}/orders`)
      .then((res) => res.json())
      .then((res) => setOrders(res.data));
  }, []);
  return (
    <table
      cellSpacing={3}
      border={3}
    >
      <thead>
        <tr>
          <th>Order No</th>
          <th>Date</th>
          <th>Type</th>
          <th>Final Amount</th>
          <th>Paid</th>
          <th>Remaining</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order: IOrder) => (
          <tr key={order._id}>
            <td
              onClick={() => {
                if (order.khareedOrBakaya.toLowerCase().trim() === "khareed")
                  navigate(`/orders/${order._id}`, {
                    state: {
                      order: order,
                    },
                  });
              }}
            >
              {order.orderNo}
            </td>
            <td>{order.createdAt}</td>
            <td>{order.khareedOrBakaya}</td>
            <td>{order.finalAmount}</td>
            <td>{order.paid}</td>
            <td>{order.remaining}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
