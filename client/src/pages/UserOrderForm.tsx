import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
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
        {/* Khareed or Bakaya */}
        <Grid item>
          <fieldset>
            <legend>
              <Typography
                variant="button"
                fontSize={16}
                fontWeight={600}
              >
                Order Type
              </Typography>
            </legend>
            <FormControl>
              <RadioGroup row>
                <FormControlLabel
                  value="khareed"
                  control={<Radio />}
                  label="Khareed"
                  onChange={() => setKhareedOrBakaya("khareed")}
                />
                <FormControlLabel
                  value="bakaya"
                  control={<Radio />}
                  label="Bakaya"
                  onChange={() => setKhareedOrBakaya("bakaya")}
                />
              </RadioGroup>
            </FormControl>
          </fieldset>
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
