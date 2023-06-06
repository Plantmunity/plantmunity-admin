import React, { useState } from "react";
import { Box } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useGetReportedAccountsQuery } from "../../app/services/manageApi";

export default function ReportedUsersTable({ handleClick }) {
  const { data } = useGetReportedAccountsQuery(undefined, {
    refetchOnMountOrArgChange: "true",
    pollingInterval: 10000,
  });

  const reportedArray = data ? data.reported_users : [];

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
      id: "address",
      label: "Address",
      minWidth: 170,
      align: "center",
    },
    {
      id: "reports",
      label: "Report Count",
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
    username,
    address,
    reports,
    reports_count,
    profile_picture
  ) {
    return {
      id,
      first_name,
      last_name,
      email,
      contact,
      username,
      address,
      reports,
      reports_count,
      profile_picture,
    };
  }

  const rows = reportedArray.map(
    ({
      id,
      first_name,
      last_name,
      email,
      contact,
      username,
      address,
      reports,
      reports_count,
      profile_picture,
    }) => {
      return createData(
        id,
        first_name,
        last_name,
        email,
        contact,
        username,
        address,
        reports,
        reports_count,
        profile_picture
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
              return (
                <TableRow
                  key={row.id}
                  onClick={() => {
                    handleClick(
                      row.id,
                      row.first_name,
                      row.last_name,
                      row.username,
                      row.reports,
                      row.reports_count,
                      row.profile_picture
                    );
                  }}
                  sx={{ "&:hover": { bgcolor: "#F5F5F7", cursor: "pointer" } }}
                >
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
                    {row.address}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "Raleway" }}>
                    {row.reports_count}
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
