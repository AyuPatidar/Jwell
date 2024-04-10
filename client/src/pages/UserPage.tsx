import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import OrdersTable from "../components/OrdersTable";
import { useEffect, useState } from "react";
import { API_BaseUrl } from "../constants";
import { IUser } from "../interfaces/user.interface";
import { Box, Button, Grid, Typography } from "@mui/material";
import { AddShoppingCart, EditNote } from "@mui/icons-material";

const UserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    fetch(`${API_BaseUrl}/users/${userId}`)
      .then((res) => res.json())
      .then((res) => setUser(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <Box
        mx={16}
        my={2}
      >
        <Grid
          container
          spacing={2}
        >
          {/* User Details */}
          <Grid
            container
            item
          >
            {/* Top */}
            <Grid
              container
              item
              justifyContent={"center"}
            >
              <Typography variant="h3">{user?.name}</Typography>
            </Grid>
            {/* Middle */}
            <Grid
              container
              item
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item>
                <Typography variant="h5">
                  Type: {user?.userType.slice(0, 1).toUpperCase()}
                  {user?.userType.substring(1)}
                </Typography>
                <Typography variant="h5">Phone No.: {user?.phoneNo}</Typography>
                <Typography variant="h5">Address: {user?.address}</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() =>
                    navigate(`/${user?.userType}s/form`, { state: { user } })
                  }
                >
                  <EditNote sx={{ mr: 1 }} />
                  Update User
                </Button>
              </Grid>
            </Grid>
            {/* Bottom */}
            <Grid
              container
              item
              justifyContent={"space-evenly"}
            >
              <Grid item>
                <Typography variant="h5">
                  Total Orders: {user?.totalOrders}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  color={"green"}
                >
                  Paid: ₹ {user?.paid}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  color={"red"}
                >
                  Remaining: ₹ {user?.remaining}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* Orders table */}
          <Grid
            container
            item
          >
            {/* Heading */}
            <Grid
              item
              container
              justifyContent={"space-between"}
            >
              <Grid item>
                <Typography variant="h4">Orders</Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() =>
                    navigate(`/users/${userId}/orders/form`, {
                      state: { user },
                    })
                  }
                >
                  <AddShoppingCart sx={{ mr: 1 }} />
                  Create Order
                </Button>
              </Grid>
            </Grid>
            {/* Table */}
            <Grid item>
              <OrdersTable userId={userId} />
            </Grid>
          </Grid>
        </Grid>
        {/* <div>
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </div> */}
      </Box>
    </>
  );
};

export default UserPage;
