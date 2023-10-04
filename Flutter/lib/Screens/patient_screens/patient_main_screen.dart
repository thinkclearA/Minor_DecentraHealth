import 'package:decentrahealth/Screens/patient_screens/add_patient_screen.dart';
import 'package:decentrahealth/Screens/patient_screens/patient_details_screen.dart';
import 'package:decentrahealth/Screens/splash_screen.dart';
import 'package:decentrahealth/models/home_view_model.dart';
import 'package:decentrahealth/theme/app_theme.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../models/patient_class.dart';
import '../../utils/shared_pref.dart';

class PatientMainScreen extends StatefulWidget {
  const PatientMainScreen({Key? key}) : super(key: key);

  @override
  State<PatientMainScreen> createState() => _PatientMainScreenState();
}

class _PatientMainScreenState extends State<PatientMainScreen> {
  @override
  void initState() {
    super.initState();
    _phoneNum = SharedPrefs.getPhoneNum() ?? '';
    dataFuture = getPatients();
//Provider.of<HomeViewModel>(context,listen: false).updatePhoneNo('$_phoneNum');
  }

  String? _phoneNum;
  late List<Patient> patientList;
  late Future<List<Patient>> dataFuture;
  Future<List<Patient>> getPatients() async {
    var res = await Dio().post('http://localhost:8000/getPatients',
        data: {'Phone': ':' + _phoneNum!});
    patientList = (res.data as List).map((e) => Patient.fromJson(e)).toList();

    return patientList;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: primaryColor,
        label: const Text('Add Member'),
        icon: const Icon(Icons.add),
        onPressed: (() {
          Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const AddPatientScreen()))
              .then((value) {
            if (value == 'update') {
              setState(() {
                dataFuture = getPatients();
              });
            }
          });
          setState(() {});
        }),
      ),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Divider(),
              const SizedBox(
                height: 20,
              ),
              FutureBuilder(
                  future: dataFuture,
                  builder: (context, AsyncSnapshot<List<Patient>> snapshot) {
                    if (snapshot.connectionState == ConnectionState.done) {
                      return Expanded(
                        child: ListView.builder(
                            itemCount: snapshot.data!.length,
                            itemBuilder: (context, index) {
                              return PatientTile(
                                ontap: () {
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: ((context) =>
                                              PatientDetailsScreen(
                                                patient: patientList[index],
                                              ))));
                                },
                                index: index,
                                name: snapshot.data![index].name!,
                              );
                            }),
                      );
                    } else {
                      return const Text('Loading...');
                    }
                  }),
            ],
          ),
        ),
      ),
      appBar: AppBar(
        centerTitle: false,
        title: const Text(
          'Members:',
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
              HomeViewModel().updatePhoneNo('sss');
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

class PatientTile extends StatelessWidget {
  int index;
  String name;
  VoidCallback ontap;
  PatientTile({
    required this.ontap,
    required this.index,
    required this.name,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 12),
      child: GestureDetector(
        onTap: ontap,
        child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            alignment: Alignment.centerLeft,
            height: 50,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  name,
                  style: const TextStyle(
                    color: primaryColor,
                    fontWeight: FontWeight.w600,
                    fontStyle: FontStyle.normal,
                    height: 1.2,
                    fontSize: 17,
                    //  letterSpacing: 3,
                    //  fontSize: 28.0),
                  ),
                ),
                SvgPicture.asset(
                  'asset/icons/right_arrow.svg',
                  color: primaryColor,
                )
              ],
            ),
            width: double.infinity,
            decoration: BoxDecoration(boxShadow: const [
              BoxShadow(color: secondaryColor, blurRadius: 5, spreadRadius: 1)
            ], color: secondaryColor, borderRadius: BorderRadius.circular(15))),
      ),
    );
  }
}
