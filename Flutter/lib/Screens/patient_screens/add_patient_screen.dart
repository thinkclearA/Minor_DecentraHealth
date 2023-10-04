import 'package:decentrahealth/models/add_patient_class.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:decentrahealth/theme/colors.dart';

import '../../utils/shared_pref.dart';

class AddPatientScreen extends StatefulWidget {
  const AddPatientScreen({Key? key}) : super(key: key);

  @override
  State<AddPatientScreen> createState() => _AddPatientScreenState();
}

class _AddPatientScreenState extends State<AddPatientScreen> {
  bool _isButtonDisabled = false;
  String? _name;
  String? _age;
  String? _aadhar;
  // String? _email;
  String? _phoneNo;
  final GlobalKey<FormState> _formkey = GlobalKey<FormState>();
  TextEditingController disableController = TextEditingController(text: ' ');
  int? groupValue = 0; //1=male,2=female
  Widget _buildNameField() {
    return TextFormField(
      onSaved: (value) {
        _name = value;
      },
      validator: (value) {
        if (value!.isEmpty) {
          return 'Name is Required';
        }
        return null;
      },
      style: const TextStyle(color: brownishGrey),
      decoration: const InputDecoration(labelText: 'Full Name'),
    );
  }

  Widget _buildAadharField() {
    return TextFormField(
      keyboardType: TextInputType.number,
      onSaved: (value) {
        _aadhar = value;
      },
      validator: (value) {
        if (value!.isEmpty) {
          return 'Aadhar is Required';
        }
        return null;
      },
      style: const TextStyle(color: brownishGrey),
      decoration: const InputDecoration(labelText: 'Aadhar Number'),
    );
  }

  Widget _buildAgeField() {
    return Flexible(
      child: TextFormField(
        keyboardType: TextInputType.phone,
        onSaved: (value) {
          _age = value;
        },
        validator: (value) {
          if (value!.isEmpty) {
            return 'Age is Required';
          }
          return null;
        },
        style: const TextStyle(color: brownishGrey),
        decoration: const InputDecoration(labelText: 'Age'),
      ),
    );
  }

  Widget _buildGenderField() {
    return Flexible(
      child: Stack(
        alignment: Alignment.center,
        children: [
          TextFormField(
            validator: (_) {
              if (groupValue == 0) {
                return 'Gender is Required';
              }
              return null;
            },
            readOnly: true,
            controller: disableController,
            decoration: const InputDecoration(labelText: 'Gender'),
          ),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Row(children: [
                const Text("Male",
                    style: TextStyle(
                        color: brownishGrey,
                        fontWeight: FontWeight.w400,
                        fontStyle: FontStyle.normal,
                        fontSize: 16.0),
                    textAlign: TextAlign.left),
                SizedBox(
                    height: 25,
                    width: 25,
                    child: Radio<int>(
                      activeColor: primaryColor,
                      value: 1,
                      groupValue: groupValue,
                      onChanged: (value) {
                        setState(() {
                          groupValue = value;
                        });
                      },
                    ))
              ]),
              const SizedBox(
                width: 5,
              ),
              Row(children: [
                const Text("Female",
                    style: TextStyle(
                        color: brownishGrey,
                        fontWeight: FontWeight.w400,
                        fontStyle: FontStyle.normal,
                        fontSize: 16.0),
                    textAlign: TextAlign.left),
                SizedBox(
                    height: 25,
                    width: 25,
                    child: Radio<int>(
                      activeColor: primaryColor,
                      value: 2,
                      groupValue: groupValue,
                      onChanged: (x) {
                        setState(() {
                          groupValue = x;
                        });
                      },
                    ))
              ]),
            ],
          )
        ],
      ),
    );
  }

  addPatient() async {
    String gender = groupValue == 1 ? "Male" : "Female";
    if (!_formkey.currentState!.validate()) {
      return;
    }
    _formkey.currentState!.save();
    AddPatient addPatient = AddPatient(
        name: _name,
        age: _age,
        aadhar: _aadhar,
        gender: gender,
        phone: ':' + _phoneNo!);
    await Dio()
        .post('http://localhost:8000/addPatients', data: addPatient.toJson());
    Navigator.pop(context, 'update');
  }

  @override
  void initState() {
    super.initState();
    _phoneNo = SharedPrefs.getPhoneNum() ?? '';
  }

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        resizeToAvoidBottomInset: true,
        body: SafeArea(
          child: Padding(
            padding:
                const EdgeInsets.symmetric(vertical: 8.0, horizontal: 20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    SizedBox(
                      height: 5.0,
                    ),
                    Text("Fill your basic details",
                        style: TextStyle(
                            color: appLogInTitleColor,
                            fontWeight: FontWeight.w600,
                            fontStyle: FontStyle.normal,
                            fontSize: 28.0),
                        textAlign: TextAlign.left),
                    SizedBox(
                      height: 10.0,
                    ),
                  ],
                ),
                const SizedBox(
                  height: 30.0,
                ),
                Form(
                  key: _formkey,
                  child: Column(
                    children: [
                      _buildNameField(),
                      const SizedBox(
                        height: 20.0,
                      ),
                      // _buildEmailField(),
                      // const SizedBox(
                      //   height: 20.0,
                      // ),
                      // _buildPhoneNoField(),
                      // const SizedBox(
                      //   height: 20.0,
                      // ),
                      // // _buildCityField(),
                      // const SizedBox(
                      //   height: 20.0,
                      // ),
                      Row(
                        children: [
                          _buildAgeField(),
                          const SizedBox(
                            width: 20.0,
                          ),
                          _buildGenderField(),
                        ],
                      ),
                      const SizedBox(
                        height: 20.0,
                      ),
                      _buildAadharField(),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        bottomSheet: Container(
          color: backgroundColor,
          padding: const EdgeInsets.only(bottom: 20, left: 25, right: 25),
          width: double.infinity,
          child: ElevatedButton(
              onPressed: () async {
                // if (!_formkey.currentState!.validate()) {
                //   return;
                // }
                // _formkey.currentState!.save();
                if (_isButtonDisabled == false) {
                  _isButtonDisabled = true;
                  await addPatient();
                  _isButtonDisabled = false;
                }
              },
              child: const Text('Save')),
        ),
      ),
    );
  }
}
