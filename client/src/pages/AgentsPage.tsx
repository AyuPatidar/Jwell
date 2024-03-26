import { Button, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user.interface";
import UsersTable from "../components/UsersTable";
import { API_BaseUrl } from "../constants";

const AgentsPage = () => {
  const navigate = useNavigate();

  const [agents, setAgents] = useState<IUser[]>([]);

  useEffect(() => {
    fetch(`${API_BaseUrl}/users/agents`)
      .then((res) => res.json())
      .then((res) => setAgents(res.data));
  }, []);

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
          container
          md={10}
          lg={10}
          justifyContent={"center"}
          alignItems={"center"}
          direction={"column"}
        >
          <Grid item>
            <div>
              <h1>Agents</h1>
              <UsersTable users={agents} />
            </div>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/agents/form")}
            >
              Add Agent
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AgentsPage;
