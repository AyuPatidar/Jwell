import { Button, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user.interface";

const AgentsPage = () => {
  const navigate = useNavigate();

  const [agents, setAgents] = useState<IUser[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/users/agents`)
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
              <ul>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone No.</th>
                      <th>Paid</th>
                      <th>Remaining</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((agent) => (
                      <tr key={agent.phoneNo}>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/agents/${agent.phoneNo}`, {
                                state: { agent },
                              })
                            }
                          >
                            {agent.name}
                          </button>
                        </td>
                        <td>{agent.phoneNo}</td>
                        <td>{agent.paid}</td>
                        <td>{agent.remaining}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ul>
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
