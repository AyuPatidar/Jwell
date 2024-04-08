import { Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import OrdersTable from "../components/OrdersTable";
import { useEffect, useState } from "react";
import { API_BaseUrl } from "../constants";
import { IUser } from "../interfaces/user.interface";

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
      <Grid container>
        <Grid
          item
          md={2}
          lg={2}
        >
          <Navbar />
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
            <pre>{JSON.stringify(user, null, 4)}</pre>
            <h1>{user?.userType}</h1>
            <h2>Name: {user?.name}</h2>
            <h2>Phone No: {user?.phoneNo}</h2>
            <button
              onClick={() =>
                navigate(`/${user?.userType}s/form`, { state: { user } })
              }
            >
              Update User
            </button>
            <OrdersTable userId={userId} />
            <button
              onClick={() =>
                navigate(`/${user?.userType}s/${userId}/orders/form`, {
                  state: { user },
                })
              }
            >
              Create Order
            </button>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default UserPage;
