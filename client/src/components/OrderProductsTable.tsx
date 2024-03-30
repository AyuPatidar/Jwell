import { useState, useEffect } from "react";
import { API_BaseUrl } from "../constants";
import { IProduct } from "../interfaces/product.interface";

const OrderProductsTable = ({ orderId }: { orderId: string }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch(`${API_BaseUrl}/orders/${orderId}/products`)
      .then((res) => res.json())
      .then((res) => setProducts(res.data));
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
            <th>Product No</th>
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
          {products.map((product: IProduct, index: number) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.productType}</td>
              <td>{product.name}</td>
              <td>{product.tunch}</td>
              <td>{product.wastage}</td>
              <td>{product.weight}</td>
              <td>{product.weightUnit}</td>
              <td>{product.stone}</td>
              <td>{product.labour}</td>
              <td>{product.rate}</td>
              <td>{product.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderProductsTable;
