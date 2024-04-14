import { Formik, Form } from "formik";
import * as yup from "yup";
import { API_BaseUrl } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import FormikErrorMessage from "./FormikErrorMessage";

interface IProps {
  userType: string;
  userId: string;
}

const BakayaForm = ({ userType, userId }: IProps) => {
  const navigate = useNavigate();

  const bakayaOrderSchema = yup.object().shape({
    paid: yup.number().positive("Must be greater than 0").required("Required"),
  });

  const handlebakayaSubmit = (values: any, actions: any) => {
    fetch(`${API_BaseUrl}/users/${userId}/new-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderType: userType === "agent" ? "purchase" : "sale",
        khareedOrBakaya: "bakaya",
        paid: values.paid,
      }),
    })
      .then((res) =>
        toast(res.status === 201 ? "Order Created" : "Order creation failed")
      )
      .then(() => navigate(-1));
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"60vh"}
    >
      <Formik
        initialValues={{
          paid: null,
        }}
        onSubmit={handlebakayaSubmit}
        validationSchema={bakayaOrderSchema}
      >
        {({ values, errors, isSubmitting, setFieldValue }) => (
          <Form>
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              direction={"column"}
              spacing={2}
            >
              <Grid item>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <TextField
                    type="tel"
                    label="Amount"
                    value={values.paid}
                    onChange={(e) => setFieldValue(`paid`, e.target.value)}
                  />
                  <FormikErrorMessage name={`paid`} />
                </Box>
              </Grid>
              {/* <pre>{JSON.stringify({ values, errors }, null, 4)}</pre> */}
              <Grid item>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BakayaForm;
