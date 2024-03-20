import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";

const AgentsPage = () => {
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
            <h1>Agents</h1>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AgentsPage;
