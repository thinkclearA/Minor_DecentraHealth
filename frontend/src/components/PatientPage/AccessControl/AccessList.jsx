import { FormControl, InputLabel, MenuItem, Select, TableCell, TableRow, styled, Typography } from '@mui/material'
import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material'
import axios from 'axios'
const Tablerow = styled(TableRow)`
    &>th{
     font-size: 16px;
     font-weight: 600;
    }
`

function AccessList({ Name, SNo, patientid, doctorid }) {
    const [level, setlevel] = useState(0);

    const handleRequest = async (patientid, doctorid, level) => {
        const res = await axios.post('http://localhost:8000/grantAccess', {
            doctorid: doctorid,
            id: patientid,
            grant: level
        })
        console.log(res);
    }

    const handleChange = (e) => {
        setlevel(e.target.value);
    }

    const handleRevoke = async (patientid, doctorid) => {
        const res = await axios.post('http://localhost:8000/grantAccess', {
            doctorid: doctorid,
            id: patientid,
            grant: 2
        })
        console.log(res);
    }

    const [datas, setDatas] = useState('true');
    return (
        <>
        {
            datas === 'true' ?
            <Tablerow>
            < TableCell > { SNo }</TableCell >
            <TableCell>{Name}</TableCell>
            <TableCell><FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Level</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="level"
                    value={level}
                    onChange = {handleChange}
                >
                    <MenuItem value={0}>Level 0</MenuItem>
                    <MenuItem value={1}>Level 1</MenuItem>
                </Select>
            </FormControl></TableCell>
            <TableCell><Button  onClick={()=>{
                // http://localhost:8000/grantAccess
                //const doctorid = req.body.doctorid;
                // const patientid = req.body.id;
                // const accept = req.body.grant;
                handleRequest(patientid, doctorid, level);
                    setDatas(false);
            }} style={{ background: '#207868', color: '#fff',height: '40px',width:'140px',fontWeight :'600',fontSize: '16px'}}>Approve</Button>
            <Button onClick={()=>{
                handleRevoke(patientid, doctorid)}
            }
            style={{ background: '#D3455B', color: '#fff', marginLeft: '30px',height: '40px',width:'140px',fontWeight :'600',fontSize: '16px' }}>Revoke</Button></TableCell>
        </Tablerow> : <TableRow ><Typography variant='h4' style={{margin: '20px 0px 0px 20px ',}}>No Incoming Request!!!</Typography></TableRow>
        }
        </>
    )
}

export default AccessList