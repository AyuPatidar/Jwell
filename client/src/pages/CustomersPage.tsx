import { Button, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user.interface";
import UsersTable from "../components/UsersTable";
import { API_BaseUrl } from "../constants";

const CustomersPage = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch(`${API_BaseUrl}/users/customers`)
      .then((res) => res.json())
      .then((res) => setCustomers(res.data));
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
              <h1>Customers</h1>
              <UsersTable users={customers} />
            </div>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={() => navigate("/customers/form")}
            >
              Add Customer
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CustomersPage;
