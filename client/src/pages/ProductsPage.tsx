import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { API_BaseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import { Create } from "@mui/icons-material";
import { IProduct } from "../interfaces/product.interface";

const ProductsPage = () => {
  const navigate = useNavigate();

  const columns = [
    {
      label: "TYPE",
      minWidth: 200,
      align: "left",
    },
    {
      label: "NAME",
      minWidth: 200,
      align: "left",
    },
    {
      label: "STOCK (gm)",
      minWidth: 100,
      align: "right",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch(`${API_BaseUrl}/products`)
      .then((res) => res.json())
      .then((res) => setProducts(res.data));
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
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Grid
            container
            item
            justifyContent={"space-between"}
          >
            <Grid item>
              <Typography variant="h4">Products</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/products/form")}
              >
                <Create sx={{ mr: 2 }} />
                Add Product
              </Button>
            </Grid>
          </Grid>
          <Grid
            item
            mt={2}
          >
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          style={{
                            minWidth: column.minWidth,
                          }}
                          align={column.align === "left" ? "left" : "right"}
                        >
                          <Typography
                            fontWeight={600}
                            fontSize={16}
                          >
                            {column.label}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((product: IProduct) => (
                        <TableRow
                          hover
                          key={product._id}
                        >
                          <TableCell>{product.productType}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell align="right">{product.stock}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductsPage;
