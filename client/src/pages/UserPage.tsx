import { Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import OrdersTable from "../components/OrdersTable";

const UserPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const { user } = location.state;

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
            <pre>{JSON.stringify(user, null, 4)}</pre>
            <h1>{user.userType}</h1>
            <h2>Name: {user.name}</h2>
            <h2>Phone No: {user.phoneNo}</h2>
            <button
              onClick={() =>
                navigate(`/${user.userType}s/form`, { state: { user } })
              }
            >
              Update User
            </button>
            <OrdersTable userId={user._id} />
            <button
              onClick={() =>
                navigate(`/${user.userType}s/${user._id}/orders/form`, {
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
