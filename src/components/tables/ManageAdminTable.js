import React, { useEffect, useState } from "react";
import { Avatar, Box, Dialog, Divider, Stack } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SearchField } from "../basic/StyledComponents";
import { SearchRounded } from "@mui/icons-material";
import { useGetAdminAccountsQuery } from "../../app/services/manageApi";
import AdminActionDialog from "../dialogs/AdminActionDialog";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ManageAdminTable({ toast }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(900));

  const [search, setSearch] = useState("");
  const [finalSearch, setFinalSearch] = useState("");

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = (id, name, image, status, type) => {
    setId(id);
    setName(name);
    setImage(image);
    setStatus(status);
    setType(type);
    handleOpen();
  };

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

  const { data } = useGetAdminAccountsQuery(
    finalSearch === "" ? "all" : finalSearch,
    {
      refetchOnMountOrArgChange: "true",
      pollingInterval: 10000,
    }
  );

  const reportedArray = data ? data.users : [];

  const columns = [
    {
      id: "profile",
      label: "Profile",
      minWidth: mobile ? 90 : 100,
      align: "center",
    },
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
      id: "role",
      label: "Role",
      minWidth: mobile ? 90 : 100,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: mobile ? 90 : 100,
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
    type,
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
      type,
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
      type,
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
        type,
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
            mt: 2,
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
            placeholder={"Search admin"}
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
                      row.first_name + " " + row.last_name,
                      row.profile_picture,
                      row.status,
                      row.type === "SA"
                        ? "Super Admin"
                        : row.type === "Moderator"
                        ? "Content Moderator"
                        : "User Admin"
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
                    <Stack
                      direction="column"
                      alignItems={"center"}
                      sx={{ width: "100%" }}
                    >
                      <Avatar
                        src={row.profile_picture}
                        alt={"Profile_Photo"}
                        sx={{ width: 60, height: 60 }}
                      />
                    </Stack>
                  </TableCell>
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
                    {row.type === "SA"
                      ? "Super Admin"
                      : row.type === "Moderator"
                      ? "Content Moderator"
                      : "User Admin"}
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

      <Dialog open={open} onClose={handleOpen} maxWidth={false}>
        <AdminActionDialog
          image={image}
          id={id}
          name={name}
          type={type}
          status={status}
          handleClose={() => handleOpen()}
          toast={(message) => toast(message)}
        />
      </Dialog>
    </Box>
  );
}
