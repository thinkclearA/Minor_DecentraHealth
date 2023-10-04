import React from "react"
import { useNavigate } from "react-router";

//MUI
import { Box, Button, Typography, styled } from "@mui/material";

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
    &>img{
    margin: 30px auto 0 auto;
  }
   
`
const ButtonWrapper = styled(Box)`
    display:flex;
    flex-direction: column;
     &>button{
      width: 300px;
      text-align: center;
      margin: 7px auto;
      background-color: #2C88D9;
      color: #fff;
      font-weight :600;
      height: 50px;
      font-size: 16px;
    }
`
function Home() {
  const navigate = useNavigate();
  return (
    <ParentComponent>
      <Component>
        {/* <Title>
          DecentraHealth
        </Title> */}
        <img src="/home.png" alt="homepage_img" style={{width: 600, height: 480,}}/>
        <ButtonWrapper>
        <Button variant="contained" onClick={() => { navigate("/PatientLogin"); }}>Patient</Button>
        <Button variant="contained" onClick={() => { navigate("/DoctorLogin"); }} style={{marginTop:15}}>Healthcare Operator</Button>
        </ButtonWrapper>
      </Component>
    </ParentComponent>
  )
}

export default Home;

