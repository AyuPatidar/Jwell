import { Formik, FieldArray, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { API_BaseUrl } from "../constants";
import { toast } from "react-toastify";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import FormikErrorMessage from "./FormikErrorMessage";

interface IProps {
  userType: string;
  userId: string;
}

const KhareedForm = ({ userType, userId }: IProps) => {
  const navigate = useNavigate();

  let items: string[] = [];

  const khareedInitialValues = {
    items: [
      {
        itemType: "",
        name: "",
        tunch: null,
        wastage: null,
        grossWeight: null,
        weight: null,
        labour: null,
        rate: null,
        amount: null,
      },
    ],
    finalAmount: null,
    paid: null,
    remaining: null,
  };

  const khareedOrderSchema = yup.object().shape({
    items: yup
      .array(
        yup.object().shape({
          itemType: yup
            .string()
            .oneOf(["Gold", "Silver", "Stone"])
            .required("Required"),
          name: yup.string().required("Required"),
          tunch: yup.number().positive().required("Required"),
          wastage: yup.number().positive().required("Required"),
          grossWeight: yup.number().positive().required("Required"),
          weight: yup.number().positive().required("Required"),
          labour: yup.number().positive().required("Required"),
          rate: yup.number().positive().required("Required"),
          amount: yup.number().positive().required("Required"),
        })
      )
      .min(1),
    finalAmount: yup.number().positive(),
    paid: yup.number().positive().required("Required"),
    remaining: yup.number(),
  });

  const handleKhareedSubmit = (values: any) => {
    const apiCalls = [];
    for (var item of values.items) {
      const apiCall = fetch(`${API_BaseUrl}/items/new-item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemType: item.itemType.toLowerCase(),
          name: item.name.toLowerCase(),
          tunch: item.tunch,
          wastage: item.wastage,
          grossWeight: item.grossWeight,
          weight: item.weight,
          labour: item.labour,
          rate: item.rate,
          amount: item.amount,
          purana: false,
          userType: userType,
        }),
      })
        .then((res) => res.json())
        .then((res) => items.push(res.data));
      apiCalls.push(apiCall);
    }
    Promise.all(apiCalls).then(() => {
      fetch(`${API_BaseUrl}/users/${userId}/new-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderType: userType === "agent" ? "purchase" : "sale",
          khareedOrBakaya: "khareed",
          items: items,
          finalAmount: values.finalAmount,
          paid: values.paid,
          remaining: values.remaining,
        }),
      })
        .then((res) =>
          toast(res.status === 201 ? "Order Created" : "Order creation failed")
        )
        .then(() => navigate(-1));
    });
  };

  return (
    <Box
      mx={4}
      my={2}
    >
      <Formik
        initialValues={khareedInitialValues}
        onSubmit={handleKhareedSubmit}
        validationSchema={khareedOrderSchema}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <Grid
              container
              spacing={2}
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
            >
              <Grid item>
                <Typography variant="h4">NEW PRODUCTS</Typography>
              </Grid>
              <Grid item>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <Grid
                      container
                      justifyContent={"center"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      {values.items.map((item, index) => (
                        <Grid
                          item
                          container
                          key={index}
                          spacing={2}
                        >
                          <Grid item>
                            <Typography variant="h4">{index + 1}.</Typography>
                          </Grid>
                          <Grid item>
                            <Autocomplete
                              options={["Gold", "Silver", "Stone"]}
                              value={item.itemType || null}
                              onChange={(event, newValue) =>
                                setFieldValue(
                                  `items[${index}].itemType`,
                                  newValue
                                )
                              }
                              size="small"
                              sx={{ width: 200 }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Type"
                                />
                              )}
                            />
                            <FormikErrorMessage
                              name={`items[${index}].itemType`}
                            />
                          </Grid>
                          <Grid
                            item
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <TextField
                              type="text"
                              label="Name"
                              value={item.name}
                              size="small"
                              onChange={(e) =>
                                setFieldValue(
                                  `items[${index}].name`,
                                  e.target.value
                                )
                              }
                            />
                            <FormikErrorMessage name={`items[${index}].name`} />
                          </Grid>
                          <Grid
                            item
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <TextField
                              type="tel"
                              label="Tunch"
                              value={item.tunch}
                              size="small"
                              onChange={(e) =>
                                setFieldValue(
                                  `items[${index}].tunch`,
                                  e.target.value
                                )
                              }
                            />
                            <FormikErrorMessage
                              name={`items[${index}].tunch`}
                            />
                          </Grid>
                          <Grid
                            item
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <TextField
                              type="tel"
                              label="Wastage"
                              value={item.wastage}
                              size="small"
                              onChange={(e) =>
                                setFieldValue(
                                  `items[${index}].wastage`,
                                  e.target.value
                                )
                              }
                            />
                            <FormikErrorMessage
                              name={`items[${index}].wastage`}
                            />
                          </Grid>
                          <Grid
                            item
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <TextField
                              type="tel"
                              label="Gross Weight"
                              value={item.grossWeight}
                              size="small"
                              onChange={(e) =>
                                setFieldValue(
                                  `items[${index}].grossWeight`,
                                  e.target.value
                                )
                              }
                            />
                            <FormikErrorMessage
                              name={`items[${index}].grossWeight`}
                            />
                          </Grid>
                          <Grid
                            item
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <TextField
                              type="tel"
                              label="Weight"
                              value={item.weight}
                              size="small"
                              onChange={(e) =>
                                setFieldValue(
                                  `items[${index}].weight`,
                                  e.target.value
                                )
                              }
                            />
                            <FormikErrorMessage
                              name={`items[${index}].weight`}
                            />
                          </Grid>
                          <Grid
                            item
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <TextField
                              type="tel"
                              label="Labour"
                              value={item.labour}
                              size="small"
                              onChange={(e) =>
                                setFieldValue(
                                  `items[${index}].labour`,
                                  e.target.value
                                )
                              }
                            />
                            <FormikErrorMessage
                              name={`items[${index}].labour`}
                            />
                          </Grid>
                          <Grid
                            item
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <TextField
                              type="tel"
                              label="Rate"
                              value={item.rate}
                              size="small"
                              onChange={(e) =>
                                setFieldValue(
                                  `items[${index}].rate`,
                                  e.target.value
                                )
                              }
                            />
                            <FormikErrorMessage name={`items[${index}].rate`} />
                          </Grid>
                          <Grid
                            item
                            display={"flex"}
                            flexDirection={"column"}
                          >
                            <TextField
                              type="tel"
                              label="Amount"
                              value={item.amount}
                              size="small"
                              onChange={(e) =>
                                setFieldValue(
                                  `items[${index}].amount`,
                                  e.target.value
                                )
                              }
                            />
                            <FormikErrorMessage
                              name={`items[${index}].amount`}
                            />
                          </Grid>
                          <Grid item>
                            {index > 0 && (
                              <Button
                                variant="contained"
                                size="large"
                                onClick={() => remove(index)}
                                type="button"
                              >
                                Remove Product
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      ))}
                      <Grid item>
                        <Button
                          variant="contained"
                          // size="large"
                          onClick={() => push(khareedInitialValues.items[0])}
                        >
                          Add New Product
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </FieldArray>
              </Grid>
              <Grid item>
                <Typography variant="h4">OLD PRODUCTS</Typography>
              </Grid>
              <Grid
                item
                display={"flex"}
                flexDirection={"column"}
              >
                <Grid
                  item
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <TextField
                      type="tel"
                      label="Final Amount"
                      value={values.finalAmount}
                      onChange={(e) =>
                        setFieldValue(`finalAmount`, e.target.value)
                      }
                    />
                    <FormikErrorMessage name={`finalAmount`} />
                  </Grid>
                  <Grid
                    item
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <TextField
                      type="tel"
                      label="Paid"
                      value={values.paid}
                      onChange={(e) => setFieldValue(`paid`, e.target.value)}
                    />
                    <FormikErrorMessage name={`paid`} />
                  </Grid>
                  <Grid
                    item
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <TextField
                      type="tel"
                      label="Remaining"
                      value={values.remaining}
                      onChange={(e) =>
                        setFieldValue(`remaining`, e.target.value)
                      }
                    />
                    <FormikErrorMessage name={`remaining`} />
                  </Grid>
                </Grid>
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
            {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default KhareedForm;
