import React from "react";
import { Box, Stack } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Divider, Typography } from "@mui/material";

import { useGetConcernsQuery } from "../../app/services/landingApi";

export default function InquiryTable({ handleGoTo }) {
  const { data } = useGetConcernsQuery(undefined, {
    refetchOnMountOrArgChange: "true",
    pollingInterval: 10000,
  });

  const concernsArray = data ? data.concerns : [];

  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "center",
    },
    {
      id: "contact",
      label: "Contact",
      minWidth: 100,
      align: "center",
    },
    {
      id: "subject",
      label: "Subject",
      minWidth: 170,
      align: "center",
    },
    {
      id: "date",
      label: "Date",
      minWidth: 170,
      align: "center",
    },
  ];

  function createData(
    id,
    first_name,
    last_name,
    email,
    contact,
    subject,
    message,
    created_at
  ) {
    return {
      id,
      first_name,
      last_name,
      email,
      contact,
      subject,
      message,
      created_at,
    };
  }

  const rows = concernsArray.map(
    ({
      id,
      first_name,
      last_name,
      email,
      contact,
      subject,
      message,
      created_at,
    }) => {
      return createData(
        id,
        first_name,
        last_name,
        email,
        contact,
        subject,
        message,
        created_at
      );
    }
  );

  return (
    <Box
      sx={{
        width: "100%",
        overFlow: "hidden",
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "Raleway",
            fontWeight: "Bold",
            flexGrow: 1,
          }}
        >
          Manage Inquiries
        </Typography>
        <Button
          onClick={() => handleGoTo(2)}
          sx={{
            bgcolor: "transparent",
            color: "green",
            border: "none",
            fontFamily: "Raleway",
            textTransform: "none",
          }}
        >
          View more
        </Button>
      </Stack>

      <Divider />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead bgcolor="green">
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    backgroundColor: "white",
                    fontFamily: "raleway",
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              const time_stamp = new Date(row.created_at);

              function getMonthName(monthNumber) {
                const date = new Date();
                date.setMonth(monthNumber - 1);

                return date.toLocaleString("en-US", { month: "long" });
              }

              const date =
                getMonthName(time_stamp.getMonth() + 1) +
                " " +
                time_stamp.getDate() +
                ", " +
                time_stamp.getFullYear();

              return (
                <TableRow key={row.id}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={{ fontFamily: "Raleway" }}
                  >
                    {row.first_name + " " + row.last_name}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "Raleway" }}>
                    {row.email}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "Raleway" }}>
                    {row.contact}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "Raleway" }}>
                    {row.subject}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "Raleway" }}>
                    {date}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
