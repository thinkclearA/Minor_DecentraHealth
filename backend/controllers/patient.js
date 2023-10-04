//const Patient = require('../models/patient');
const Hospital = require('../models/hospital');
const Patients = require('../models/patients');
const PatientSingle = require('../models/patient');
const Doctor = require('../models/doctor');
 const {getdata, setdata} =require('../utils/web3');
 const p_id="2EIossNsEkeVC88aVyiK1oR8mkA";
 const s_key="4b5f24663b48bc836f94339596fa7565";
 const auth =
 'Basic ' + Buffer.from(p_id + ':' + s_key).toString('base64');
 
const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https',
headers: {
    authorization: auth
  }})
// const { Blob } = require('node-blob');

  const { spawn } = require('child_process');
// const { default: Patient } = require('../../frontend/src/components/Patient');
// const { speciality } = require('../utils/specializations');
speciality = [        
    {            
       disease: "Fungal_infection\n",
       speciality: "dermatologist"       
    },        
    {            
       disease: "Allergy\n",
       speciality: "immunologist",           
    }, 
    {
      disease: "GERD\n",
      speciality: "gastroenterologist"
      },
      {
      disease: "Chronic_cholestasis\n",
      speciality: "gastroenterologist"
      },
      {
      disease: "Drug_Reaction\n",
      speciality: "immunologist"
      },
      {
      disease: "Peptic_ulcer_disease\n",
      speciality: "gastroenterologist"
      },
      {
      disease: "AIDS\n",
      speciality: "Infectious Disease"
      },
      {
      disease: "Diabetes\n",
      speciality: "endocrynologist"
      },
      {
      disease: "Gastroenteritis\n",
      speciality: "gastroenterologist"
      },
      {
      disease: "Bronchial_Asthma\n",
      speciality: "pulmonologist"
      },
      {            
         disease: "Hypertension\n",
         speciality: "cardiologist"           
      },        
      {            
         disease: "Migraine\n",
         speciality: "Neurologist"           
      }, 
      {            
         disease: "Cervical_spondylosis\n",
         speciality: "orthopedic specialist"           
      }, 
      {            
         disease: "Paralysis (brain hemorrhage)\n",
         speciality: "neurosurgeon"           
      }, 
      {            
         disease: "Jaundice\n",
         speciality: "gastroenterologist"           
      },
      {
      disease: "Malaria\n",
      speciality: "Infectious Disease"
      },
      {
      disease: "Chicken_pox\n",
      speciality: "Paediatrician"
      },
      {
         disease: "Dengue\n",
         speciality: "Infectious Disease"     
      },
      {            
         disease: "Impetigo\n",
         speciality: "Paediatrician"           
      },        
      {            
         disease: "Psoriasis\n",
         speciality: "Rheumatologist"           
      }, 
      {            
         disease: "Urinary_tract_infection\n",
         speciality: "Primary Care Provider"           
      }, 
      {            
         disease: "Acne\n",
         speciality: "Paediatrician"           
      }, 
      {            
         disease: "Osteoarthristis\n",
         speciality: "Orthopaedic"     
      },  
      {            
         disease: "Hypoglycemia\n",
         speciality: "Primary Care Provider"           
      },        
      {            
         disease: "Hyperthyroidism\n",
         speciality: "Endocrinologist"           
      }, 
      {            
         disease: "Varicoseveins\n",
         speciality: "Primary Care Provider"           
      }, 
      {            
         disease: "Heartattack\n",
         speciality: "Cardiologist"           
      }, 
      {            
         disease: "Dimorphic_hemmorhoids(piles)\n",
         speciality: "Primary Care Provider"           
      }, 
      {            
         disease: "Hepatitis_E\n",
         speciality: "Hepatologist"           
      },  
      {            
         disease: "Hepatitis_D\n",
         speciality: "Hepatologist"           
      },        
      {            
         disease: "Hepatitis_C\n",
         speciality: "Hepatologist"           
      }, 
      {
         disease: "Dengu\ne",
         speciality: "Infectious Disease"     
      },
      {            
         disease: "Impetigo\n",
         speciality: "Paediatrician"           
      },        
      {            
         disease: "Psoriasis\n",
         speciality: "Rheumatologist"           
      }, 
      {            
         disease: "Urinary_tract_infection\n",
         speciality: "Primary Care Provider"           
      }, 
      {            
         disease: "Acne\n",
         speciality: "Paediatrician"           
      }, 
      {            
         disease: "Osteoarthristis\n",
         speciality: "Orthopaedic"           
      },  
      {            
         disease: "Hypoglycemia\n",
         speciality: "Primary Care Provider"           
      },        
      {            
         disease: "Hyperthyroidism\n",
         speciality: "Endocrinologist"           
      }, 
      {            
         disease: "Varicoseveins\n",
         speciality: "Primary Care Provider"           
      }, 
      {            
         disease: "Heartattack\n",
         speciality: "Cardiologist"           
      }, 
      {            
         disease: "Dimorphic_hemmorhoids(piles)\n",
         speciality: "Primary Care Provider"           
      }, 
      {            
         disease: "Hepatitis_E\n",
         speciality: "Hepatologist"           
      },  
      {            
         disease: "Hepatitis_D\n",
         speciality: "Hepatologist"           
      },        
      {            
         disease: "Hepatitis_C\n",
         speciality: "Hepatologist"           
      },          
      {
         disease: "Hepatitis_B\n",
         speciality: "Hepatologist"
      },
      {
         disease: "Hepatitis_A\n",
         speciality: "Hepatologist"
      },
      {
         disease: "Typhoid\n",
         speciality: "Infectious Disease Doctor"
      }
 ]
