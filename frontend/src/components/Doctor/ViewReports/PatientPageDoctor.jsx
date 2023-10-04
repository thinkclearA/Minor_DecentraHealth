import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import FileDownload from '../../PatientPage/PatientReports/FileDownload';
import FileUpload from './FileUpload';

//MUI
import { Box, Button, Typography, styled, TableContainer, TableCell, TableRow, TableHead, Table,TableBody, TextField } from "@mui/material";

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
    margin: 20px 0px 0px 15px;
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

 function PaitentPageDoctor(){
    const { aadhar } = useParams();
    const{state}=useLocation();

    const [state2,setstate2]=useState([]);
    console.log(state.values)
    const handleup=(arr)=>{
        setstate2((prev)=>([...prev,...arr]
        
        ));
    }
    console.log(state2)
    useEffect(() => {
    axios.post('http://localhost:8000/viewFiles', {aadhar: aadhar}).then((response) => {
    console.log(response.data);
    if(response.status===200)
     {
        setstate2(prevState => ([
            ...prevState, 
            ...response.data
        ]));
        console.log(state2);
     }
})
   }, [])


    return (
      <ParentComponent>
                <Title>
                    View Reports
                </Title>
                <LowerComponent>
                    <InputSearch>
                      <FileUpload aadhar={aadhar} handleupl={handleup}/> 
                    </InputSearch>
                    <Tablecontainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <Tablerow>
                                    <TableCell>S.No</TableCell>
                                    <TableCell>Document Name</TableCell>
                                    <TableCell>Link</TableCell>
                                </Tablerow>
                            </TableHead>
                            <TableBody>
                            <FileDownload aadhar={state.Aadhar} files={state2} />
                            </TableBody>
                        </Table>
                    </Tablecontainer>
                </LowerComponent>
            </ParentComponent>
    )
}

export default PaitentPageDoctor;