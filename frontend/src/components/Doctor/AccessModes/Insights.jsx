import React, { useState } from 'react'
import { useNavigate } from "react-router";
import axios from 'axios';

//MUI
import {Button,TableCell, TableRow} from "@mui/material";

export default function Insights({ aadhar, name}) {
    const navigate = useNavigate();
    const goToInsight = ()=>{
        navigate('/PatientInsight',{ state: { Name: name , Aadhar: aadhar}});
      }

    return (
        <>
            <TableRow>
                <TableCell component='th' scope='row' style={{ fontSize: 16, fontWeight: 600 }}>{name}</TableCell>
                <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{aadhar}</TableCell>
                <TableCell component='th' scope='row'><Button style={{height: '40px',width:'100px',backgroundColor: '#32CD32',color: '#fff',fontWeight :'600',fontSize: '16px'}} onClick={goToInsight}>Insight</Button></TableCell>
                <TableCell component='th' scope='row'><Button disabled style={{height: '40px',width:'100px',backgroundColor: '#FFDEAD',color: '#fff',fontWeight :'600',fontSize: '16px'}} >Reports</Button></TableCell>
            </TableRow>

        </>)
}
