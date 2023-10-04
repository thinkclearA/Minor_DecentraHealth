import React, { useState } from 'react'
import { useNavigate } from "react-router";
import axios from 'axios';

//MUI
import {Button,TableCell, TableRow} from "@mui/material";

export default function FullAccess({ aadhar, name}) {
    const navigate = useNavigate();
    const goToInsight = ()=>{
        navigate('/PatientInsight',{ state: { Name: name , Aadhar: aadhar}});
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
            <TableRow>
                <TableCell component='th' scope='row' style={{ fontSize: 16, fontWeight: 600 }}>{name}</TableCell>
                <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{aadhar}</TableCell>
                <TableCell component='th' scope='row'><Button style={{height: '40px',width:'100px',backgroundColor: '#32CD32',color: '#fff',fontWeight :'600',fontSize: '16px'}} onClick={goToInsight}>Insight</Button></TableCell>
                <TableCell component='th' scope='row'><Button style={{height: '40px',width:'100px',backgroundColor: 'orange',color: '#fff',fontWeight :'600',fontSize: '16px'}} onClick={viewReports}>Reports</Button></TableCell>
            </TableRow>

        </>)
}
