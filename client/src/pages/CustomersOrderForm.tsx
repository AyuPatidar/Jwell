import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import OrderForm from "../components/OrderForm";
import { useLocation } from "react-router-dom";

const CustomersOrderForm = () => {
  const location = useLocation();
  const { user } = location.state;

  return (
    <>
      <Grid container>
        <Grid
          item
          md={2}
          lg={2}
        >
          <Sidebar />
        </Grid>
        <Grid
          item
          display={"flex"}
          md={10}
          lg={10}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <OrderForm user={user} />
        </Grid>
      </Grid>
    </>
  );
};

export default CustomersOrderForm;
