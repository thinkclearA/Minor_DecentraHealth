import React from 'react';
import { useLocation} from 'react-router-dom';

//MUI
import { Box, Button, Typography, styled, TableContainer, TableCell, TableRow, TableHead, Table,TableBody, TextField } from "@mui/material";
import AccessList from './AccessList';

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



const Tablecontainer = styled(TableContainer)`
    margin-top: 40px;
`

const Tablerow = styled(TableRow)`
    &>th{
     font-size: 16px;
     font-weight: 600;
    }
`

export default function AccessRequest() {

  const {state} = useLocation();
  console.log( state.DoctorRequests[0])
  return (
    <ParentComponent>
    <Title>
        Access Request
    </Title>
    <LowerComponent>
        <Typography variant='h4'>Hello, {state.Name}</Typography>
        <Tablecontainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <Tablerow>
                        <TableCell>S.No</TableCell>
                        <TableCell>Doctor Name</TableCell>
                        <TableCell>Access Level</TableCell>
                        <TableCell>Grant Access</TableCell>
                    </Tablerow>
                </TableHead>
                <TableBody>
                {
                    state.DoctorRequests.map((doctor,index)=>
                  <AccessList patientid={state.Aadhar} doctorid={doctor.doctorId} Name={doctor.Name} SNo={index+1}></AccessList>
                    )
                }
                </TableBody>
            </Table>
        </Tablecontainer>
    </LowerComponent>
</ParentComponent>
  )
}