exports.addPatients = (req, res) => {
    try {
        const { Name, Aadhar, Age, Gender, Phone } = req.body;
        const newPatient = {
            Name,
            Aadhar,
            Age,
            Gender,
            Phone,
            DoctorRequests: [],
            GrantedRequests: []
        }
        PatientSingle.insertMany(newPatient, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("patient");
           
        });
        console.log(newPatient);
        // res.status(200).send(newPatient);
        Patients.findOneAndUpdate({Phone: Phone}, {$push: {patients: newPatient}}, {new: true, upsert: true}, (err, patients) => {
            if (err) {
                res.status(206).send(err);
            }
            else{
                // const newPatient = {
                //     Name,
                //     Aadhar,
                //     Age,
                //     Gender,
                //     Phone,
                //     DoctorRequests: [],
                //     GrantedRequests: []
                // }
                console.log("patients: ", patients);
                // hospital.doctors.push(newDoctor);
                res.status(200).send(patients);
            }
        })
    } catch (err) {
        console.log(err);
    }
}

exports.addPatientHospital = (req, res) => {
    try {
        // const { Name, Aadhar, Age, Gender, Phone } = req.body;
        // console.log(newPatient);
        // await Patients.findOneAndUpdate({Phone: Phone}, {$push: {patients: newPatient}}, {new: true, upsert: true}, async (err, patients) => {
        //     if (err) {
        //         res.status(206).send(err);
        //     }
        //     else{
        //         console.log("patients: ", patients);
        //         // hospital.doctors.push(newDoctor);
        //         res.status(200).send(patients);
        //     }
        // })
        const { HospitalID, Name, Age, Aadhar, Gender } = req.body;
        const newPatient = {
            Name,
            Aadhar,
            Age,
            Gender
        }
        // try{
        //     const output=await Hospital.findOneAndUpdate({regNo: HospitalID}, {$push: {patients: newPatient}});
        // }
        // catch{

        // }
        // const output=await Hospital.findOneAndUpdate({regNo: HospitalID}, {$push: {patients: newPatient}});
        Hospital.findOneAndUpdate({regNo: HospitalID}, {$push: {patients: newPatient}}, (err, output) => {
            if (err) {
                res.status(206).send(err);
            }
            else{
                res.status(200).send(output);
            }
        });
    } catch (err) {
        console.log(err);
    }
}
exports.fileUpload= async (req,res)=>{
    var Aadhar=0, flag=0;
    const senddata=[];
    if(req.body.Aadhar instanceof Array){
        Aadhar = req.body.Aadhar[0];
        flag=1;
    }
    else
        Aadhar = req.body.Aadhar;
    const newpath = __dirname + "/" + Aadhar;
    if(!fs.existsSync(newpath)){
        fs.mkdirSync(newpath);
    }
    console.log(req.files);
    console.log(req.body);
    const files = req.files.file;
    const fileName = req.body.fileName;
    //const filename = file.name;
   
    if(flag===0){
      
            files.mv(`${newpath}/${fileName}`,async (err) => {
            if (err) {
                console.log(err);
              res.status(500).send({ message: "File upload failed", code: 200 });
            }

            let testFile = fs.readFileSync(`${newpath}/${fileName}`);
            let testBuffer = new Buffer(testFile);

               let file = await ipfs.files.add(testBuffer);
                console.log(9);
                console.log(file);
                await setdata(Aadhar,fileName, file[0].hash);
                let link = `http://localhost:8000/fileDownload/${Aadhar}/${file[0].hash}`;
                senddata.push({name:fileName, file:link, filename:fileName})
                console.log(senddata)
                res.status(200).send(senddata);
            //else{
            //   res.status(200).send({ message: "File Uploaded", code: 200 });
            //   console.log("File uploaded");
            // }
          })

        
    }
    else
    await Promise.all( files.map( async(currfile, i) => {
    
        await currfile.mv(`${newpath}/${fileName[i]}`,async (err) => {
            if (err) {
                console.log(err);
              res.status(500).send({ message: "File upload failed", code: 200 });
            }
            let testFile = fs.readFileSync(`${newpath}/${fileName[i]}`);
            let testBuffer = new Buffer(testFile);

                let newfile = await ipfs.files.add(testBuffer);
                await setdata(Aadhar, newfile[0].hash, fileName[i]);
                let link = `http://localhost:8000/fileDownload/${Aadhar}/${newfile[0].hash}`; 
                senddata.push({name:fileName[i], file:link, filename:fileName[i]})
            //else{
            //   res.status(200).send({ message: "File Uploaded", code: 200 });
            //   console.log("File uploaded");
            // }
          });
    
      }))
  
    console.log(senddata);
    // res.status(200).send(senddata);

}
exports.getPatientsHospital = (req, res) => {
    const { HospitalID } = req.body;
    Hospital.findOne({regNo: HospitalID}, (err, hospital) => {
        if (err) {
            res.status(206).send(err);
        }
        else{
            res.status(200).send(hospital.patients);
        }
    });
}
exports.getPatients=(req,res)=>{
    const {Phone}=req.body;
    console.log(req);
    console.log(req.body);
    Patients.findOne({Phone},(err,patient)=>{
        if(err)
            res.status(500).send(err);
    
        else{
            if(patient)
                res.status(200).send(patient.patients);
            else
                res.status(200).send([]);
        }
    })
}
exports.viewFiles =async (req, res) => {
    // const { aadhar } = req.body;
    // const path = __dirname + "/" + aadhar;
    // const arr = [];
    // if(fs.existsSync(path)){
    //     console.log("Exists");
    //     fs.readdir(path, function (err, files) {
    //         //handling error
    //         if (err) {
    //             // return console.log('Unable to scan directory: ' + err);
    //             res.status(500).send('Unable to scan directory: ' + err);
    //         } 
    //         //listing all files using forEach
    //         console.log("No erroe");
    //         files.forEach(function (file) {

    //                 var link = `http://localhost:8000/fileDownload/${aadhar}/${file}`;

    //             const output = {
    //                 filename: file,
    //                 name: file,
    //                file : link
    //             }
    //             arr.push(output);
    //             console.log("file", file); 
    //         });
    //         res.status(200).send(arr);
    //     });
    // }else{
    //     res.status(200).send(arr);
    // }
    const { aadhar } = req.body;
    const data = await getdata(aadhar);
    console.log(data);
    const arr = [];
    for(let i=0;i<data.length;i++)
    {
        let element=data[i];
        var link = `http://localhost:8000/fileDownload/${aadhar}/${element.userDataDetail}`;
        const output = {
                            filename:element.userDataDetail ,
                            name: element.userDataFilename,
                           file : link
                        }
                        arr.push(output);

    }
    console.log("GH");

    res.status(200).send(arr);
    
    // //Creating buffer for ipfs function to add file to the system
    // let testBuffer = new Buffer(testFile);
}

