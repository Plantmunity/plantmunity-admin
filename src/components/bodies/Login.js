import React from 'react'
import { Grid, Stack, TextField, Typography, Button, makeStyles } from '@mui/material'
import LoginForm from '../forms/LoginForm'
import { fontWeight } from '@mui/system'

const Login = () => {
  return (
    <Grid
        container
        direction='row' 
        alignItems='center'
        sx={{
            width:900, 
            height:500,
            borderRadius: '30px' ,
            overflow: 'hidden' ,
            borderColor: '#758A7B' ,
            border: 1 ,
            position: 'absolute',
            background: '#758A7B',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            boxShadow:'2.0px 6.0px 6.0px hsl(0deg 0% 0% / 0.38)',
        }}
        >
    
                        <Grid
                            item
                            sx={{
                                width:'50%', 
                                height:500, 
                                background:'#EBEFE9'
                            }}
                            >
                            <img 
                                src='https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1623959191-medium-plant-dieffenbachia-white-pot_2048x.jpg'
                                alt='Plant'
                                style={{
                                    borderRadius: "25px 0px 0px 25px",
                                    width:'100%',
                                    height:500,
                                    objectFit: "cover",
                                }}
                                />

                        </Grid>

                        <Grid 
                            item
                            sx={{
                                width:'50%',
                                height:500, 
                                backgroundColor:'#FFFFFF',
                            }}
                            >

                            <Stack direction='column' alignItems='center' sx={{width:'100%'}}>
                                <Typography 
                                    variant="h4"  
                                    align='center' 
                                    sx={{
                                        mb:8 , 
                                        mt:10 , 
                                        color:"#7C9B6C" ,
                                        fontWeight: 'medium',
                                        fontFamily: 'future' ,}}>
                                    Welcome to Plantmunity
                                </Typography>

                                <TextField 
                                    required 
                                    id="username" 
                                    label="Username" 
                                    variant="outlined" 
                                    sx={{
                                        width:'70%',
                                        mb:2}}
                                    />

                                <TextField 
                                    required 
                                    id="password" 
                                    label="Password" 
                                    variant="outlined" 
                                    sx={{
                                        width:'70%',
                                        mb:3}} 
                                    />

                                    <Button 
                                        type={'text'}
                                        variant="contained"
                                        sx={{
                                            width:'70%',
                                            mb:2 ,
                                            mt:2 ,
                                            color: "white" ,
                                            textTransform: "none"
                                            }}
                                            > Log In
                                    </Button>
                        
                            </Stack>
                           
                                
                            </Grid>
                            

                        </Grid>
  )
}

export default Login