import { Button, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IUser {
  userType: string;
  name: string;
  address: string;
  phoneNo: string;
  orders?: null[] | null;
  paid: number;
  remaining: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CustomersPage = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState<IUser[]>([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/v1/users/customers`)
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
                    {customers.map((customer) => (
                      <tr key={customer.phoneNo}>
                        <td>
                          <button
                            onClick={() =>
                              navigate(`/customers/${customer.phoneNo}`, {
                                state: { customer },
                              })
                            }
                          >
                            {customer.name}
                          </button>
                        </td>
                        <td>{customer.phoneNo}</td>
                        <td>{customer.paid}</td>
                        <td>{customer.remaining}</td>
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
