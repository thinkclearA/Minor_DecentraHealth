import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

//Components
import Home from "./components/Home/Home";
import DoctorLogin from './components/Doctor/DoctorLogin';
import HospitalSignupPage from "./components/HospitalPage/HospitalSignupPage";
import HospitalLogin from "./components/HospitalPage/HospitalLogin"
import Admin from './components/HospitalPage/Admin'
import PatientLoginIntro from "./components/PatientPage/PatientLogin/PatientLoginIntro";
import PatientLoginOtp from "./components/PatientPage/PatientLogin/PatientLoginOtp";
import PatientLoginFinger from "./components/PatientPage/PatientLogin/PatientLoginFinger";
import Patient from "./components/PatientPage/Patient";
import PatientPage from "./components/PatientPage/PatientPage";
import PatientAccessControl from "./components/PatientPage/PatientAccessControl";
import FileUpload from "./components/Doctor/ViewReports/FileUpload";
import FileDownload from "./components/PatientPage/PatientReports/FileDownload";
import PatientPageHospital from "./components/PatientPageHospital"
import PatientPageDoctor from './components/Doctor/ViewReports/PatientPageDoctor'
import Doctor from "./components/Doctor/Doctor";
import Appbar from "./components/Navbar/Appbar";
import ViewReports from './components/PatientPage/PatientReports/ViewReports';
import Creators from './components/Creators/Creators';
import InputSymptoms from './components/PatientPage/InputSymptoms';
import PatientIntroPage from "./components/PatientPage/PatientIntroPage";
import RecommendedDocs from "./components/RecommendedDocs";
import AccessRequest from './components/PatientPage/AccessControl/AccessRequest'
import ActiveGrantedReq from "./components/PatientPage/AccessControl/ActiveGrantedReq";
import DoctorFingerprint from './components/Doctor/DoctorFingerprint';

//Material UI
import { Box } from '@mui/material';
import PatientInsight from "./components/PatientPage/PatientInsight";


function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar />
        <Box >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/DoctorLogin" element={<DoctorLogin />} />
            <Route path="/HospitalSignupPage" element={<HospitalSignupPage />} />
            <Route path="/HospitalLogin" element={<HospitalLogin />} />
            <Route path="/Admin/:id" element={<Admin />} />
            <Route path="/PatientLogin" element={<PatientLoginIntro />} />
            <Route path="/PatientLoginOtp" element={<PatientLoginOtp />} />
            <Route path="/PatientLoginFingerprint" element={<PatientLoginFinger />} />
            <Route path="/Patient/:phone" element={<Patient />} />
            <Route path="/PatientPage/:id" element={<PatientPage />} />
            <Route path='/PatientIntroPage' element={<PatientIntroPage />} />
            <Route path='/PatientInsight' element={<PatientInsight />} />
            <Route path='/PatientAccessControl' element={<PatientAccessControl />} />
            <Route path="/fileUpload/:aadhar" element={<FileUpload />} />
            <Route path="/FileDownload" element={<FileDownload />} />
            <Route path="/PatientPageDoctor/:aadhar" element={<PatientPageDoctor />} />
            <Route path="/PatientPageHospital/:aadhar" element={<PatientPageHospital />} />
            <Route path="/Doctor" element={<Doctor />} />
            <Route path="/InputSymptoms" element={<InputSymptoms />} />
            <Route path="/ViewReports" element={<ViewReports />} />
            <Route path="/RecommendedDocs" element={<RecommendedDocs />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/Creators" element={<Creators />} />
            <Route path='/Patient/AccessRequest' element={<AccessRequest />}/>
            <Route path='/Patient/AccessGrantedReq' element={<ActiveGrantedReq />}/>
            <Route path='/DoctorFingerprint' element={<DoctorFingerprint />}/>
          </Routes>
          </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
