import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//MUI
import { Box, styled, Typography, Grid,Button} from '@mui/material';

const Component = styled(Box)(({ theme }) => ({
  margin: '80px auto 0 auto',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    margin: '60px auto 0 auto',
  }
}))

const Container = styled(Grid)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    margin: 0
  }
}))

const Image= styled('img')(({ theme }) => ({
  width:'70%',
  marginLeft:'60px',
  marginTop: '13%',
  [theme.breakpoints.down('md')]: {
    width : '100%',
    margin : '20px 0 0 0',
  }
}))

const LeftComponent = styled(Grid)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      width : '100%',
      margin: '0'
    }
}))

const Buttons = styled(Button)(({ theme }) => ({
      width:'35%',
      margin: '30px 0 20px 100px',
      backgroundColor: '#2C88D9',
      color: '#fff',
      fontWeight : '500',
      height: '40px',
      fontSize: '16px',
      [theme.breakpoints.down('lg')]: {
        width : '50%',
        margin:'10px auto 10px auto'
      }
  }))
function PatientIntroPage() {

    const { state } = useLocation();
    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    
    const goToPatient = (e) => {
        e.preventDefault();
        setSubmitted(true);
        axios.get('http://localhost:8000/getHospitals')
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    navigate(`/PatientPage/:${state.Aadhar}`, { state: { values: { hospitals: response.data, Name: state.Name, Aadhar: state.Aadhar, Age: state.Age, Gender: state.Gender } } });
                }
            });
    }

    const goToInsight = ()=>{
      navigate('/PatientInsight',{ state: { Name: state.Name, Aadhar: state.Aadhar, Age: state.Age, Gender: state.Gender } });
    }
    
    const goToRecc = (e) => {
      e.preventDefault();
      setSubmitted(true);
      navigate(`/InputSymptoms`, {state: { Name: state.Name, Aadhar: state.Aadhar, Age: state.Age, Gender: state.Gender }});
    } 

    const goToAccess = ()=>{
      navigate('/PatientAccessControl', {state: { Name: state.Name, Aadhar: state.Aadhar, Age: state.Age, Gender: state.Gender }});
    }

    return (
      <>
        <Component>
        <Typography variant='h3' textAlign={'center'}>Patient Dashboard</Typography>
        <Container container>
          <LeftComponent item lg={6} md={4} sm={12} xs={12}>
            <Typography variant='h4' style={{margin:'60px 0px 20px 100px'}}>Hello, {state.Name}</Typography>
            <Buttons variant='contained' onClick={goToInsight}>Patient Insight</Buttons>
            <Buttons variant='contained'  onClick={goToPatient} >Book appointment</Buttons>
            <Buttons variant='contained' onClick={goToRecc}>Disease Prediction</Buttons>
            <Buttons variant='contained' onClick={()=>{ navigate(`/ViewReports`,{state: { Name: state.Name, Aadhar: state.Aadhar }}) }}>HealthCare Records</Buttons>
            <Buttons variant='contained' onClick={goToAccess}>Access Control</Buttons>
          </LeftComponent>
          <Grid item lg={6} md={8} sm={12} xs={12}>
            <Image src='/patientLoginIntro.jpg' alt="Sample image" />
          </Grid>
          </Container>
          </Component>
    </>
  )
}

export default PatientIntroPage;
