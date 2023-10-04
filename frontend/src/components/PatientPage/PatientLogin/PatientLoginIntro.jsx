import React from 'react'

import { useNavigate } from "react-router";

//MUI
import { Box, Button, Typography, styled } from "@mui/material";

//CSS
const ParentComponents = styled(Box)`
    margin-top : 50px;
`
// const Title = styled(Typography)`
//     font-size: 70px;
//     color: #207868;
// `
const Components = styled(Box)`
   text-align: center;
    display:flex;
    flex-direction: column;
    &>img{
    margin: 50px auto 0px auto;
  }
    &>button{
      width: 300px;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;
      background-color: #2C88D9;
      color: #fff;
      font-weight :600;
      font-size: 16px;
      height: 50px;
    }
`

export default function PatientLoginIntro() {
  const navigate = useNavigate();
  return (
    <ParentComponents>
      <Components>
        {/* <Title> DecentraHealth </Title> */}
        <img src="/patientLoginIntro.jpg" alt="patient_login_intro" style={{width: 500, height: 400}}/>
        <Typography style={{color:'#1AAE9F',fontSize: 28, fontWeight: 600,margin: '18px 0 5px 0'}}>Patient Login</Typography>
        <Button variant="contained" onClick={() => { navigate("/PatientLoginOtp"); }}>Login with OTP</Button>
        <Button variant="contained" onClick={() => { navigate("/PatientLoginFingerprint"); }}>Login with Fingerprint</Button>
      </Components>
    </ParentComponents>
  )
}
