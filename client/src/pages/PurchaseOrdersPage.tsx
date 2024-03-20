import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";

const PurchaseOrdersPage = () => {
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
          <div>
            <h1>Purchase Orders Page</h1>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default PurchaseOrdersPage;
