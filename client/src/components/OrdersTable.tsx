import { useEffect, useState } from "react";
import { API_BaseUrl } from "../constants";
import { IOrder } from "../interfaces/order.interface";

const OrdersTable = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetch(`${API_BaseUrl}/users/${userId}/orders`)
      .then((res) => res.json())
      .then((res) => setOrders(orders));
  });
  return (
    <>
      <h1>Orders</h1>
      <table>
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
              <td>{order.orderNo}</td>
              <td>{order.createdAt}</td>
              <td>{order.khareedOrBakaya}</td>
              <td>{order.finalAmount}</td>
              <td>{order.paid}</td>
              <td>{order.remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrdersTable;
