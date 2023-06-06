import React, { useEffect, useState } from "react";
import { Box, Divider, IconButton, Stack } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SearchField } from "../basic/StyledComponents";
import { SearchRounded } from "@mui/icons-material";
import { useGetPostedProductsQuery } from "../../app/services/manageApi";

export default function ProductsTable({ handleClick }) {
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

  const { data } = useGetPostedProductsQuery(
    finalSearch === "" ? "all" : finalSearch,
    {
      refetchOnMountOrArgChange: "true",
      pollingInterval: 10000,
    }
  );

  const reportedArray = data ? data.products : [];

  const columns = [
    {
      id: "image",
      label: "Image",
      minWidth: 170,
      align: "center",
    },
    {
      id: "user",
      label: "User ID",
      minWidth: 100,
      align: "center",
    },
    {
      id: "product",
      label: "Product Name",
      minWidth: 170,
      align: "center",
    },
    {
      id: "category",
      label: "Category",
      minWidth: 170,
      align: "center",
    },
    {
      id: "date",
      label: "Posted on",
      minWidth: 170,
      align: "center",
    },
  ];

  function createData(
    id,
    image,
    product,
    description,
    user,
    shop,
    variants,
    category,
    date,
    status
  ) {
    return {
      id,
      image,
      product,
      description,
      user,
      shop,
      variants,
      category,
      date,
      status,
    };
  }

  const rows = reportedArray.map(
    ({
      id,
      product_image,
      product_name,
      product_description,
      user,
      shop,
      variants,
      category,
      created_at,
      status,
    }) => {
      return createData(
        id,
        product_image,
        product_name,
        product_description,
        user,
        shop,
        variants,
        category,
        created_at,
        status
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
          justifyContent: "flex-end",
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
            inputProps={{ style: { fontFamily: "raleway" } }}
            placeholder={"Search user"}
            value={search}
            onChange={handleSearchChange}
            size="small"
          />
        </Stack>
      </Box>
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
              const time_stamp = new Date(row.date);

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
                <TableRow
                  key={row.id}
                  onClick={() => {
                    handleClick(
                      row.id,
                      row.image,
                      row.product,
                      row.description,
                      row.user,
                      date
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
                    <Box
                      sx={{
                        width: "100%",
                        height: 100,
                        display: "flex",
                        direction: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={row.image}
                        style={{
                          width: "90%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "Raleway" }}>
                    {row.user?.id}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "Raleway" }}>
                    {row.product}
                  </TableCell>
                  <TableCell align="center" sx={{ fontFamily: "Raleway" }}>
                    {row.category}
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
