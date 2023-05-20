import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Dialog, Divider, Typography, Avatar, Stack, SearchBar } from '@mui/material';

const columns = [
    {
        id:'avatar',
        label:'Avatar',
        minWidth: 170,
        align:"center"
    },
    {
        id:'name',
        label:'Name',
        minWidth: 170,
        align:"center"
    },
    {
      id:'email',
      label:'Email',
      minWidth: 170,
      align:"center"
    }
    ,
    {
      id:'contactNumber',
      label:'Contact Number',
      minWidth: 170,
      align:"center"
    }
    ,
    {
      id:'role',
      label:'Role',
      minWidth: 170,
      align:"center"
    }
    ,
    {
      id:'status',
      label:'Status',
      minWidth: 170,
      align:"center"
    }
];

function createData(avatar, name, email, contactNumber, role, status, id) {
  return { avatar, name, email, contactNumber, role, status, id }
}

const rows = [
  createData("pic", "Jonell Jumangit", "jjumangit@gmail.com", "+639533887765", "Content Moderators", "Active" ),
  createData("pic", "Novy Grace", "ngrace@gmail.com", "+639533797765", "User Administrator", "Active" ),
  createData("pic", "Bless Sosobrado", "bsosobrado@gmail.com", "+639533887865", "Content Moderators", "Active" ),
  createData("pic", "Coy Francisco", "cfrancisco@gmail.com", "+639533882345", "Content Moderators", "Inactive" ),

];

export default function ManageAdminTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [view, setView] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  
  ;

  const openView = (name, email, contact, role, status) => {
    setName(name)
    setEmail(email)
    setContact(contact)
    setRole(role)
    setStatus(status)
  };

  return (

    <Box
      sx={{
        width: "100%",
        bgcolor:"white",
        borderRadius:3,
        overflow:2
      }}
    >
      <Typography
                variant='h5'
                sx={{
                    fontFamily: 'Raleway',
                    fontWeight: "bold",
                    ml: 3,
                    mb: 3,
                }}
            >
                Manage Admin
            </Typography>

            <Divider />

      <TableContainer sx={{ maxHeight: 440, width:"100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, backgroundColor: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow  hover role="checkbox" tabIndex={-1} key={row.id} onClick={()=>openView(row.name, row.email, row.contactNumber, row.role, row.status)}>
                <TableCell align="center">
                  <Stack direction="column" alignItems="center" sx={{width:"100%"}} >
                  <Avatar src={row.avatar} />
                  </Stack>
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
                <TableCell align="center">{row.contactNumber}</TableCell>
                <TableCell align="center">{row.role}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      </Box>
  );

}




