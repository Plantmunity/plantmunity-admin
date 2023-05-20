import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Divider, Typography } from '@mui/material';

export default function ReportedUserTable () {

  return (

    <Box
        sx={{
            width:"100%",
            bgcolor:"white",
            borderRadius:3,
            overflow:2,
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
                Reported User
            </Typography>

            <Divider />

      <TableContainer sx={{ maxHeight: 440, width:"100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              
            </TableRow>
          </TableHead>
          <TableBody>

          </TableBody>
        </Table>
      </TableContainer>

    </Box>

  )
}

