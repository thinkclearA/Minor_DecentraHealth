import 'package:decentrahealth/models/patient_class.dart';

import 'doctor_class.dart';

class Hospitals {
  String? sId;
  String? name;
  String? regNo;
  String? type;
  String? password;
  List<Doctors>? doctors;
  List<Patient>? patients;
  int? iV;

  Hospitals(
      {this.sId,
      this.name,
      this.regNo,
      this.type,
      this.password,
      this.doctors,
      this.patients,
      this.iV});

  Hospitals.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['Name'];
    regNo = json['regNo'];
    type = json['type'];
    password = json['password'];
    if (json['doctors'] != null) {
      doctors = <Doctors>[];
      json['doctors'].forEach((v) {
        doctors!.add(Doctors.fromJson(v));
      });
    }
    if (json['patients'] != null) {
      patients = <Patient>[];
      json['patients'].forEach((v) {
        patients!.add(Patient.fromJson(v));
      });
    }
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['Name'] = name;
    data['regNo'] = regNo;
    data['type'] = type;
    data['password'] = password;
    if (doctors != null) {
      data['doctors'] = doctors!.map((v) => v.toJson()).toList();
    }
    if (patients != null) {
      data['patients'] = patients!.map((v) => v.toJson()).toList();
    }
    data['__v'] = iV;
    return data;
  }
}
