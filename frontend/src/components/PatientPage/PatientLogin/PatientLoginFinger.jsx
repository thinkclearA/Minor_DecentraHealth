import React from 'react'

//MUI
import { Box,Typography, styled } from "@mui/material";

//CSS
const ParentComponent = styled(Box)`
    margin-top : 50px;
`
// const Title = styled(Typography)`
//     font-size: 70px;
//     color: #207868;
// `
const Component = styled(Box)`
   text-align: center;
    display:flex;
    flex-direction: column;
    &>img{
      margin: 50px auto 0px auto;
  }
    &>button{
      width: 200px;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;
      background-color: #2C88D9;
      color: #fff;
      font-weight :600;
      height: 40px;
    }
`
export default function PatientLoginFinger() {
  return (
    <>
      <ParentComponent>
      <Component>
        {/* <Title> DecentraHealth </Title> */}
        <img src="/patientLoginIntro.jpg" alt="patient_login_intro" style={{width: 500, height: 400}}/>
        <Typography style={{color:'#1AAE9F',fontSize: 28, fontWeight: 600}}>Patient Login</Typography>
        <Typography>Verify your Identity</Typography>
        <Typography>Use your Biometrics to verify Identity</Typography>
        <img src="/fingerprint.png" alt="fingerprint" style={{height: 60,width:60,marginTop:10}} />
        <Typography>Touch the Fingerprint Sensor.</Typography>
      </Component>
    </ParentComponent>
    </>
    
  )
}
