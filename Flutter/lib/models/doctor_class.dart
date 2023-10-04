import 'package:decentrahealth/models/patient_class.dart';

class Doctors {
  String? name;
  String? doctorId;
  String? hospitalRegnumber;
  String? uPRNnum;
  String? password;
  List<Patient>? patients;

  Doctors(
      {this.name,
      this.doctorId,
      this.hospitalRegnumber,
      this.uPRNnum,
      this.password,
      this.patients});

  Doctors.fromJson(Map<String, dynamic> json) {
    name = json['Name'];
    doctorId = json['doctorId'];
    hospitalRegnumber = json['hospitalRegnumber'];
    uPRNnum = json['UPRNnum'];
    password = json['password'];
    if (json['patients'] != null) {
      patients = <Patient>[];
      json['patients'].forEach((v) {
        patients!.add(Patient.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['Name'] = name;
    data['doctorId'] = doctorId;
    data['hospitalRegnumber'] = hospitalRegnumber;
    data['UPRNnum'] = uPRNnum;
    data['password'] = password;
    if (patients != null) {
      data['patients'] = patients!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
