import { Divider, Grid, Stack, Toolbar } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import InquiryTable from '../tables/InquiryTable'
import CounterCards from '../cards/dashboard/CounterCards'

//icons
import {FaUserShield} from "react-icons/fa"
import {HiDocumentReport} from "react-icons/hi"
import {MdAdminPanelSettings, MdReportProblem} from "react-icons/md"

const Dashboard = ({ handleGoTo }) => {
    const theme = useTheme();
    const tablet = useMediaQuery(theme.breakpoints.down(1050));
    const mobile = useMediaQuery(theme.breakpoints.down(600));

    return (
        <Stack direction="column" alignItems="center" sx={{ width: "100%" }}>
            <Grid
                container
                direction={mobile ? "column" : "row"}
                alignItems="center"
                sx={{
                    width: "100%",
                    ml: mobile ? 0 : 3
                }}
            >
                <CounterCards 
                    title={"Active Users"} 
                    value={4} 
                    cardspace={0}
                    icon={
                        <FaUserShield 
                            style={{
                                width: 60,
                                height: 60,
                                color: "#bfcba5",
                                marginRight: 20
                            }} 
                        />} 
                />
                <CounterCards
                    title={"Active Admins"}
                    value={4}
                    cardspace={3}
                    icon={
                        <MdAdminPanelSettings
                            style={{
                                width: 60,
                                height: 60,
                                color: "#bfcba5",
                                marginRight: 20
                            }}
                        />}
                />

                <CounterCards
                    title={"Reported Posts"}
                    value={4}
                    cardspace={3}
                    icon={
                        <HiDocumentReport
                            style={{
                                width: 60,
                                height: 60,
                                color: "#bfcba5",
                                marginRight: 20
                            }}
                        />}
                />

                <CounterCards
                    title={"Reported Users"}
                    value={4}
                    cardspace={3}
                    icon={
                        <MdReportProblem
                            style={{
                                width: 60,
                                height: 60,
                                color: "#bfcba5",
                                marginRight: 20
                            }}
                        />}
                />
                
            </Grid>
            

            <Grid
                container
                direction="row"
                alignItems="center"
                sx={{
                    width: "100%",
                    ml: mobile ? 0 : 3
                }}
            >

                <Grid
                    item
                    sx={{
                        width: "98%",
                        height: 340,
                        mt: 4,
                        borderRadius: 3,
                        overflow:"hidden",
                        bgcolor: "white",
                        boxShadow: '2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)',
                    }}
                >

                    <InquiryTable />
                </Grid>
                <Toolbar />
            </Grid>

        </Stack>

    )
}

export default Dashboard