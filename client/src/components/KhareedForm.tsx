import { Formik, FieldArray, Form } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { API_BaseUrl } from "../constants";
import { toast } from "react-toastify";

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
        tunch: 0,
        wastage: 0,
        grossWeight: 0,
        weight: 0,
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
          itemType: yup
            .string()
            .oneOf(["gold", "silver", "stone"])
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
    Promise.all(apiCalls).then((results) => {
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
    <Formik
      initialValues={khareedInitialValues}
      onSubmit={handleKhareedSubmit}
      validationSchema={khareedOrderSchema}
    >
      {({ values, errors, handleChange, setFieldValue, isSubmitting }) => (
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
                        setFieldValue(`items[${index}].name`, e.target.value);
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
                        setFieldValue(`items[${index}].tunch`, e.target.value);
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
                    <label htmlFor="grossWeight">Gross Weight: </label>
                    <input
                      id="grossWeight"
                      type="text"
                      name="grossWeight"
                      value={item.grossWeight}
                      onChange={(e) => {
                        setFieldValue(
                          `items[${index}].grossWeight`,
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
                        setFieldValue(`items[${index}].weight`, e.target.value);
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
                        setFieldValue(`items[${index}].labour`, e.target.value);
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
                        setFieldValue(`items[${index}].rate`, e.target.value);
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
                        setFieldValue(`items[${index}].amount`, e.target.value);
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
                <button onClick={() => push(khareedInitialValues.items[0])}>
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
  );
};

export default KhareedForm;
