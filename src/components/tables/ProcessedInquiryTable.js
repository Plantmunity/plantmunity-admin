import React, { useState } from "react";
import { Box, Dialog } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useGetDoneConcernsQuery } from "../../app/services/landingApi";
import ProcessedConcernDialog from "../dialogs/ProcessedConcernDialog";

export default function ProcessedConcernTable() {
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [subject, setSubject] = useState("");
  const [reply, setReply] = useState("");
  const [message, setMessage] = useState("");

  const handleDialog = (
    ID,
    fname,
    lname,
    email,
    contact,
    subject,
    message,
    reply
  ) => {
    setOpenDialog(!openDialog);
    setId(ID);
    setName(fname + " " + lname);
    setEmail(email);
    setContact(contact);
    setSubject(subject);
    setMessage(message);
    setReply(reply);
  };
  const { data } = useGetDoneConcernsQuery(undefined, {
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
    reply,
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
      reply,
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
      reply,
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
        reply,
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
                <TableRow
                  key={row.id}
                  onClick={() => {
                    handleDialog(
                      row.id,
                      row.first_name,
                      row.last_name,
                      row.email,
                      row.contact,
                      row.subject,
                      row.message,
                      row.reply
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

      <Dialog
        open={openDialog}
        scroll={"body"}
        maxWidth={false}
        onClose={handleDialog}
      >
        <ProcessedConcernDialog
          handleClose={() => handleDialog()}
          id={id}
          name={name}
          email={email}
          contact={contact}
          subject={subject}
          message={message}
          reply={reply}
        />
      </Dialog>
    </Box>
  );
}
