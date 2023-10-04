import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { generate } from '../utils/passgen';
import PatientCardHospital from './PatientCardHospital';
import AddDoctor from './AddDoctor';

//MUI
import { Box, Button, Typography, styled, TableContainer, TableCell, TableRow, TableHead, Table, TableBody, TextField } from "@mui/material";

//CSS
const ParentComponent = styled(Box)`
    margin-top : 80px;
`
const Title = styled(Typography)`
    font-size: 40px;
    color: #207868;
    text-align: center;   
`
const LowerComponent = styled(Box)`
    margin: 30px auto 0 auto;
    width:85%;
`

const InputSearch = styled(Box)`
    margin-top:20px;
    &>button{
      color:white;
      background-color: #6558F5;
      width:110px;
      height:50px;
      font-size:16px;
    },
    &>div{
      margin:0 30px 0 0;
      width: 41.5%;
    }
`

const Tablecontainer = styled(TableContainer)`
    margin-top: 40px;
`
const Tablerow = styled(TableRow)`
    &>th{
     font-size: 16px;
     font-weight: 600;
    }

`

// const addDoctor = function (values) {
// await axios.post('/addDoctor', values)
// .then ((response) => {
//     if(response.status===200)
//     {

//     }
//     else if(response.status==203)
//     {
//         //reject("Wrong Password,Try again");
//     }
//     else if(response.status==204)
//     {
//         //reject("Hospital not found!");
//     }
//     else
//     //reject("Something went wrong");
// })
// .catch(function (error) {
//   reject(error);

// });
// return new Promise( (resolve, reject) => {

//     const{ newDoctorId, newPassword }=generate(values);
//   //   setValues({
//   //     ...values,
//   //     doctorId: newDoctorId,
//   //     password:newPassword
//   // });
//   resolve({ newDoctorId, newPassword });
// });
// }

function Admin() {
  const { state } = useLocation();
  console.log(state);
  const [values, setValues] = useState({
    Name: "",
    UPRN: "",
    doctorId: "",
    hospitalRegnumber: state.values.hospitalRegnumber,
    hospitalName: state.values.hospitalName,
    password: ""
  });
  const [doctors, setdoctors] = useState(state.values.doctors);
  const [patients, setpatients] = useState(state.values.patients);
  // console.log(state.values);
  console.log("outide: ", doctors);
  const [submitted, setSubmitted] = useState(false);
  //const { hospitalRegnumber } = useParams();
  // const {state}=useLocation();
  // setdoctors(state);
  // console.log(state);
  // console.log(doctors);
  // axios.post('http://localhost:8000/getDoctors',
  //   hospitalRegnumber
  // )
  //   .then(function (response) {
  //     console.log(response);
  //     if (response.status === 200) {
  //       navigate(`/Admin/:${values.hospitalRegnumber}`, { replace: true });
  //     }
  //     else if (response.status == 203) {
  //       alert("Wrong Password,Try again");
  //     }
  //     else if (response.status == 204) {
  //       alert("Hospital not found!");
  //     }
  //     else
  //       alert("Something went wrong");
  //   })
  //   .catch(function (error) {
  //     console.log(error);

  //   });
  const handleChange = (e) => {
    e.preventDefault();
    console.log("values");
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  useEffect(() => {

    axios.post('http://localhost:8000/getDoctors',
      state.values
    )
      .then(function (response) {
        console.log(response);
        setdoctors(response.data);
      });
    axios.post('http://localhost:8000/getPatientsHospital',
      { HospitalID: state.values.hospitalRegnumber }
    )
      .then(function (response) {
        console.log(response);
        setpatients(response.data);
      });
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const { newDoctorId, newPassword } = generate(values);
    // setValues((prevState) => {
    //   return {
    //     ...prevState,
    //       doctorId: newDoctorId,
    //       password: newPassword
    //   }
    // });
    values.doctorId = newDoctorId;
    values.password = newPassword;
    setValues(values);

    //addDoctor(values).then (function (received){

    axios.post('http://localhost:8000/addDoctors', values).then(function (response) {
      alert(`doctor added ${response.data.Name}`);
      // function Admin() {
      //ßconsole.log(error);
      //doctors.push(state.values.doctors);
      // doctors.push(values);
      console.log(values);
      setdoctors((prevState) => {
        return [...prevState, values];
      });
      console.log(doctors);
    });
  }

  const myStyle = {
    width: '70rem',
    backgroundColor: 'white'
  }

  return (
    <ParentComponent>
    
      <Title>
        Admin
      </Title>
      <AddDoctor handleChange={handleChange} values={values} onClick={onClick} submitted={submitted}/>
      <LowerComponent>
        <InputSearch>
          <TextField variant='filled' label='Search for Patient using Name/Aadhar'></TextField>
          <TextField variant='filled' label='Search for Hospital using RegNo'></TextField>
          <Button>Search</Button>
        </InputSearch>
        <Tablecontainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <Tablerow>
                <TableCell>S.No </TableCell>
                <TableCell>Patient's Aadhar</TableCell>
                <TableCell>Patient's Name</TableCell>
                <TableCell>RegNo</TableCell>
                <TableCell>Patient's Age</TableCell>
                <TableCell>Gender</TableCell>
              </Tablerow>
            </TableHead>
            <TableBody>
              {patients.map((patient,index) => (
                <PatientCardHospital serialnumber = {index} aadhar={patient.Aadhar} name={patient.Name} regNo={values.hospitalRegnumber} age={patient.Age} gender={patient.Gender} />
              ))}
            </TableBody>
          </Table>
        </Tablecontainer>
      </LowerComponent>
    </ParentComponent>
  )
}

export default Admin;

{/* <AddDoctor handleChange={handleChange} values={values} onClick={onClick} submitted={submitted}/>
                {patients.map((patient) => {
                  return <tr><PatientCardHospital aadhar={patient.Aadhar} name={patient.Name} regNo={values.hospitalRegnumber} age={patient.Age} gender={patient.Gender} /> </tr>
                })} */}