import { Formik, Form } from "formik";
import * as yup from "yup";
import { API_BaseUrl } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <Formik
      initialValues={{
        paid: 0,
      }}
      onSubmit={handlebakayaSubmit}
      validationSchema={bakayaOrderSchema}
    >
      {({ values, errors, setFieldValue }) => (
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
  );
};

export default BakayaForm;
