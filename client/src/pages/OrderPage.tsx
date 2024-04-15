import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { IOrder } from "../interfaces/order.interface";
import { IItem } from "../interfaces/item.interface";
import { useEffect, useState } from "react";
import { API_BaseUrl } from "../constants";

const OrderPage = () => {
  const location = useLocation();
  const { order }: { order: IOrder } = location.state;

  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    fetch(`${API_BaseUrl}/orders/${order._id}/items`)
      .then((res) => res.json())
      .then((res) => setItems(res.data));
  }, []);

  const columns = [
    {
      label: "S.No.",
      minWidth: 20,
      align: "right",
    },
    {
      label: "TYPE",
      minWidth: 50,
      align: "left",
    },
    {
      label: "NAME",
      minWidth: 120,
      align: "left",
    },
    {
      label: "TUNCH",
      minWidth: 20,
      align: "right",
    },
    {
      label: "WASTAGE",
      minWidth: 20,
      align: "right",
    },
    {
      label: "GROSS WEIGHT",
      minWidth: 20,
      align: "right",
    },
    {
      label: "WEIGHT",
      minWidth: 20,
      align: "right",
    },
    {
      label: "LABOUR",
      minWidth: 20,
      align: "right",
    },
    {
      label: "RATE",
      minWidth: 20,
      align: "right",
    },
    {
      label: "AMOUNT",
      minWidth: 20,
      align: "right",
    },
  ];

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
          spacing={2}
        >
          {/* Order Details */}
          <Grid
            item
            container
            justifyContent={"space-evenly"}
            alignItems={"center"}
          >
            {/* <pre>{JSON.stringify(order, null, 4)}</pre> */}
            <Grid item>
              <Typography variant="h5">Order No.: {order.orderNo}</Typography>
              <Typography variant="h5">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </Typography>
              <Typography variant="h5">
                Time: {new Date(order.createdAt).toLocaleTimeString()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                Total Amount: {order.finalAmount}
              </Typography>
              <Typography
                variant="h5"
                color={"green"}
              >
                Paid: {order.paid}
              </Typography>
              <Typography
                variant="h5"
                color={"red"}
              >
                Remaining: {order.remaining}
              </Typography>
            </Grid>
          </Grid>
          {/* Order Items Table */}
          <Grid item>
            <Typography variant="h4">Order Products</Typography>
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
                    {items.map((item, index) => (
                      <TableRow
                        hover
                        key={item._id}
                      >
                        <TableCell align="right">{index + 1}</TableCell>
                        <TableCell>{item.itemType}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell align="right">{item.tunch}</TableCell>
                        <TableCell align="right">{item.wastage}</TableCell>
                        <TableCell align="right">{item.grossWeight}</TableCell>
                        <TableCell align="right">{item.weight}</TableCell>
                        <TableCell align="right">{item.labour}</TableCell>
                        <TableCell align="right">{item.rate}</TableCell>
                        <TableCell align="right">{item.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default OrderPage;
