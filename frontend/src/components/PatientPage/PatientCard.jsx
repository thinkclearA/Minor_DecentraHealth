import React from 'react'
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


function PatientCard({ aadhar, name, age, gender }) {

    const navigate = useNavigate();

    const goToPatientIntroPage = (e)=>{
        e.preventDefault();
        navigate("/PatientIntroPage", { state: { Name: name, Aadhar: aadhar, Age: age, Gender: gender } });
    }

    return (
        <>
            <Card sx={{ display: 'flex', width:'350px'}} onClick={goToPatientIntroPage}>
            <CardMedia component="img" sx={{ width: '23%' }} image="/userprofile.png"/>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography variant="h5">
                            {name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            {age} {gender}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" >
                            {aadhar}
                        </Typography>
                    </CardContent>
                </Box>
                
            </Card>
        </>)
}

export default PatientCard;
