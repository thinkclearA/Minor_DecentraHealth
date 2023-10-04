import React from 'react';
import { useState } from 'react'
import { useNavigate } from "react-router";
import axios from 'axios'

//MUI
import { Box, styled, Typography, Grid,Button, TextField} from '@mui/material';

const Component = styled(Box)(({ theme }) => ({
  margin: '60px auto 0 auto',
  width: '90%',
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
  width:'90%',
  marginTop: '10%',
  [theme.breakpoints.down('md')]: {
    marginTop: 0
  }
}))


const Form = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  margin: '50px auto 0 auto',
  width: '50%',
  [theme.breakpoints.down('md')]: {
    margin: '20px auto 0 auto'
  }
}))


const Input = styled(Box)`
  display:flex;
  flex-direction : column;
  flex:1;
  margin-bottom: 20px;
  &>div , &>button, &>p{
        margin-top: 30px;
    }
`

function HospitalSignupPage() {

  const navigate = useNavigate();
  const [values, setValues] = useState({
    hospitalName: "",
    hospitalRegnumber: "",
    type: "0",
    password: "",
    cpassword: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (values.hospitalName.trim() !== "" && values.hospitalRegnumber.trim() !== "" && values.password.trim() !== "" && values.cpassword.trim() !== "") {

      // const res = await axios.post('http://localhost:8000/getPatientsHospital',{HospitalID: hospitalRegnumber} );

      axios.post('http://localhost:8000/HospitalSignup', {
        values
      })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            navigate(`/Admin/:${values.hospitalRegnumber}`, { state: { values: { doctors: response.data.doctors, hospitalName: response.data.Name, hospitalRegnumber: response.data.regNo, patients: response.data.patients } } }, { replace: true });
          }
          else if (response.status === 204) {
            alert("Hospital already registered");
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
      <Component>
        <Container container>
          <Grid item lg={6} md={4} sm={8} xs={12}>
            <Image src='/hospitalsignup.png' alt="Sample image" />
          </Grid>
          <Grid item lg={6} md={8} sm={8} xs={12}>
            <Form>
              <Typography variant='h4' fontWeight={600}>Sign up</Typography>
              
              <Box style={{marginTop:30}}>
                  <label className="form-label">Type of Hospital :</label>
                  <input className="form-check-input ml-5 " type="radio" name="type" id="gov" onChange={handleChange} value="gov"></input>
                  <label className="ml-2 mr-4" for="gov">Government</label>
                  <input className="form-check-input ml-5" type="radio" name="type" id="private" onChange={handleChange} value="private"></input>
                  <label className="ml-2" for="private">Private</label>
              </Box>

              <Input>
                  <TextField type="text" name="hospitalName" onChange={handleChange} value={values.hospitalName} id="hospitalName" variant='standard' label='Hospital Name'/>
                  {submitted && !values.hospitalName ? <span id="first-name-error">Please enter the hospital name.</span> : null}

              
                  <TextField type="text" name="hospitalRegnumber" id="hospitalRegnumber" label='Hospital Reg Number' onChange={handleChange} value={values.hospitalRegnumber} variant='standard' />
                  {submitted && !values.hospitalRegnumber ? <span id="hospitalRegnumber-error">Please enter the hospital registration number.</span> : null}


                  <TextField type="text" id="password" onChange={handleChange} value={values.password} name="password" label='Password' variant='standard' />
                  {submitted && !values.password ? <span id="password-error">Please enter password</span> : null}
  
                  <TextField type="password" id="cpassword" onChange={handleChange} value={values.cpassword} name="cpassword" label='Confirm password' variant='standard' />
                  {values.cpassword !== values.password ? <p id="password-error" style={{ color: 'red' }}>Passwords do not match</p> : null}
                  {submitted && !values.cpassword ? <span id="password-error">Please Confirm Password</span> : null}
  
              
                {/* <FormControlLabel label="I agree all statements in Terms & Conditions " /> */}
                
                <Button type="submit" variant='contained' onClick={handlesubmit} style={{width: 100,height: 40,margin: '40px auto 0 auto'}}>Register</Button>
                </Input>

              <p>Have already an account? <p onClick={() => { navigate("/HospitalLogin"); }}><u style={{cursor:'pointer'}}>Login here</u></p></p>
            </Form>
          </Grid>
        </Container>
      </Component>
    </>
  )
}

export default HospitalSignupPage;
