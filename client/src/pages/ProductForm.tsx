import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { API_BaseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductForm = () => {
  const navigate = useNavigate();

  const [productType, setProductType] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch(`${API_BaseUrl}/products/new-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productType: productType,
        name: name,
        stock: stock,
      }),
    })
      .then((res) => res.json())
      .then((res) =>
        res.statusCode === 201
          ? toast("Product created successfully")
          : toast("Product creation failed")
      )
      .then(() => navigate(-1));
  };

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
          item
          display={"flex"}
          md={10}
          lg={10}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="productType">Product Type: </label>
            <input
              type="text"
              name="productType"
              id="productType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
            />
            <br />
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="Stock">Stock: </label>
            <input
              type="text"
              name="stock"
              id="stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductForm;
