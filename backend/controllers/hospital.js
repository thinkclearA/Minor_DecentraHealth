const Hospital = require('../models/hospital');

exports.getHospitals = (req, res) => {
    try {
        Hospital.find({}, (err, hospital) => {
            if (err) {
                res.status(205).send(err);
            }
            else{
                console.log(hospital);
                res.status(200).send(hospital);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.getDoctors = (req, res) => {
    try {
        const { hospitalRegnumber } = req.body;
        Hospital.findOne({regNo: hospitalRegnumber}, (err, hospital) => {
            if (err) {
                res.status(205).send(err);
            }
            else{
                res.status(200).send(hospital.doctors);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.findHospital = (req, res) => {
    try {
        const { hospitalRegnumber, password } = req.body;
        Hospital.findOne({regNo: hospitalRegnumber}, (err, hospital) => {
            if (err) {
                res.status(205).send(err);
            }
            else if (hospital){
                if(hospital.password == password){
                    res.status(200).send(hospital);
                }else{
                    res.status(203).send("Incorrect password!");
                }
            }
            else {
                res.status(204).send("Not found");
            }
        });
    } catch (err) {
        console.log(err);
    }
}

exports.addHospital = (req, res) => {
    try {
        console.log(req.body);
        const { hospitalName, hospitalRegnumber, type, password } = req.body.values;
        Hospital.findOne({ regNo: hospitalRegnumber }, (err, hospital) => {
            console.log(hospitalName);
            if (err) {
                res.status(205).send(err);
            } else if (hospital) {
                res.status(204).send("Hospital already present.");
            } else {
                console.log("Hospital not present.");
                const newHospital = {
                    Name: hospitalName,
                    regNo: hospitalRegnumber,
                    type: type,
                    password: password,
                    doctors: [],
                    patients: []
                };
                //console.log(newhospital);
                // hospital.save((err) => {
                //     if(err) {
                //         console.error('ERROR!');
                //     }
                // });
                Hospital.insertMany(newHospital, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(newHospital);
                        res.status(200).send(newHospital);
                    }
                });
            }})
        // const newHospital = {
        //     Name: hospitalName,
        //     regNo: hospitalRegnumber,
        //     type: type,
        //     password: password,
        //     patients: []
        // };
        // console.log(newHospital);
        // let hospitalo=await Hospital.findOneAndUpdate({ regNo: hospitalRegnumber },{newHospital}, {new: true}, {upsert: true});
        // res.status(200).send(hospitalo);
    // }).clone().catch(function(err){ console.log(err)});
    } catch (err) {
        console.log(err);
    }
}