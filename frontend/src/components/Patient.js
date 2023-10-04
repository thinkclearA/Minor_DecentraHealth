import axios from 'axios';
import React, { useState, useEffect } from 'react'
import {useParams } from 'react-router-dom'
import PatientCard from './PatientCard';
import AddMember from './AddMember';


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
  
 const myStyle = {
    width: '70rem',
  }

  return (
<>
  <div className="container my-5">
    <div className="card text-left border-dark text-black" style={myStyle}>
      <div className="card-header  border-dark">
        Patient List
      </div>
      <div className="card-body">
        <table class="table table-hover border-success">
          <thead>
            <tr>
              <th scope="col">Aadhar</th>
              <th scope="col">Name</th>
              <th scope="col">Age</th>
              <th scope="col">Gender</th>
            </tr>
          </thead>
          <tbody>
              <AddMember phone={values.Phone} handlenew={handlenew} setSubmitted={setSubmitted} handleChange={handleChange} handleNull={handleNull} submitted={submitted} values={values} />
              {values.patients.map((patient) => {
                console.log(patient);
                return <>
                 <tr> <PatientCard aadhar={patient.Aadhar} name={patient.Name} age={patient.Age} gender={patient.Gender}/> </tr>
                </>
              })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</>
)
}

export default Patient;