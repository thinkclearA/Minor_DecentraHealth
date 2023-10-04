import React from 'react';
import { useNavigate } from 'react-router-dom';

//MUI
import { AppBar, Toolbar, styled, Typography} from '@mui/material';

//components
import CustomButtons from './CustomButtons';

const StyledHeader = styled(AppBar)`
    background : #fff;
    height: 60px;
`

export default function Appbar() {
  const navigate = useNavigate();
  return (
    <>
      <StyledHeader>
        <Toolbar >
          <Typography variant='h3' style={{color: '#207868',cursor:'pointer'}} onClick={() => { navigate("/"); }}>DecentraHealth</Typography>
          <CustomButtons/>
        </Toolbar>
      </StyledHeader>
    </>
  );
}

