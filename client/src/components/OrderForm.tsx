import { useState } from "react";
import { IUser } from "../interfaces/user.interface";
import * as yup from "yup";
import { FieldArray, Form, Formik } from "formik";
import { Grid } from "@mui/material";
import { API_BaseUrl } from "../constants";
import { useNavigate } from "react-router-dom";

const OrderForm = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();

  const [khareedOrBakaya, setKhareedOrBakaya] = useState("");
  const [products, setProducts] = useState<String[]>([]);

  const khareedInitialValues = {
    products: [
      {
        productType: "",
        name: "",
        tunch: 0,
        wastage: 0,
        weight: 0,
        weightUnit: "",
        stone: "",
        labour: 0,
        rate: 0,
        amount: 0,
      },
    ],
    finalAmount: 0,
    paid: 0,
    remaining: 0,
  };

  const khareedOrderSchema = yup.object().shape({
    products: yup
      .array(
        yup.object().shape({
          productType: yup.string().oneOf(["gold", "silver"]).required(),
          name: yup.string().required(),
          tunch: yup.number().positive().required(),
          wastage: yup.number().positive().required(),
          weight: yup.number().positive().required(),
          weightUnit: yup.string().required().oneOf(["gm", "kg"]),
          stone: yup.string(),
          labour: yup.number().positive().required(),
          rate: yup.number().positive().required(),
          amount: yup.number().positive().required(),
        })
      )
      .min(1),
    finalAmount: yup.number().positive(),
    paid: yup.number().positive().required(),
    remaining: yup.number(),
  });

  const handleKhareedSubmit = (values: any, actions: any) => {
    const apiCalls = [];
    for (var product of values.products) {
      const apiCall = fetch(`${API_BaseUrl}/products/new-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productType: product.productType,
          name: product.name,
          tunch: product.tunch,
          wastage: product.wastage,
          weight: product.weight,
          weightUnit: product.weightUnit,
          stone: product.stone,
          labour: product.labour,
          rate: product.rate,
          amount: product.amount,
        }),
      })
        .then((res) => res.json())
        .then((res) => products.push(res.data));
      apiCalls.push(apiCall);
    }
    Promise.all(apiCalls).then((results) => {
      fetch(`${API_BaseUrl}/users/${user._id}/new-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderType: user.userType === "agent" ? "purchase" : "sale",
          khareedOrBakaya: khareedOrBakaya,
          products: products,
          finalAmount: values.finalAmount,
          paid: values.paid,
          remaining: values.remaining,
        }),
      }).then((res) => navigate(-1));
    });
  };

  const bakayaInitialValues = {
    paid: 0,
  };

  const bakayaOrderSchema = yup.object().shape({
    paid: yup.number().positive("Must be greater than 0").required("Required"),
  });

  const handlebakayaSubmit = (values: any, actions: any) => {
    console.log(values);
    setTimeout(() => actions.resetForm(), 1000);
  };

  return (
    <>
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
      >
        <Grid item>
          <form>
            <fieldset>
              <legend>Please specify the order type</legend>
              <input
                type="radio"
                id="khareed"
                name="khareedOrBakaya"
                value={khareedOrBakaya}
                onChange={() => setKhareedOrBakaya("khareed")}
              />
              <label htmlFor="khareed">Khareed</label>
              <input
                type="radio"
                name="khareedOrBakaya"
                id="bakaya"
                value={khareedOrBakaya}
                onChange={() => setKhareedOrBakaya("bakaya")}
              />
              <label htmlFor="bakaya">Bakaya</label>
              <br></br>
            </fieldset>
          </form>
        </Grid>
        <Grid item>
          {/* khareed */}
          {khareedOrBakaya === "khareed" && (
            <Formik
              initialValues={khareedInitialValues}
              onSubmit={handleKhareedSubmit}
              validationSchema={khareedOrderSchema}
            >
              {({
                values,
                errors,
                handleSubmit,
                handleChange,
                setFieldValue,
                isSubmitting,
              }) => (
                <Form>
                  <FieldArray name="products">
                    {({ push, remove }) => (
                      <>
                        {values.products.map((product, index) => (
                          <div key={index}>
                            <h2>Product {index + 1}</h2>
                            <br />
                            <label htmlFor="productType">Product Type: </label>
                            <input
                              id="productType"
                              type="text"
                              name="productType"
                              value={product.productType}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].productType`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="name">Name: </label>
                            <input
                              id="paid"
                              type="text"
                              name="paid"
                              value={product.name}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].name`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="tunch">Tunch: </label>
                            <input
                              id="tunch"
                              type="tel"
                              name="tunch"
                              value={product.tunch}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].tunch`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="wastage">Wastage: </label>
                            <input
                              id="wastage"
                              type="tel"
                              name="wastage"
                              value={product.wastage}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].wastage`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="weight">Weight: </label>
                            <input
                              id="weight"
                              type="tel"
                              name="weight"
                              value={product.weight}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].weight`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="weightUnit">Weight Unit: </label>
                            <input
                              id="weightUnit"
                              type="text"
                              name="weightUnit"
                              value={product.weightUnit}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].weightUnit`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="stone">Stone: </label>
                            <input
                              id="stone"
                              type="text"
                              name="stone"
                              value={product.stone}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].stone`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="labour">labour: </label>
                            <input
                              id="labour"
                              type="tel"
                              name="labour"
                              value={product.labour}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].labour`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="rate">Rate: </label>
                            <input
                              id="rate"
                              type="tel"
                              name="rate"
                              value={product.rate}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].rate`,
                                  e.target.value
                                );
                              }}
                            />
                            <br />
                            <label htmlFor="amount">Amount: </label>
                            <input
                              id="amount"
                              type="tel"
                              name="amount"
                              value={product.amount}
                              onChange={(e) => {
                                setFieldValue(
                                  `products[${index}].amount`,
                                  e.target.value
                                );
                              }}
                            />
                            {index > 0 && (
                              <button
                                onClick={() => remove(index)}
                                type="button"
                              >
                                Remove Product
                              </button>
                            )}
                          </div>
                        ))}
                        <br />
                        <button
                          onClick={() => push(khareedInitialValues.products[0])}
                        >
                          Add Product
                        </button>
                      </>
                    )}
                  </FieldArray>

                  <br />
                  <br />
                  <label htmlFor="finalAmount">Final Amount: </label>
                  <input
                    id="finalAmount"
                    type="tel"
                    name="finalAmount"
                    value={values.finalAmount}
                    onChange={handleChange}
                  />
                  <br />
                  <label htmlFor="paid">Paid: </label>
                  <input
                    id="paid"
                    type="tel"
                    name="paid"
                    value={values.paid}
                    onChange={handleChange}
                  />
                  <br />
                  <label htmlFor="remaining">Remaining: </label>
                  <input
                    id="remaining"
                    type="tel"
                    name="remaining"
                    value={values.remaining}
                    onChange={handleChange}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                </Form>
              )}
            </Formik>
          )}
          {/* bakaya */}
          {khareedOrBakaya === "bakaya" && (
            <Formik
              initialValues={bakayaInitialValues}
              onSubmit={handlebakayaSubmit}
              validationSchema={bakayaOrderSchema}
            >
              {({ values, errors, setFieldValue, handleSubmit }) => (
                <Form>
                  <label htmlFor="productType">Product Type: </label>
                  <input
                    id="productType"
                    type="text"
                    name="productType"
                    value={values.paid}
                    onChange={(e) => {
                      setFieldValue(`paid`, e.target.value);
                    }}
                  />
                  <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default OrderForm;
