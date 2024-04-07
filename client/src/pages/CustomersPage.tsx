import { Box, Button, Grid, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user.interface";
import UsersTable from "../components/UsersTable";
import { API_BaseUrl } from "../constants";
import { PersonAdd } from "@mui/icons-material";

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
      <Sidebar />
      <Box
        mx={16}
        my={2}
      >
        <Grid
          container
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            container
            item
            justifyContent={"space-between"}
          >
            <Grid item>
              <Typography variant="h4">Customers</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/customers/form")}
              >
                <PersonAdd sx={{ mr: 2 }} />
                Add Customer
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            mt={2}
          >
            <UsersTable users={customers} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CustomersPage;
