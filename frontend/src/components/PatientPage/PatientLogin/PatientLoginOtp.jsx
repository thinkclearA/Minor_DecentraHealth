import React from "react";
import { initializeApp } from "firebase/app";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

//MUI
import { Box, Button, Typography, styled, TextField } from "@mui/material";

//CSS
const ParentComponent = styled(Box)`
  margin-top: 50px;
`;
// const Title = styled(Typography)`
//   font-size: 70px;
//   color: #207868;
// `;
const Component = styled(Box)`
  text-align: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  & > img {
    margin: 50px auto 0px auto;
  }
`;

const LowerComponent = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;
const MobileInput = styled(Box)`
  display: flex;
  margin: 20px auto 0px auto;
  & > button {
    width: 120px;
    text-align: center;
    background-color: #2c88d9;
    color: #fff;
    font-weight: 600;
    height: 40px;
    font-size: 16px;
    margin: 30px 0px 0px 20px;
  }
`;

const OtpInput = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 30px auto 0px auto;
  & > button {
    width: 120px;
    text-align: center;
    background-color: #2c88d9;
    color: #fff;
    font-weight: 600;
    height: 40px;
    font-size: 16px;
    margin: 30px auto 0px auto;
  }
`;

const firebaseConfig = {
  apiKey: "AIzaSyD8gABqn8ga_qJtrPN0sZxED-16ErYY_ZQ",
  authDomain: "decentrahealth-6f444.firebaseapp.com",
  projectId: "decentrahealth-6f444",
  storageBucket: "decentrahealth-6f444.appspot.com",
  messagingSenderId: "995410992318",
  appId: "1:995410992318:web:5322a491d0fef76c9f12ef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authen = getAuth(app);
authen.languageCode = "en";

function PatientLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    phone: "",
    OTP: "",
  });
  const [flag, setFlag] = useState(false);
  // const handlesubmitPhone = (e) => {
  //     e.preventDefault();
  //     setSubmitted(true);
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const configureCaptcha = () => {
    //console.log("Recaptcha Verified!")
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //onSignInSubmit();
          console.log("Recaptcha Verified!");
        },
        defaultCountry: "IN",
      },
      authen
    );
  };
  const onSignInSubmit = (e) => {
    e.preventDefault();
    console.log(values.phone);
    configureCaptcha();
    const phoneNumber = "+" + values.phone;
    console.log("phonenu", phoneNumber);
    setError("");
    if (phoneNumber === "" || phoneNumber === undefined)
      return setError("Please enter a valid phone number!");
    const appVerifier = window.recaptchaVerifier;
    console.log(appVerifier);
    console.log(authen);

    // const auth = getAuth();
    signInWithPhoneNumber(authen, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP sent");
        setFlag(true);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
        setError(error.message);
        console.log("SMS not sent.");
      });
  };

  const onOTPSubmit = (e) => {
    e.preventDefault();
    setError("");

    const code = values.OTP;
    if (code === "" || code === null) return;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        // alert("User is verified");
        navigate(`/Patient/:+${values.phone}`);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        setError(error.message);
        console.error("OTP Submission error!");
      });
  };

  return (
    <>
      <ParentComponent>
        <Component>
          {/* <Title> DecentraHealth </Title> */}
          <img
            src="/patientLoginIntro.jpg"
            alt="patient_login_intro"
            style={{width: 500, height: 400}}
          />
          <Typography
            style={{ color: "#1AAE9F", fontSize: 28, fontWeight: 600 }}
          >
            Patient Login
          </Typography>
          {error && <Alert variant="danger">{error}</Alert>}
          <LowerComponent>
            <Form onSubmit={onSignInSubmit} style={{ display: !flag ? "block" : "none" }}>
              <Form.Group controlId="formBasicEmail">
                <MobileInput>
                  <PhoneInput country={'in'} value={values.phone} style={{width:"300px",height:'40px',border:'none',marginTop:30}} inputStyle={{height:'40px',width :'300px'}} onChange={(e) => {
                      console.log(e);
                      setValues({
                        ...values,
                        phone: e,
                      });
                    }} />
                  <Button type="submit"  id="sign-in-button">Get Otp</Button>
                  </MobileInput>
                  </Form.Group>
            </Form>
            <Form onSubmit={onOTPSubmit} style={{ display: flag ? "block" : "none" }}>
              <Form.Group controlId="formBasicOtp">
                <OtpInput>
                  <TextField
                    fullWidth
                    placeholder="Otp"
                    variant="standard"
                    style={{ width:"300px"}}
                    onChange={(e) => { setValues({ ...values, OTP: e.target.value, }); }} />
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Login
                  </Button>
                </OtpInput>
              </Form.Group>
            </Form>
          </LowerComponent>
        </Component>
      </ParentComponent>
</>
  );
}

export default PatientLogin;

// <>
//   <div className="card-body text-black" >
//     <div className="row justify-content-center my-5">
//       <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 mt-5">
//         <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-5"> Patient Login</p>
//         {error && <Alert variant="danger">{error}</Alert>}

//         <div className="mx-1 mx-md-5">
//           <Form onSubmit={onSignInSubmit} style={{ display: !flag ? "block" : "none" }}>
//             <Form.Group controlId="formBasicEmail">
//               <div className="d-flex flex-row align-items-center mb-2 mt-6 mx-5">

//                 <div className="form-outline flex-fill mb-0">
//                   <label className="form-label">Mobile No</label>
//                   <PhoneInput country={'in'} value={values.phone} style={{width:"500px"}} inputStyle={{width :'446px'}}
//                     onChange={(e) => {
//                       console.log(e);
//                       setValues({
//                         ...values,
//                         phone: e,
//                       });
//                     }} /><br />
//                   <div id="sign-in-button"></div>
//                 </div>
//               </div>

//             </Form.Group>

//             <div className="d-flex justify-content-center mx-4 mb-3 mt-lg-5">
//             <button type="submit" variant="contained" className="btn btn-primary btn-lg" style={{ backgroundColor: "white", color: "blue" }} >Send OTP</button>
//             </div>

//           </Form>

//           <Form onSubmit={onOTPSubmit} style={{ display: flag ? "block" : "none" }}>

//             <Form.Group controlId="formBasicOtp">
//               <div className="d-flex flex-row align-items-center mb-2 mt-5 mx-5">
//                 <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
//                 <div className="form-outline flex-fill mb-0">
//                   <label className="form-label">OTP</label>
//                   <input type="otp" value={values.OTP} className='form-control' onChange={(e) => { setValues({ ...values, OTP: e.target.value, }); }} />
//                   <div className="d-flex justify-content-center mx-4 mb-3 mt-lg-5">
//                   </div>
//                 </div>
//               </div>
//             </Form.Group>

//             <div className="d-flex justify-content-center mx-4 mb-3 mt-lg-5">
//             <button type="submit" variant="contained" className="btn btn-primary btn-lg" style={{ backgroundColor: "white", color: "blue" }} >Login</button>
//             </div>

//           </Form>
//         </div>
//       </div>
//       <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
//         <img src="/patientlogin.png"
//           className=' mx-56 my-10' alt="Sample image" />
//       </div>
//     </div>
//   </div>
// </>
