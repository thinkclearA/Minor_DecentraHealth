import 'package:decentrahealth/models/patient_class.dart';

class DoctorLoginClass {
  String? sId;
  String? name;
  String? doctorId;
  int? hospitalRegnumber;
  int? uPRNnum;
  String? password;
  List<Patient>? patients;
  int? sV;

  DoctorLoginClass(
      {this.sId,
      this.name,
      this.doctorId,
      this.hospitalRegnumber,
      this.uPRNnum,
      this.password,
      this.patients,
      this.sV});

  DoctorLoginClass.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
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
    sV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['_id'] = sId;
    data['Name'] = name;
    data['doctorId'] = doctorId;
    data['hospitalRegnumber'] = hospitalRegnumber;
    data['UPRNnum'] = uPRNnum;
    data['password'] = password;
    if (patients != null) {
      data['patients'] = patients!.map((v) => v.toJson()).toList();
    }
    data['__v'] = sV;
    return data;
  }
}
