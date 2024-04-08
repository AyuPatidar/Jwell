import Navbar from "../components/Navbar";
import { API_BaseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";

const ProductForm = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    productType: yup
      .string()
      .oneOf(["Gold", "Silver", "Stone"])
      .required("Required"),
    name: yup.string().required("Required"),
    stock: yup.number().moreThan(-1),
  });

  const handleSubmit = (
    values: FormikValues,
    actions: FormikHelpers<{
      productType: string;
      name: string;
      stock: number;
    }>
  ) => {
    fetch(`${API_BaseUrl}/products/new-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productType: values.productType.toLowerCase(),
        name: values.name.toLowerCase(),
        stock: values.stock,
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
      <Navbar />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"80vh"}
      >
        <Formik
          initialValues={{
            productType: "",
            name: "",
            stock: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => handleSubmit(values, actions)}
        >
          {({ values, errors, handleChange }) => (
            <Form>
              <label htmlFor="productType">Product Type: </label>
              <input
                type="text"
                name="productType"
                id="productType"
                value={values.productType}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="name">Name: </label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="Stock">Stock: </label>
              <input
                type="text"
                name="stock"
                id="stock"
                value={values.stock}
                onChange={handleChange}
              />
              <br />

              <Button
                variant="contained"
                size="large"
                type="submit"
              >
                Submit
              </Button>
              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
};

export default ProductForm;
