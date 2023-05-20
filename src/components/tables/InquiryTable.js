import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { bgcolor } from '@mui/system';
import { Divider, Typography } from '@mui/material';

const columns = [
    {
        id: 'name',
        label: 'Name',
        minWidth: 170,
        align: "center"
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 100,
        align: "center"
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'contactNumber',
        label: 'Contact Number',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 170,
        align: 'center'
    },
];

function createData(name, address, email, contactNumber, date, details) {
    return { name, address, email, contactNumber, date, details }
}

const rows = [
    createData("Roxene Lee", "Luzville Subdivision", "rlee@gmail.com", "+639533887478", "3/27/2023", "sample detail"),
    createData("Roxene Lee", "Luzville Subdivision", "rlee@gmail.com", "+639533887478", "3/27/2023", "sample detail"),
    createData("Roxene Lee", "Luzville Subdivision", "rlee@gmail.com", "+639533887478", "3/27/2023", "sample detail"),

]


export default function InquiryTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper
            sx={{
                width: "100%",
                overFlow: "hidden"
            }}
        >
            <Typography
                variant='h5'
                sx={{
                    fontFamily: 'Raleway',
                    fontWeight: "Bold",
                    ml: 3,
                    mt: 3,
                    mb: 3
                }}
            >
                Manage Inquiries
            </Typography>

            <Divider />

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead bgcolor="green">
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, backgroundColor: 'white' }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name} >
                                <TableCell component="th" scope="row" align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.address}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.contactNumber}</TableCell>
                                <TableCell align="center">{row.date}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>


        </Paper>
    )
}