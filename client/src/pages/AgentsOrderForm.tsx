import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";

const AgentsOrderForm = () => {
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
            <h1>Welcome to Jwell</h1>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AgentsOrderForm;
