import { AppBar, Button, Typography, Box } from "@mui/material";
import { Diamond } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const pages = [
  { path: "/agents", name: "Agents" },
  { path: "/customers", name: "Customers" },
  { path: "/products", name: "Products" },
];

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="sticky">
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignContent={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Diamond sx={{ mx: 2 }} />
          <Button
            sx={{ my: 2, color: "white", display: "block" }}
            onClick={() => navigate("/")}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              JWELL
            </Typography>
          </Button>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-evenly"}
        >
          {pages.map((page) => (
            <Button
              key={page.path}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate(page.path)}
            >
              {page.name}
            </Button>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
};

export default Navbar;
