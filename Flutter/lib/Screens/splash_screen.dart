import 'package:decentrahealth/Screens/doctor_login_screen/doctor_main_screen.dart';
import 'package:decentrahealth/Screens/patient_screens/patient_main_screen.dart';
import 'package:decentrahealth/Screens/welcome_screen.dart';
import 'package:flutter/material.dart';

import '../utils/shared_pref.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  String? _phoneNum = '';
  String? _email = '';

  @override
  void initState() {
    super.initState();
    _phoneNum = SharedPrefs.getPhoneNum() ?? '';
    _email = SharedPrefs.getEmail() ?? '';

    Future.delayed(const Duration(seconds: 1));
    Future.microtask(() => init());
  }

  init() async {
    if (_phoneNum == '' && _email == '') {
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => WelcomeScreen()),
          (route) => false);
    } else if (_phoneNum != '') {
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const PatientMainScreen()),
          (route) => false);
    } else if (_email != '') {
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const DoctorMainScreen()),
          (route) => false);
    } else {}
  }

  @override
  Widget build(BuildContext context) {
    
    return const Scaffold(
      body: Center(child: Text('DecentraHealth')),
    );
  }
}
