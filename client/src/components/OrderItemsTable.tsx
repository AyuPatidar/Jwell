import { useState, useEffect } from "react";
import { API_BaseUrl } from "../constants";
import { IItem } from "../interfaces/item.interface";

const OrderItemsTable = ({ orderId }: { orderId: string }) => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    fetch(`${API_BaseUrl}/orders/${orderId}/items`)
      .then((res) => res.json())
      .then((res) => setItems(res.data));
  }, []);

  return (
    <>
      <h1>Products</h1>
      <table
        cellSpacing={3}
        border={3}
      >
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Type</th>
            <th>Name</th>
            <th>Tunch</th>
            <th>Wastage</th>
            <th>Weight</th>
            <th>Weight Unit</th>
            <th>Stone</th>
            <th>Labour</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: IItem, index: number) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td>{item.itemType}</td>
              <td>{item.name}</td>
              <td>{item.tunch}</td>
              <td>{item.wastage}</td>
              <td>{item.grossWeight}</td>
              <td>{item.weight}</td>
              <td>{item.labour}</td>
              <td>{item.rate}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderItemsTable;
