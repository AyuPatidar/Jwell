import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import UserForm from "../components/UserForm";
import { useLocation } from "react-router-dom";

const AgentForm = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
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
        <UserForm
          userType={"agent"}
          user={user || null}
        />
      </Grid>
    </Grid>
  );
};

export default AgentForm;
