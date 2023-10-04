import React, { useState } from 'react'
import { useNavigate } from "react-router";
import axios from 'axios';

//MUI
import { Button, TableCell, TableRow, } from "@mui/material";

function HospitalCard({ id, name, state,sno}) {

    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const goToPatient = (e) => {
        e.preventDefault();
        setSubmitted(true);
        console.log("state", state);
        const values = {
            Name: state.values.Name,
            Aadhar: state.values.Aadhar,
            Age: state.values.Age,
            Gender: state.values.Gender,
            HospitalID: id
        }
        axios.post('http://localhost:8000/addPatientHospital', values)
            .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    alert("Applied succesfully!!");
                }
            });
    }
    return (<>
        <TableRow>
                <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{sno}</TableCell>
                <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{id}</TableCell>
                <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{name}</TableCell>
                <TableCell component='th' scope='row' style={{ fontSize: 16 }}>MBBS</TableCell>
                <TableCell component='th' scope='row' style={{ fontSize: 16 }}><Button style={{height: '40px',width:'140px',backgroundColor: '#2C88D9',color: '#fff',fontWeight :'600',fontSize: '16px'}} onClick={goToPatient}>Apply</Button></TableCell>
            </TableRow>


    </>
    )
}

export default HospitalCard;
{/* <td>{id}</td>
        <td>{name}</td>
        <button className="btn btn-primary" onClick={goToPatient} style={{ color: "white", backgroundColor: "Blue", margin: "0px 5px 5px 5px", position: "relative", left: "50px" }}> APPLY</button>
        <button className="btn btn-primary" style={{ color: "white", backgroundColor: "Blue", margin: "0px 5px 5px 10px", position: "relative", left: "50px" }}>REMOVE</button> */}