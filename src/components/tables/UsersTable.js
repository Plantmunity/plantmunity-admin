import React, { useEffect, useState } from "react";
import { Box, Divider, Stack } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SearchField } from "../basic/StyledComponents";
import { SearchRounded } from "@mui/icons-material";
import { useGetUsersAccountsQuery } from "../../app/services/manageApi";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function UsersTable({ handleClick }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(900));

  const [search, setSearch] = useState("");
  const [finalSearch, setFinalSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      setFinalSearch(search);
    }, 800);

    return () => {
      clearTimeout(timeOutID);
    };
  }, [search]);

  const { data } = useGetUsersAccountsQuery(
    finalSearch === "" ? "all" : finalSearch,
    {
      refetchOnMountOrArgChange: "true",
      pollingInterval: 10000,
    }
  );

  const reportedArray = data ? data.users : [];

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
      id: "status",
      label: "Status",
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
    profile_picture,
    status,
    bio,
    sex,
    shop,
    created_at
  ) {
    return {
      id,
      first_name,
      last_name,
      email,
      contact,
      username,
      address,
      profile_picture,
      status,
      bio,
      sex,
      shop,
      created_at,
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
      profile_picture,
      status,
      bio_note,
      sex,
      shop,
      created_at,
    }) => {
      return createData(
        id,
        first_name,
        last_name,
        email,
        contact,
        username,
        address,
        profile_picture,
        status,
        bio_note,
        sex,
        shop,
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: mobile ? "center" : "flex-end",
          px: 2,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            backgroundColor: "#F0F2F5",
            width: 300,
            p: 2,
            pt: 0,
            pb: 0,
            mb: 2,
            borderRadius: 10,
            border: "1px solid #E7E9EB",
          }}
        >
          <SearchRounded sx={{ color: "gray" }} />
          <SearchField
            variant="outlined"
            inputProps={{
              style: {
                fontFamily: "raleway",
                fontSize: mobile ? 10 : small ? 14 : 18,
              },
            }}
            placeholder={"Search user"}
            value={search}
            onChange={handleSearchChange}
            size="small"
          />
        </Stack>
      </Box>
      <Divider />
      <TableContainer sx={{ maxHeight: 440, minHeight: 440 }}>
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
                      row.status,
                      row.created_at,
                      row.profile_picture,
                      row.bio,
                      row.sex,
                      row.shop
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
                    {row.status}
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
