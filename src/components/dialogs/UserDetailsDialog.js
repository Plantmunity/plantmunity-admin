import { Avatar, Box, Button, Divider, Stack, Typography } from '@mui/material'
import React from 'react'

//icons
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import UserManageDetailsDialog from './UserManageDetailsDialog';


const UserDetailsDialog = ({ name, contact, email, username, shopname, address }) => {
  return (
    <Box 
      sx={{ 
        width: 500, 
        height: 650 
      }}
      >

      <Typography
        variant="h6"
        align='center'
        sx={{
          p: 3,
          width: "100%",
          fontFamily: "Raleway",
          fontWeight:"bold"
        }}
      >
        User Detail
      </Typography>

      <Divider />

      <Stack
        direction="column"
        alignItems="center"
        sx={{
          width: "100%"
        }}>

        <Avatar
          alt="User Profile"
          src="https://www.facebook.com/roxene.lee.1/"
          sx={{ width: 150, height: 150, mt: 3 }}
        />

        <Typography 
          variant='h6'
          sx={{
            fontWeight:"bold",
            fontFamily:"Raleway", 
            mt: 2, 
            fontSize:26
            }}
        >
          {name}
        </Typography>
        
        <Typography sx={{fontFamily:"Raleway", fontWeight:"italic", fontSize:18}}>
          {username}
        </Typography>

        <Stack direction="column" sx={{
            mt:3
          }}>

        <Stack 
          direction="row" 
          alignItems="center" 
          sx={{
            mb:2
          }}
        >
          <PhoneRoundedIcon
            sx={{
              color: "#bfcba5"
            }}
          />

          <Typography sx={{fontFamily:"Raleway", ml:1, fontSize:18}}>
            {contact}
          </Typography>

        </Stack>

        <Stack 
          direction="row" 
          alignItems="center"
          sx={{
            mb:2
          }}
        >
          <EmailRoundedIcon
            sx={{
              color: "#bfcba5",
            }}
          />

          <Typography sx={{fontFamily:"Raleway", ml:1, fontSize:18}}>
            {email}
          </Typography>

        </Stack>

        <Stack 
          direction="row" 
          alignItems="center"
          sx={{
            mb:2
          }}
        >
          <StorefrontRoundedIcon
            sx={{
              color: "#bfcba5",
            }}
          />

          <Typography sx={{fontFamily:"Raleway", ml:1, fontSize:18}}>
            {shopname}
          </Typography>

        </Stack>

        <Stack 
          direction="row" 
          alignItems="center"
          sx={{
            mb:2
          }}
        >
          <PlaceRoundedIcon
            sx={{
              color: "#bfcba5",
            }}
          />

          <Typography sx={{fontFamily:"Raleway", ml:1, fontSize:18}}>
            {address}
          </Typography>

        </Stack>

      </Stack>

      <Stack 
          sx={{
            ml: 45,
            mt:5
          }}
        >
            <Button 
              type={'text'}
              variant="contained" 
              onClick={<UserManageDetailsDialog/>}
              sx={{
                width:'100%',
                height: 35,
                color:"white",
                textTransform: "none"
              }}
            >
              Manage Status
            </Button>

        </Stack>
      
      </Stack>
    </Box>




  )
}

export default UserDetailsDialog