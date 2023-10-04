import axios from 'axios';
import React,{useState} from 'react';


function DoctorcardRecomm({id,Dname,speciality,hospital_name,aadhar, patientName, age, gender}) {
    console.log(id,Dname,speciality,hospital_name,aadhar, patientName);
    const [submitted, setSubmitted] = useState(false);
    const goToPatient = (e) =>{
        e.preventDefault();
        setSubmitted(true);
        const postInfo = {
           doctorId: id,
           Name: patientName,
           Aadhar: aadhar,
           Age: age,
           Gender: gender
        }
        axios.post('http://localhost:8000/addPatientDoctor', postInfo)
        .then(function (response){
            console.log(response);
            if(response.status === 200){
                alert("Patient assigned to doctor!");
            }
      });
  }

return(
  <>
    <td>{id}</td>
    <td>{Dname}</td>
    <td>{speciality}</td>
    <td>{hospital_name}</td>
    <button className="btn btn-primary" onClick={goToPatient} style={{ color: "white", backgroundColor: "Blue", margin: "0px 5px 5px 50px" }}>Submit</button>
  </> 
)}

export default DoctorcardRecomm