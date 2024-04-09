import Navbar from "../components/Navbar";
import { API_BaseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik, FormikHelpers, FormikValues } from "formik";

const ProductForm = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    productType: yup.string().required("Required"),
    name: yup.string().required("Required"),
    stock: yup.number().min(0, "Can be minimum 0"),
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
        stock: values.stock === "" ? 0 : values.stock,
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
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"80vh"}
        spacing={4}
      >
        <Grid item>
          <Typography variant="h4">New Product Details</Typography>
        </Grid>
        <Grid item>
          <Formik
            initialValues={{
              productType: "",
              name: "",
              stock: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Grid
                  container
                  direction={"column"}
                  alignItems={"center"}
                  spacing={2}
                >
                  <Grid item>
                    <Autocomplete
                      options={["Gold", "Silver", "Stone"]}
                      value={values.productType || null}
                      onChange={(event, newValue) =>
                        setFieldValue(`productType`, newValue)
                      }
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Type"
                        />
                      )}
                    />
                    {errors.productType && touched.productType && (
                      <p style={{ color: "red" }}>{errors.productType}</p>
                    )}
                  </Grid>
                  <Grid item>
                    <TextField
                      id="name"
                      value={values.name}
                      label="Name"
                      type="text"
                      onChange={handleChange}
                      sx={{ width: 300 }}
                    />
                    {errors.name && touched.name && (
                      <p style={{ color: "red" }}>{errors.name}</p>
                    )}
                  </Grid>
                  <Grid item>
                    <TextField
                      id="stock"
                      value={values.stock}
                      label="Stock"
                      type="tel"
                      onChange={handleChange}
                      sx={{ width: 300 }}
                    />
                    {errors.stock && touched.stock && (
                      <p style={{ color: "red" }}>{errors.stock}</p>
                    )}
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
                <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default ProductForm;
