import 'package:decentrahealth/models/patient_class.dart';
import 'package:flutter/cupertino.dart';

class HomeViewModel with ChangeNotifier {
  String? _phoneNo;
  List<Patient>? _patients;

  String? get getPhoneNo => _phoneNo;
  List<Patient>? get getPatientsList => _patients;

  void updatePhoneNo(String num) {
    _phoneNo = num;
    notifyListeners();
  }

  void updatePatientList(List<Patient> list) {
    _patients = list;
    notifyListeners();
  }
}
