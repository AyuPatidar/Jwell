import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";

const AgentPage = () => {
  const location = useLocation();
  const { agent } = location.state;

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
            <h1>Agent</h1>
            <h2>Name: {agent.name}</h2>
            <h2>Phone No: {agent.phoneNo}</h2>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default AgentPage;
