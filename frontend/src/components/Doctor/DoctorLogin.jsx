import React from 'react'
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router";
import { Form } from 'react-bootstrap';

//MUI
import { Box, Button, Typography, styled, TextField } from "@mui/material";

//CSS
const ParentComponent = styled(Box)`
    margin-top : 50px;
    .example::-webkit-scrollbar {
  display: none;
}
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
    margin: 50px auto 0 auto;
  }
    &>button{
      width: 300px;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;
      background-color: #2C88D9;
      color: #fff;
      font-weight :600;
      height: 50px;
      font-size: 16px;
    }
`

const LowerComponent = styled(Form)`
    display: flex;
    flex-direction: column;
    margin: 20px auto 0px auto;
    width:20%;
    &>button{
      width: 200px;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;
      background-color: #2C88D9;
      color: #fff;
      font-weight :600;
      height: 50px;
      font-size: 16px;
    }
`

const DoctorLogin = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    doctorId: "",
    doctorPass: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    axios.post("http://localhost:8000/findDoctor", { email: values.doctorId, password: values.doctorPass })
      .then((response) => {
        if (response.status === 200) {
          navigate(`/Doctor`, { state: { patients: response.data.patients, reqPatients: response.data.reqPatients, insPatients: response.data.insPatients, fullPatients: response.data.fullPatients,doctorId:values.doctorId} });
        }
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <>
      <ParentComponent>
        <Component>
          {/* <Title> DecentraHealth </Title> */}
          <img src="/doctorlogin.jpg" alt="patient_login_intro" style={{ width: 550, height: 350 }} />
          <Typography style={{ color: '#1AAE9F', fontSize: 28, fontWeight: 600, marginTop: 20 }}>Doctor Login</Typography>
          <LowerComponent>
            <TextField variant='outlined' placeholder='Doctor Id' onChange={handleChange} value={values.doctorId} id="doctorId" name="doctorId" ></TextField>
            {submitted && !values.doctorId ? <span id="first-name-error">Please enter correct Id</span> : null}
            <TextField variant='outlined' placeholder='Password' onChange={handleChange} value={values.doctorPass} id="doctorPass" name="doctorPass" type="password" style={{ marginTop: 20 }}></TextField>
            {submitted && !values.doctorPass ? <span id="doctorPass-error">Please enter correct password</span> : null}
            <Button type='submit' onClick={handlesubmit}>Login</Button>
          </LowerComponent>
        </Component>
      </ParentComponent>
    </>
  )
}

export default DoctorLogin;

