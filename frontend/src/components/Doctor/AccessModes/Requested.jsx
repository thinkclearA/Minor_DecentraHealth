import React from 'react'

//MUI
import {Button,TableCell, TableRow} from "@mui/material";

export default function Requested({ aadhar, name}) {

    return (
        <>
            <TableRow>
                <TableCell component='th' scope='row' style={{ fontSize: 16, fontWeight: 600 }}>{name}</TableCell>
                <TableCell component='th' scope='row' style={{ fontSize: 16 }}>{aadhar}</TableCell>
                <TableCell component='th' scope='row'><Button style={{height: '40px',width:'100px',backgroundColor: 'red',color: '#fff',fontWeight :'600',fontSize: '16px'}} >Requested</Button></TableCell>
                <TableCell component='th' scope='row'><Button disabled style={{height: '40px',width:'100px',backgroundColor: '#FFDEAD',color: '#fff',fontWeight :'600',fontSize: '16px'}} >Reports</Button></TableCell>
            </TableRow>

        </>)
}
