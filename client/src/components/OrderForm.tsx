import { useState } from "react";
import { IUser } from "../interfaces/user.interface";
import * as yup from "yup";
import { FieldArray, Form, Formik } from "formik";
import { Grid } from "@mui/material";
import { API_BaseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OrderForm = ({ user }: { user: IUser }) => {
  const navigate = useNavigate();

  const [khareedOrBakaya, setKhareedOrBakaya] = useState("");
  const [items, setItems] = useState<String[]>([]);

  const khareedInitialValues = {
    items: [
      {
        itemType: "",
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
    items: yup
      .array(
        yup.object().shape({
          itemType: yup.string().oneOf(["gold", "silver"]).required(),
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
    for (var item of values.items) {
      const apiCall = fetch(`${API_BaseUrl}/items/new-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemType: item.itemType,
          name: item.name,
          tunch: item.tunch,
          wastage: item.wastage,
          weight: item.weight,
          weightUnit: item.weightUnit,
          stone: item.stone,
          labour: item.labour,
          rate: item.rate,
          amount: item.amount,
        }),
      })
        .then((res) => res.json())
        .then((res) => items.push(res.data));
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
          items: items,
          finalAmount: values.finalAmount,
          paid: values.paid,
          remaining: values.remaining,
        }),
      })
        .then((res) => toast("Order Created"))
        .then((res) => navigate(-1));
    });
  };

  const bakayaInitialValues = {
    paid: 0,
  };

  const bakayaOrderSchema = yup.object().shape({
    paid: yup.number().positive("Must be greater than 0").required("Required"),
  });

  const handlebakayaSubmit = (values: any, actions: any) => {
    fetch(`${API_BaseUrl}/users/${user._id}/new-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderType: user.userType === "agent" ? "purchase" : "sale",
        khareedOrBakaya: khareedOrBakaya,
        paid: values.paid,
      }),
    })
      .then((res) => toast("Order created"))
      .then((res) => navigate(-1));
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
                  <FieldArray name="items">
                    {({ push, remove }) => (
                      <>
                        {values.items.map((item, index) => (
                          <div key={index}>
                            <h2>Product {index + 1}</h2>
                            <br />
                            <label htmlFor="itemType">Product Type: </label>
                            <input
                              id="itemType"
                              type="text"
                              name="itemType"
                              value={item.itemType}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].itemType`,
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
                              value={item.name}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].name`,
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
                              value={item.tunch}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].tunch`,
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
                              value={item.wastage}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].wastage`,
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
                              value={item.weight}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].weight`,
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
                              value={item.weightUnit}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].weightUnit`,
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
                              value={item.stone}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].stone`,
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
                              value={item.labour}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].labour`,
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
                              value={item.rate}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].rate`,
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
                              value={item.amount}
                              onChange={(e) => {
                                setFieldValue(
                                  `items[${index}].amount`,
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
                          onClick={() => push(khareedInitialValues.items[0])}
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
                  <label htmlFor="paid">Amount: </label>
                  <input
                    id="paid"
                    type="paid"
                    name="paid"
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
