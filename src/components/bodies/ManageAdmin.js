import React from 'react'
import ManageAdminTable from '../tables/ManageAdminTable'
import { Grid, Stack } from '@mui/material'

export default function ManageAdmin () {

  return (
    <Stack 
        direction="column"
        alignItems="center"
        sx={{
            width:"100%"
        }}
    >
        <Grid
            container
            direction="row"
            alignItems="center"
            sx={{
                width:"100%",
            }}
        >
            <Grid
                item
                sx={{
                    width: "100%",
                    height: 500,
                    mt: 4,
                    borderRadius: 3,
                    overflow:"hidden",
                    bgcolor: "white",
                    boxShadow: '2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)',
                }}
            >
              <ManageAdminTable/>

            </Grid>

        </Grid>

    </Stack>
  )
}
