import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
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