exports.fileDownload = async (req, res) => {
    const aadhar = req.params['aadhar'];
    const fileName = req.params['fileName'];
    // const path = __dirname + "/" + aadhar + "/" + fileName;
    const files = await ipfs.files.get(fileName);
    files.forEach(file => {
        console.log(file.path)
        console.log(file);
        res.status(200).send(file.content);
    });
    // res.status(200).send(file.content);
    // res.status(200).download(path);
}

exports.getDisease = async (req, res) => {
    const { symptoms } = req.body;
    console.log(symptoms);
    const sym1 = symptoms[0];
    const sym2 = symptoms[1];
    const sym3 = symptoms[2];
    const sym4 = symptoms[3];
    const childPython = await spawn('python3', ['/Users/yashsrivastava/Desktop/DecentraHealth/backend/controllers/ml_model_btp.py',sym1, sym2, sym3, sym4]);
    console.log("Hello");

    childPython.stdout.on('data', (data) => {
        console.log('received data');
        console.log('received data');
        console.log(`stdout: ${data}`);
        console.log(data.toString());
        res.status(200).send(data.toString());
    })

    // childPython.stderr.on('data', (data) => {
    //     console.log(`stderr: ${data}`);
    //     res.status(500).send(data.toString());
    // })
}

exports.getDoctors = async (req, res) => {
    const  disease = req.body.disease;
    console.log(req.body);
    const arr = [];
    console.log(speciality.length);
    let i = 0, flag = 0;
    for(i = 0; i < speciality.length; i++) {
        if(speciality[i].disease === disease) {
            Doctor.find({speciality: speciality[i].speciality}, (err, doctors) => {
                if(err) {
                    res.status(500).send(err);
                }
                else if(doctors.length>0){
                    console.log("Doctor: ");
                    console.log(doctors);
                    res.status(200).send(doctors);
                }
                else{
                    res.status(200).send("Doctor not found");
                }
            });
            flag = 1;
            break;
        }
    }
    if(i === speciality.length && flag === 0)
    res.status(200).send("Doctor not found");
}

