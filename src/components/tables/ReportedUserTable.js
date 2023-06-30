import React from "react";
import { Box } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useGetReportedAccountsQuery } from "../../app/services/manageApi";
//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ReportedUsersTable({ handleClick }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(900));

  const { data } = useGetReportedAccountsQuery(undefined, {
    refetchOnMountOrArgChange: "true",
    pollingInterval: 10000,
  });

  const reportedArray = data ? data.reported_users : [];

  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth: mobile ? 90 : small ? 140 : 170,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: mobile ? 90 : small ? 140 : 170,
      align: "center",
    },
    {
      id: "contact",
      label: "Contact",
      minWidth: mobile ? 90 : 100,
      align: "center",
    },
    {
      id: "address",
      label: "Address",
      minWidth: mobile ? 90 : small ? 140 : 170,
      align: "center",
    },
    {
      id: "reports",
      label: "Report Count",
      minWidth: mobile ? 90 : small ? 140 : 170,
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
      <TableContainer sx={{ maxHeight: 490, minHeight: 490 }}>
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
                    fontSize: mobile ? 10 : small ? 14 : 18,
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
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: mobile ? 10 : small ? 14 : 18,
                    }}
                  >
                    {row.first_name + " " + row.last_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: mobile ? 10 : small ? 14 : 18,
                    }}
                  >
                    {row.email}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: mobile ? 10 : small ? 14 : 18,
                    }}
                  >
                    {row.contact}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: mobile ? 10 : small ? 14 : 18,
                    }}
                  >
                    {row.address}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: mobile ? 10 : small ? 14 : 18,
                    }}
                  >
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
