import { Grid } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar";

const CustomerForm = () => {
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
        Customer Form
      </Grid>
    </Grid>
  );
};

export default CustomerForm;
