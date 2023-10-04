import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import PatientCard from './PatientCard';
import AddMember from './AddMember';

//MUI
import { Box,styled } from '@mui/material';

const Component = styled(Box)`
  margin: 100px auto 0px auto;
`

const CardWrapper = styled(Box)`
  margin: 0px auto 0px 25px;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(360px, 0fr));
`

function Patient() {
  const params = useParams();
  console.log(params);

  const [values, setValues] = useState({
    Name: "",
    Aadhar: "",
    Age: "",
    Gender: "",
    Phone: params.phone,
    patients: []
  });

  const [submitted, setSubmitted] = useState(false);
  const handleNull = () => {
    setValues({
      ...values,
      Name: "",
      Aadhar: "",
      Age: "",
      Gender: "",
      Phone: params.phone,
      patients: values.patients
    });
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  useEffect(() => {


    axios.post('http://localhost:8000/getPatients',
      { Phone: values.Phone }
    )
      .then(function (response) {
        console.log(response);
        setValues(prevState => ({
          ...prevState,
          patients: response.data
        }));
      });
  }, []);
  const handlenew = (newpatient) => {
    // newpatient.preventDefault();
    console.log(newpatient)
    // setValues({
    //     ...values,
    //     Name: newpatient.Name,
    //     Aadhar: newpatient.Aadhar,
    //     Age: newpatient.Age,
    //     Gender: newpatient.Gender,
    //     Phone: newpatient.Phone
    // });
    setValues(prevState => ({
      ...prevState,
      patients: newpatient
    }));
    console.log(values);
    //    useEffect(() => {


    //     axios.post('http://localhost:8000/getPatients',
    //     {Phone:values.Phone}
    //     )
    //       .then(function (response) {
    //         console.log(response);
    //         setValues(prevState => ({
    //           ...prevState, 
    //           patients: response.data
    //        }));
    //       });
    // }, []);
  }

  return (
    <>
      <Component>
        <AddMember phone={values.Phone} handlenew={handlenew} setSubmitted={setSubmitted} handleChange={handleChange} handleNull={handleNull} submitted={submitted} values={values} />
        <CardWrapper >
          {values.patients.map((patient) => {
            return <>
              <PatientCard aadhar={patient.Aadhar} name={patient.Name} age={patient.Age} gender={patient.Gender} />
            </>
          })}
        </CardWrapper>
      </Component>
    </>
  )
}

export default Patient;