exports.grantAccess = async (req, res) => {
    const doctorid = req.body.doctorid;
    const patientid = req.body.id;
    const accept = req.body.grant;
    const doctor = await Doctor.findOne({doctorId: doctorid});
    const patient = await PatientSingle.findOne({Aadhar: patientid});
    if(accept === 0){
        Doctor.findOneAndUpdate({doctorId: doctorid}, {$addToSet: {fullPatients: patient}, $pull: {reqPatients: {Aadhar: patientid}}}, (err, output) => {
            if (err) {
                res.status(206).send(err);
            }
            else{
                PatientSingle.findOneAndUpdate({Aadhar: patientid}, {$addToSet: {GrantedRequests: doctor}, $pull: {DoctorRequests: {doctorId: doctorid}}}, (err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                })
                res.status(200).send(output);
            }
        });
    }
    else if(accept === 1){
        Doctor.findOneAndUpdate({doctorId: doctorid}, {$addToSet: {insPatients: patient}, $pull: {reqPatients: {Aadhar: patientid}}}, (err, output) => {
            if (err) {
                res.status(206).send(err);
            }
            else{
                PatientSingle.findOneAndUpdate({Aadhar: patientid}, {$addToSet: {GrantedRequests: doctor}, $pull: {DoctorRequests: {doctorId: doctorid}}}, (err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                })
                res.status(200).send(output);
            }
        });
    }
    else{
        PatientSingle.findOneAndUpdate({Aadhar: patientid}, {$pull: {DoctorRequests: doctor}, $pull: {reqPatients: {Aadhar: patientid}}}, (err, output) => {
            if (err) {
                res.status(206).send(err);
            }
            else{
                res.status(200).send(output);
            }
        });
    }

}

exports.diabetesPred = (req, res) => {
    // const { symptoms } = req.body;
    // console.log(symptoms);
    // const sym1 = symptoms[0];
    // const sym2 = symptoms[1];
    // const sym3 = symptoms[2];
    // const sym4 = symptoms[3];
    const childPython = spawn('python3', ['/Users/yashsrivastava/Desktop/DecentraHealth/backend/controllers/diabetes_pred.py']);
    console.log("Hello");

    childPython.stdout.on('data', (data) => {
        console.log('received data');
        console.log('received data');
        console.log(`stdout: ${data}`);
        console.log(data.toString());
        res.status(200).send(data.toString());
    })

    // childPython.stderr.on('data', (data) => {
    //     console.log(`stderr: ${data}`);
    //     res.status(500).send(data.toString());
    // })
}
