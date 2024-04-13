import { useEffect, useState } from "react";
import { API_BaseUrl } from "../constants";
import { IOrder } from "../interfaces/order.interface";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  TablePagination,
} from "@mui/material";

const OrdersTable = ({ userId }: { userId: string }) => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const columns = [
    {
      label: "ORDER NO.",
      minWidth: 100,
      align: "left",
    },
    {
      label: "DATE",
      minWidth: 50,
      align: "left",
    },
    {
      label: "TYPE",
      minWidth: 60,
      align: "left",
    },
    {
      label: "FINAL AMOUNT",
      minWidth: 50,
      align: "right",
    },
    {
      label: "PAID",
      minWidth: 50,
      align: "right",
    },
    {
      label: "REMAINING",
      minWidth: 50,
      align: "right",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    fetch(`${API_BaseUrl}/users/${userId}/orders`)
      .then((res) => res.json())
      .then((res) => setOrders(res.data));
  }, []);

  return (
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
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order: IOrder) => {
                return (
                  <TableRow
                    hover
                    key={order._id}
                  >
                    <TableCell
                      onClick={() => {
                        if (
                          order.khareedOrBakaya.toLowerCase().trim() ===
                          "khareed"
                        )
                          navigate(`/orders/${order._id}`, {
                            state: {
                              order: order,
                            },
                          });
                      }}
                    >
                      {order.orderNo}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{order.khareedOrBakaya}</TableCell>
                    <TableCell align="right">{order.finalAmount}</TableCell>
                    <TableCell align="right">{order.paid}</TableCell>
                    <TableCell align="right">{order.remaining}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrdersTable;
