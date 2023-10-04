import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Button, Dialog } from '@material-ui/core'
import { Box,styled } from '@mui/material';

const DialogBox = styled(DialogContent)`
    &>div:{
        marginTop: 20px;
    }
`

export default function AddDoctor({ handleChange, values, onClick, submitted }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box style={{ margin: '0% 0% 0% 8%' }}>
            <Button size="large" type='submit' variant="contained" onClick={handleClickOpen} > Add Doctor </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Registration Form</DialogTitle>
                <DialogBox>
                    <TextField onChange={handleChange} value={values.Name} id="Name" class="form-field" type="text" placeholder="Doctor Name" name="Name" fullWidth /> {submitted && !values.Name ? <span id="Name-error">Please enter Doctor Name</span> : null}


                    <TextField onChange={handleChange} value={values.UPRN} id="URPN" class="form-field" type="text" placeholder="UPRN Number" name="UPRN" fullWidth /> {submitted && !values.Name ? <span id="Name-error">Please enter UPRN Number</span> : null}

                    <TextField onChange={handleChange} value={values.speciality} id="speciality" class="form-field" type="text" placeholder="speciality" name="speciality" fullWidth /> {submitted && !values.Name ? <span id="Name-error">Please enter speciality</span> : null}

                    <Button size="large" type='submit' variant="contained"
                        fullWidth style={{
                            height: "60px", width: "150px", margin:'25px',alignItems: "center",
                            backgroundColor: "#013220",
                            color: "white",
                            justifyContent: "center"
                        }} onClick={onClick}>Add Doctor</Button>

                </DialogBox>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
