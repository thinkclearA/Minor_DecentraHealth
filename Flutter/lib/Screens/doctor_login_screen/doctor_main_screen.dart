import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

import '../../models/doctor_login_class.dart';
import '../../models/patient_class.dart';
import '../../theme/colors.dart';
import '../../utils/shared_pref.dart';
import '../../widgets/patient_card.dart';
import '../splash_screen.dart';

class DoctorMainScreen extends StatefulWidget {
  const DoctorMainScreen({
    Key? key,
  }) : super(key: key);

  @override
  State<DoctorMainScreen> createState() => _DoctorMainScreenState();
}

class _DoctorMainScreenState extends State<DoctorMainScreen> {
  late String _email;
  late String _password;

  @override
  void initState() {
    super.initState();
    _email = SharedPrefs.getEmail() ?? '';
    _password = SharedPrefs.getPassword() ?? '';
    dataFuture = getPatients();

    // Provider.of<HomeViewModel>(context).updatePhoneNo('$_phoneNum');
  }

  late List<Patient> _patientList;
  late Future<List<Patient>> dataFuture;

  Future<List<Patient>> getPatients() async {
    var res = await Dio().post('http://localhost:8000/doctorLogin',
        data: {'email': _email, 'password': _password});

    return DoctorLoginClass.fromJson((res.data)).patients!;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 30),
        child: FutureBuilder(
            future: dataFuture,
            builder: (context, AsyncSnapshot<List<Patient>> snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                return ListView.builder(
                    itemCount: snapshot.data!.length,
                    itemBuilder: ((context, index) {
                      Patient patient = snapshot.data![index];
                      return PatientCard(
                        name: patient.name!,
                        age: patient.age!,
                        gender: patient.gender!,
                        aadhar: patient.aadhar!,
                      );
                    }));
              } else {
                return const Text('Loading...');
              }
            }),
      ),
      appBar: AppBar(
        centerTitle: false,
        title: const Text(
          'Your Patients:',
          style: TextStyle(
              color: primaryColor,
              fontWeight: FontWeight.w700,
              fontStyle: FontStyle.normal,
              height: 1.2,
              letterSpacing: 3,
              fontSize: 28.0),
        ),
        actions: [
          IconButton(
            onPressed: () {
              // HomeViewModel().updatePhoneNo('sss');
              setState(() {
                dataFuture = getPatients();
              });
            },
            icon: const Icon(Icons.replay_outlined),
            color: primaryColor,
          ),
          IconButton(
              onPressed: () async {
                await SharedPrefs.clearAllData();
                Navigator.of(context).pushAndRemoveUntil(
                    MaterialPageRoute(
                        builder: (context) => const SplashScreen()),
                    (route) => false);
              },
              icon: const Icon(
                Icons.logout,
                color: primaryColor,
              ))
        ],
      ),
    );
  }
}
