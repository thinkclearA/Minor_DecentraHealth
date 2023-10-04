import React from 'react';
import './Fingerprint.css';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import FullAccess from './AccessModes/FullAccess';

//MUI
import { Box, Typography, styled,Button } from "@mui/material";
import { FmdGood } from '@mui/icons-material';

//CSS
const ParentComponent = styled(Box)`
    margin-top : 120px;
`

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

const ParentComponents = styled(Box)`
margin-top : 50px;
`

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
export default function DoctorFingerprint() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [login, setLogin] = useState(false);
  const [photo, setPhoto] = useState('');
  const [aadhar, setAadhar] = useState('')
  const [name, setName] = useState('');

  const getUser = async () => {
    console.log(state.doctorId)
    axios.post('http://localhost:8000/level', { doctorId: state.doctorId })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setAadhar(response.data.Aadhar)
          setName(response.data.Name);
          if(response.data.Name === 'Yash Srivastava'){
              setPhoto('/yash.png')
          }
          if(response.data.Name === 'Shaurya Singh'){
              setPhoto('/shaurya.png')
          }
          if(response.data.Name === 'Pranshu Chandra'){
            setPhoto('/pranshu.png')
          }
          if(response.data.Name === 'Aditya Jha'){
            setPhoto('/aditya.png')
          }
          setLogin(true)
        }
      });
    // console.log(data);
    // setUser(data);    
  }


  useEffect(() => {
    getUser();
  }, []);

  const goToInsight = () => {
    navigate('/PatientInsight', { state: { Name: name, Aadhar: aadhar } });
  }
  const viewReports = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/viewFiles', { aadhar: aadhar }).then((response) => {
      console.log(response.data);
      if (response.status === 200)
        navigate(`/PatientPageDoctor/${aadhar}`, { state: { values: response.data } });
    })
  }
  return (
    <>
      {
        login === false ? 
        <ParentComponent>
          <Component>
            {/* <Title> DecentraHealth </Title> */}
            {/* <img src="/patientLoginIntro.jpg" alt="patient_login_intro" style={{ width: 400, height: 300 }} /> */}
            <Typography style={{ color: '#1AAE9F', fontSize: 28, fontWeight: 600, marginBottom: 30 }}>Patient Login</Typography>
            <Typography variant='h6'>Use your Biometrics to verify Identity</Typography>
            {/* <img src="/fingerprint.png" alt="fingerprint" style={{height: 60,width:60,marginTop:10}} /> */}
            <div class="scanner">
              <div class="fingarprint">
              </div>
              <h3>Scanning ....</h3>
            </div>
          </Component>
        </ParentComponent> :
          <ParentComponents>
            <Components>
              {/* <Title> DecentraHealth </Title> */}
              <img src={photo} alt="patient_login_intro" style={{height:300,width:300}}/>
              <Typography style={{ color: '#1AAE9F', fontSize: 28, fontWeight: 600, margin: '18px 0 5px 0' }}>Hello {name}</Typography>
              <Button variant="contained" onClick={goToInsight} >Insights</Button>
              <Button variant="contained" onClick={viewReports}>Reports</Button>
            </Components>
          </ParentComponents>
      }

    </>
  )
}

{/* <FullAccess aadhar={aadhar} name={name} /> */}