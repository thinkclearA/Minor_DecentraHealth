import { useState } from 'react'
import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";
import { Form } from 'react-bootstrap';

//MUI
import { Box, Button, Typography, styled, TextField} from "@mui/material";

//CSS
const ParentComponent = styled(Box)`
    margin-top : 73px;
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
    margin: 0 auto;
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

const LowerComponent= styled(Form)`
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
function HospitalLogin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        hospitalRegnumber: "",
        password: "",
        patients: [] });
    const [submitted, setSubmitted] = useState(false);
    const handlesubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (values.hospitalRegnumber.trim() !== "" && values.password.trim() !== "") {
            // const res = await axios.post('http://localhost:8000/getPatientsHospital',{HospitalID: hospitalRegnumber} );
            axios.post('http://localhost:8000/hospitalLogin',
                values
            )
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        navigate(`/Admin/:${values.hospitalRegnumber}`, { state: { values: { doctors: response.data.doctors, hospitalName: response.data.Name, hospitalRegnumber: response.data.regNo, patients: response.data.patients } } });
                    }
                    else if (response.status === 203) {
                        alert("Wrong Password,Try again");
                    }
                    else if (response.status === 204) {
                        alert("Hospital not found!");
                    }
                    else
                        alert("Something went wrong");
                })
                .catch(function (error) {
                    console.log(error);

                });
        }
        else {
            alert("Please Fill every field");
        }

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
          <img src="/hospitallogin.png" alt="patient_login_intro" style={{ width: 360, height: 350 }} />
          <Typography style={{ color: '#1AAE9F', fontSize: 28, fontWeight: 600, marginTop: 20 }}>Healthcare Login</Typography>
          <LowerComponent>
            <TextField variant='outlined' placeholder='HealthCare Id' onChange={handleChange} value={values.hospitalRegnumber} id="hospitalRegnumber" type="text" name="hospitalRegnumber"></TextField>
            {submitted && !values.hospitalRegnumber ? <span id="hospitalRegnumber-error">Please enter hospital registration number</span> : null}
            <TextField variant='outlined' placeholder='Password' onChange={handleChange} value={values.password} id="password" type="password" name="password" style={{marginTop:20}}></TextField>
            {submitted && !values.password ? <span id="password-error">Please enter password</span> : null}
            <Button type='submit' onClick={handlesubmit}>Login</Button>
            <Typography style={{margin:'20px 0 0 0'}} >Don't have an account ? <p onClick={() => {navigate("/HospitalSignupPage");}} style={{cursor:'pointer',fontWeight:600}}>Sign Up</p></Typography>
          </LowerComponent>
        </Component>
      </ParentComponent>
    </>
    )
}

export default HospitalLogin;
