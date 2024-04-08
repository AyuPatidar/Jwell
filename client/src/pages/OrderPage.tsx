import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { IOrder } from "../interfaces/order.interface";
import OrderItemsTable from "../components/OrderItemsTable";

const OrderPage = () => {
  const location = useLocation();
  const { order }: { order: IOrder } = location.state;

  return (
    <Grid container>
      <Grid
        item
        md={2}
        lg={2}
      >
        <Navbar />
      </Grid>
      <Grid
        container
        item
        display={"flex"}
        md={10}
        lg={10}
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Grid item>
          <pre>{JSON.stringify(order, null, 4)}</pre>
        </Grid>
        <Grid item>
          <OrderItemsTable orderId={order._id} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderPage;
