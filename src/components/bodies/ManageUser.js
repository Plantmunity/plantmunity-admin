import { useTheme } from '@emotion/react'
import { Stack, Box, useMediaQuery, Tab, Tabs } from '@mui/material'
import ActiveUserTable from '../tables/ActiveUserTable'
import ReportedUserTable from '../tables/ReportedUserTable'
import React, { useState } from 'react'


export default function ManageUser () {
    const theme = useTheme();
    const tablet = useMediaQuery(theme.breakpoints.down(1050));
    const mobile = useMediaQuery(theme.breakpoints.down(600));
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Box sx={{width:"100%" }}>
            
            <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons="auto"
            sx={{ width: "100%" }}
            >

            <Tab
            value={0}
            label={
              <Stack direction="row" alignItems={"center"}>
                  Reported User
              </Stack>
            }
            />
            <Tab
            value={1}
            label={
              <Stack direction="row" alignItems={"center"}>
                  Manage User
              </Stack>
            }
            />
            </Tabs>

            {value === 0 ? null : <ActiveUserTable/>}
            {value === 1 ? null : <ReportedUserTable/>}
        </Box>
        
            


    )
}
