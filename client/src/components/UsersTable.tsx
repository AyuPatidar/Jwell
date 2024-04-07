import { useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user.interface";
import {
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
import { useState } from "react";

const UsersTable = ({ users }: { users: IUser[] }) => {
  const navigate = useNavigate();

  const columns = [
    {
      label: "NAME",
      minWidth: 220,
      align: "left",
    },
    {
      label: "ADDRESS",
      minWidth: 150,
      align: "left",
    },
    {
      label: "PHONE NO.",
      minWidth: 120,
      align: "left",
    },
    {
      label: "TOTAL ORDERS",
      minWidth: 100,
      align: "right",
    },
    {
      label: "PAID",
      minWidth: 100,
      align: "right",
    },
    {
      label: "REMAINING",
      minWidth: 100,
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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => {
                return (
                  <TableRow
                    hover
                    key={user.phoneNo}
                  >
                    <TableCell
                      onClick={() =>
                        navigate(`/user/${user._id}`, {
                          state: { userId: user._id },
                        })
                      }
                    >
                      {user.name}
                    </TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.phoneNo}</TableCell>
                    <TableCell align="right">{user.totalOrders}</TableCell>
                    <TableCell align="right">{user.paid}</TableCell>
                    <TableCell align="right">{user.remaining}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default UsersTable;
