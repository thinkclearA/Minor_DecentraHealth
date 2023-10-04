import React from 'react';
import { useLocation} from 'react-router-dom';

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

const Tablerow = styled(TableRow)`
    &>th{
     font-size: 16px;
     font-weight: 600;
    }
`

const Tablecontainer = styled(TableContainer)`
    margin-top: 40px;
`

export default function ActiveGrantedReq() {

  const {state} = useLocation();

  return (
    <ParentComponent>
    <Title>
        Access Control
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
                <TableRow>
                        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>1</TableCell>
                        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>Dr. Aditya</TableCell>
                        <TableCell component='th' scope='row' style={{ fontSize: 16 }}>Level 1</TableCell>
                        <TableCell><Button style={{background: '#D3455B',color:'#fff',height: '40px',width:'140px',fontWeight :'600',fontSize: '16px'}}>Revoke</Button></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Tablecontainer>
    </LowerComponent>
</ParentComponent>
  )
}
