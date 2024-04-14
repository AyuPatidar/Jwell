import { ErrorMessage } from "formik";

interface IProps {
  name: any;
}

const FormikErrorMessage = ({ name }: IProps) => {
  return (
    <span style={{ color: "red" }}>
      <ErrorMessage name={name} />
    </span>
  );
};

export default FormikErrorMessage;
