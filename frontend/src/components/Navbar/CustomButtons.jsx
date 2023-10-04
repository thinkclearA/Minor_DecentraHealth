import React from 'react';
import { useNavigate } from "react-router";


//Material UI
import { Box,Typography, styled } from '@mui/material';

const Wrapper = styled(Box)(({ theme }) => ({
    display:'flex',
    margin: '0 0 0 auto',
    '& > p': {
        marginRight: '40px !important',
        fontSize:'20px',
        alignItems : 'center',
        cursor: 'pointer',
        color:'black'
    },
    // [theme.breakpoints.down('md')]: {
    //     display: 'block'
    // }
}))

export default function CustomButtons() {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Typography  onClick={() => { navigate("/"); }}>Home</Typography>
            <Typography  onClick={() => { navigate("/PatientLogin"); }}>Patient</Typography>
            <Typography  onClick={() => { navigate("/DoctorLogin"); }}>Doctor</Typography>
            <Typography  onClick={() => { navigate("/HospitalLogin"); }}>Hospital</Typography>
            <Typography  onClick={() => { navigate("/Creators"); }}>Creator</Typography>
        </Wrapper>
    )
}
