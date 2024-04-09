import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import UserForm from "../components/UserForm";
import { useLocation } from "react-router-dom";

const CustomerForm = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <>
      <Navbar />
      <UserForm
        userType={"customer"}
        user={user || null}
      />
    </>
  );
};

export default CustomerForm;
