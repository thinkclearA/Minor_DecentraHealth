import axios from 'axios';
import React,{useState} from 'react'
import { useLocation} from 'react-router-dom'
import HospitalCard from './HospitalCard';

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
    margin-top:20px;
    &>button{
      color:white;
      background-color: #6558F5;
      width:100px;
      height:50px;
      font-size:16px;
    },
    &>div{
      margin:0 30px 0 0;
      width: 40%;
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

function PaitentPage(){
    const [submitted, setSubmitted] = useState(false);
    //const { aadhar } = useParams();
    const {state} = useLocation();
    const [files, setFiles] = useState([]);
    //console.log(state);
    function showDocs(e){
        e.preventDefault();
        setSubmitted(true);
        axios.post('http://localhost:8000/viewFiles', {aadhar: state.values.Aadhar}).then((response) => {
            console.log(response.data);
                setFiles((prevState) => {
                    return [prevState,...response.data];
                })
        })
    }
    
      return (
        <>
           <ParentComponent>
                <Title>
                    Book an Appointment
                </Title>
                <LowerComponent>
                    <Typography variant='h4'>Hello, {state.values.Name}</Typography>
                    <InputSearch>
                      <TextField variant='filled' label='Search for hospital,doctor,specialization'></TextField>
                      <TextField variant='filled' label='Location'></TextField>
                      <Button>Search</Button>
                    </InputSearch>
                    <Tablecontainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <Tablerow>
                                    <TableCell>S.No </TableCell>
                                    <TableCell>Hospital Id</TableCell>
                                    <TableCell>Hospital Name</TableCell>
                                    <TableCell>Qualification</TableCell>
                                </Tablerow>
                            </TableHead>
                            <TableBody>
                                {state.values.hospitals.map((hospital,index) => (
                                  <HospitalCard id={hospital.regNo} name={hospital.Name} state={state} sno={index+1} />
                                ))}
                            </TableBody>
                        </Table>
                    </Tablecontainer>
                </LowerComponent>
            </ParentComponent>
        </>
      )
    }
    
    
export default PaitentPage;
