import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <>
      <Sidebar />
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={4}
      >
        <Typography variant="h2">Welcome to Jwell</Typography>
      </Box>
    </>
  );
};

export default HomePage;
