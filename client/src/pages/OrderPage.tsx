import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { IOrder } from "../interfaces/order.interface";
import OrderItemsTable from "../components/OrderItemsTable";

const OrderPage = () => {
  const location = useLocation();
  const { order }: { order: IOrder } = location.state;

  return (
    <>
      <Navbar />
      <Grid
        container
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item>
          <pre>{JSON.stringify(order, null, 4)}</pre>
        </Grid>
        <Grid item>
          <OrderItemsTable orderId={order._id} />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderPage;
