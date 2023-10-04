import * as React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import {TextField, Button,Dialog,styled} from '@material-ui/core';

const ButtonWrap = styled(Button)`
  width: 20px;
`

export default function AddMember({ phone, handlenew, setSubmitted, handleChange, handleNull, submitted, values }) {
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => { 
    setOpen(true);
  };

  const handleClose = () => {
    values.Aadhar="";
    values.Age="";
    values.Name="";
    values.Gender="";
    setOpen(false);
  };

  return (
    <div style={{margin:'0px 0px 40px 25px'}}>
      <ButtonWrap size="large" type='submit'  variant="contained" onClick={handleClickOpen}> Add Members </ButtonWrap>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Fill the details </DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChange}
            value={values.Name}
            id="Name"
            class="form-field"
            type="text"
            placeholder="Name"
            name="Name"
            fullWidth
          />
          {submitted && !values.Name ? <span id="Name-error">Please enter hospital
            number</span> : null}
          <br />

          <TextField
            onChange={handleChange}
            value={values.Aadhar}
            id="Aadhar"
            class="form-field"
            type="text"
            placeholder="Aadhar Number"
            name="Aadhar"
            fullWidth
          />
          {submitted && !values.Aadhar ? <span id="Aadhar-error">Please enter Aadhar number</span> : null}
          <br />

          <TextField
            onChange={handleChange}
            value={values.Age}
            id="Age"
            class="form-field"
            type="number"
            placeholder="Age"
            name="Age"
            fullWidth
          />
          {submitted && !values.Age ? <span id="Age-error">Please enter Age</span> : null}
          <br />
          <TextField
            onChange={handleChange}
            value={values.Gender}
            id="Gender"
            class="form-field"
            type="text"
            placeholder="Gender"
            name="Gender"
            fullWidth
          />
          {submitted && !values.Gender ? <span id="Gender-error">Please enter Gender</span> : null}
          <Button size="large" type='submit' variant="contained"
            fullWidth style={{
              height: "60px", width: "150px", margin: "70px", alignItems: "center",
              backgroundColor: "#013220",
              color: "white",
              justifyContent: "center"
            }} onClick={(e) => {
              e.preventDefault();
              setSubmitted(true);
              handleClose();
              axios.post('http://localhost:8000/addPatients',
                values
              )
                .then(function (response) {
                  console.log(response);
                  handlenew(response.data.patients);
                  // setValues(values);
                  //   setValues(prevState => ({
                  //     ...prevState, 
                  //     patients: response.data.patients
                  //  }));
                  console.log(values);
                });
              // handleNull();
            }}>Add Patient</Button>
          <br />
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </div>
  );
}