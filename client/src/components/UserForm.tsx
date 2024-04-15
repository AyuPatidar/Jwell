import { IUser } from "../interfaces/user.interface";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_BaseUrl } from "../constants";
import * as yup from "yup";
import { Form, Formik, FormikValues } from "formik";
import { Box, Button, Grid, TextField } from "@mui/material";
import FormikErrorMessage from "./FormikErrorMessage";

const UserForm = ({ userType, user }: { userType: string; user?: IUser }) => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    address: yup.string(),
    phoneNo: yup.string().required("Required"),
  });

  const handleSubmit = (values: FormikValues) => {
    if (user) {
      fetch(`${API_BaseUrl}/users/${user._id}/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          name: values.name,
          address: values.address,
          phoneNo: values.phoneNo,
        }),
      })
        .then((res) => res.json())
        .then((res) => toast(res.message));
    } else {
      fetch(`${API_BaseUrl}/users/new-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userType: userType,
          name: values.name,
          address: values.address,
          phoneNo: values.phoneNo,
        }),
      })
        .then((res) => res.json())
        .then((res) => toast(res.message));
    }
    navigate(-1);
  };

  return (
    <Box
      height={"80vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Formik
        initialValues={{
          name: user?.name || "",
          address: user?.address || "",
          phoneNo: user?.phoneNo || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <Grid
              container
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={2}
            >
              <Grid item>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <TextField
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    value={values.name}
                    onChange={handleChange}
                    sx={{ width: "300px" }}
                  />
                  <FormikErrorMessage name={"name"} />
                </Box>
              </Grid>
              <Grid item>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <TextField
                    id="phoneNo"
                    name="phoneNo"
                    type="text"
                    label="Phone No."
                    value={values.phoneNo}
                    onChange={handleChange}
                    sx={{ width: "300px" }}
                  />
                  <FormikErrorMessage name={"phoneNo"} />
                </Box>
              </Grid>
              <Grid item>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <TextField
                    id="address"
                    name="address"
                    type="text"
                    label="Address"
                    value={values.address}
                    onChange={handleChange}
                    sx={{ width: "300px" }}
                  />
                  <FormikErrorMessage name={"address"} />
                </Box>
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  size="large"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default UserForm;
