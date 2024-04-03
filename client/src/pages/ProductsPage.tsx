import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { API_BaseUrl } from "../constants";
import { IProduct } from "../interfaces/product.interface";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_BaseUrl}/products`)
      .then((res) => res.json())
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <>
      <Grid container>
        <Grid
          item
          md={2}
          lg={2}
        >
          <Sidebar />
        </Grid>
        <Grid
          container
          item
          display={"flex"}
          md={10}
          lg={10}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"column"}
        >
          <Grid
            item
            m={2}
          >
            <button onClick={() => navigate("/products/form")}>
              Add Product
            </button>
          </Grid>
          <Grid item>
            <table
              cellPadding={10}
              border={1}
            >
              <thead>
                <th>Type</th>
                <th>Name</th>
                <th>Stock(gm/units)</th>
              </thead>
              <tbody>
                {products.map((product: IProduct) => (
                  <tr key={product._id}>
                    <td>{product.productType}</td>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductsPage;
