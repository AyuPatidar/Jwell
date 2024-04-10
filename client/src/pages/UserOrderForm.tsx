import { Grid } from "@mui/material";
import { useState } from "react";
import BakayaForm from "../components/BakayaForm";
import KhareedForm from "../components/KhareedForm";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const UserOrderForm = () => {
  const location = useLocation();
  const { user } = location.state;

  const [khareedOrBakaya, setKhareedOrBakaya] = useState("");

  return (
    <>
      <Navbar />
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
      >
        <Grid item>
          <form>
            <fieldset>
              <legend>Please specify the order type</legend>
              <input
                type="radio"
                id="khareed"
                name="khareedOrBakaya"
                value={khareedOrBakaya}
                onChange={() => setKhareedOrBakaya("khareed")}
              />
              <label htmlFor="khareed">Khareed</label>
              <input
                type="radio"
                name="khareedOrBakaya"
                id="bakaya"
                value={khareedOrBakaya}
                onChange={() => setKhareedOrBakaya("bakaya")}
              />
              <label htmlFor="bakaya">Bakaya</label>
              <br></br>
            </fieldset>
          </form>
        </Grid>
        <Grid item>
          {/* khareed */}
          {khareedOrBakaya === "khareed" && (
            <KhareedForm
              userType={user.userType}
              userId={user._id}
            />
          )}
          {/* bakaya */}
          {khareedOrBakaya === "bakaya" && (
            <BakayaForm
              userType={user.userType}
              userId={user._id}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserOrderForm;
