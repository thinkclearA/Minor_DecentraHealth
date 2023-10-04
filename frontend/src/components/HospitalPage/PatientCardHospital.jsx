import React, { useState } from 'react'
import { useNavigate } from "react-router";
import axios from 'axios';

//MUI
import { Button, TableCell, TableRow, } from "@mui/material";

function PatientCardHospital({ serialnumber,aadhar, name, regNo, age, gender }) {

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const goToPatient = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log(regNo);
    axios.post('http://localhost:8000/getDoctors', { hospitalRegnumber: regNo }).then((response) => {
      console.log(response.data);
      if (response.status === 200)
        navigate(`/PatientPageHospital/${aadhar}`, { state: { values: response.data, name: name, age: age, gender: gender } });
    })
  }
  return (
    <>
      <TableRow>
        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{serialnumber}</TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{aadhar}</TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{name}</TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{regNo}</TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{age}</TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{gender}</TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: 16 }}><Button style={{ height: '40px', width: '140px', backgroundColor: 'green', color: '#fff', fontWeight: '600', fontSize: '16px' }} onClick={goToPatient}>Apply</Button></TableCell>
        <TableCell component='th' scope='row' style={{ fontSize: 16 }}><Button style={{ height: '40px', width: '140px', backgroundColor: 'red', color: '#fff', fontWeight: '600', fontSize: '16px' }} >Remove</Button></TableCell>
      </TableRow>
    </>
  )
}

export default PatientCardHospital;

{/* <td>{aadhar}</td>
    <td>{name}</td>
    <td>{regNo}</td>
    <td>{age}</td>
    <td>{gender}</td>
    <button className="btn btn-primary" onClick={goToPatient} style={{ color: "white", backgroundColor: "Blue", margin: "0px 5px 5px 50px" }}>Assign Doctor</button>
    <button className="btn btn-primary" style={{ color: "white", backgroundColor: "Blue", margin: "0px 5px 5px 20px" }}>Remove</button> */}