import React from "react";
import { Box } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useGetReportedPostsQuery } from "../../app/services/manageApi";

//For Responsivity
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ReportedPostTable({ handleClick }) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down(600));
  const small = useMediaQuery(theme.breakpoints.down(900));

  const { data } = useGetReportedPostsQuery(undefined, {
    refetchOnMountOrArgChange: "true",
    pollingInterval: 10000,
  });

  const reportedArray = data ? data.reported_posts : [];

  const columns = [
    {
      id: "image",
      label: "Image",
      minWidth: mobile ? 90 : small ? 140 : 170,
      align: "center",
    },
    {
      id: "user",
      label: "User ID",
      minWidth: mobile ? 90 : 100,
      align: "center",
    },
    {
      id: "caption",
      label: "Caption",
      minWidth: mobile ? 90 : small ? 140 : 170,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: mobile ? 90 : small ? 140 : 170,
      align: "center",
    },
    {
      id: "date",
      label: "Posted on",
      minWidth: mobile ? 90 : small ? 140 : 170,
      align: "center",
    },
  ];

  function createData(
    id,
    image,
    caption,
    user,
    date,
    status,
    reports,
    reports_count
  ) {
    return {
      id,
      image,
      caption,
      user,
      date,
      status,
      reports,
      reports_count,
    };
  }

  const rows = reportedArray.map(
    ({
      id,
      post_image,
      caption,
      user,
      created_at,
      status,
      reports,
      reports_count,
    }) => {
      return createData(
        id,
        post_image,
        caption,
        user,
        created_at,
        status,
        reports,
        reports_count
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
                      row.caption,
                      row.user,
                      date,
                      row.reports,
                      row.reports_count
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
                        alt={"post_photo"}
                        src={row.image}
                        style={{
                          width: "90%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: mobile ? 10 : small ? 14 : 18,
                    }}
                  >
                    {row.user?.id}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: mobile ? 10 : small ? 14 : 18,
                    }}
                  >
                    {row.caption}
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
                  <TableCell
                    align="center"
                    sx={{
                      fontFamily: "Raleway",
                      fontSize: mobile ? 10 : small ? 14 : 18,
                    }}
                  >
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
