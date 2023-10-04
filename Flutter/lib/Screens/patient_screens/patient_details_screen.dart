import 'package:decentrahealth/models/hospital_class.dart';
import 'package:decentrahealth/utils/shared_pref.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:lottie/lottie.dart';

import '../../models/patient_class.dart';
import '../../theme/colors.dart';

class PatientDetailsScreen extends StatefulWidget {
  Patient patient;
  PatientDetailsScreen({required this.patient, Key? key}) : super(key: key);

  @override
  State<PatientDetailsScreen> createState() => _PatientDetailsScreenState();
}

class _PatientDetailsScreenState extends State<PatientDetailsScreen> {
  int tab = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          iconTheme: const IconThemeData(color: primaryColor),
        ),
        body: SafeArea(
          child: Padding(
            padding: const EdgeInsets.only(top: 0),
            child: Column(
              children: [
                // PatientCard(
                //   isApply: false,
                //   name: widget.patient.name!,
                //   aadhar: widget.patient.aadhar!,
                //   gender: widget.patient.gender!,
                //   age: widget.patient.age!,
                // ),
                OfferScreenTab(
                  active: tab,
                  onSelectTab: (val) {
                    setState(() {
                      tab = val;
                    });
                  },
                ),
                const Divider(
                  height: 0,
                  endIndent: 30,
                  indent: 30,
                ),
                const SizedBox(
                  height: 15,
                ),
                Expanded(
                  child: tab == 0
                      ? const PatientDocuments()
                      : HospitalApply(patient: widget.patient),
                )
              ],
            ),
          ),
        ));
  }
}

class PatientDocuments extends StatelessWidget {
  // int patientIndex;
  // List<Patient> patientList;
  const PatientDocuments({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class HospitalApply extends StatefulWidget {
  HospitalApply({Key? key, required this.patient}) : super(key: key);
  Patient patient;
  @override
  State<HospitalApply> createState() => _HospitalApplyState();
}

class _HospitalApplyState extends State<HospitalApply>
    with SingleTickerProviderStateMixin {
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _phoneNum = SharedPrefs.getPhoneNum() ?? '';
    dataFuture = getHospitals();
    getHospitals();
    _controller = AnimationController(vsync: this);
    // Provider.of<HomeViewModel>(context).updatePhoneNo('$_phoneNum');
  }

  String? _phoneNum;

  late List<Hospitals> _hospitalList;
  late Future<List<Hospitals>> dataFuture;
  late final AnimationController _controller;
  Future<List<Hospitals>> getHospitals() async {
    var res = await Dio().get(
      'http://localhost:8000/getHospitals',
    );
    // patientList = (res.data as List).map((e) => Patient.fromJson(e)).toList();
    _hospitalList =
        (res.data as List).map((e) => Hospitals.fromJson(e)).toList();
    return _hospitalList;
  }

  Future<void> appHospital(
      {required String id, required Patient patient}) async {
    Map<String, dynamic> map = {};
    map.addAll(patient.toJson());
    map.addAll({
      'HospitalID': id,
    });
    await Dio().post('http://localhost:8000/addPatientHospital', data: map);
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: dataFuture,
        builder: (context, AsyncSnapshot<List<Hospitals>> snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            return ListView.builder(
                itemCount: snapshot.data!.length,
                itemBuilder: ((context, index) {
                  Hospitals hospital = snapshot.data![index];
                  return HospitalCard(
                    onTap: () {
                      appHospital(id: hospital.regNo!, patient: widget.patient);
                      showDialog(
                          barrierDismissible: false,
                          context: context,
                          builder: (context) {
                            _controller.addStatusListener((status) {
                              if (status == AnimationStatus.completed) {
                                _controller.reset();
                                Navigator.pop(context);
                              }
                            });
                            return SimpleDialog(
                              title: const Text(
                                'Applied!',
                                textAlign: TextAlign.center,
                                style: TextStyle(
                                    color: primaryColor,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 18),
                              ),
                              children: [
                                Lottie.network(
                                    'https://assets5.lottiefiles.com/packages/lf20_zwkm4xbs.json',
                                    controller: _controller,
                                    onLoaded: (composition) {
                                  _controller
                                    ..duration = composition.duration
                                    ..forward();
                                }, repeat: false),
                              ],
                            );
                          });
                    },
                    name: hospital.name!,
                    type: hospital.type!,
                    regNo: hospital.regNo!,
                  );
                }));
          } else {
            return const Text('Loading...');
          }
        });
  }
}

class OfferScreenTab extends StatelessWidget {
  final int active;
  final Function(int) onSelectTab;
  const OfferScreenTab({Key? key, this.active = 0, required this.onSelectTab})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    var activeColor = primaryColor;
    var inactiveColor = textSecondary;
    var activeTextStyle = const TextStyle(
        fontSize: 16, fontWeight: FontWeight.w700, color: primaryColor);
    var inactiveTextStyle = TextStyle(
        fontSize: 16,
        fontWeight: FontWeight.w600,
        color: textSecondary.withOpacity(0.5));

    return Container(
      height: 60,
      alignment: Alignment.center,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            child: GestureDetector(
              behavior: HitTestBehavior.translucent,
              onTap: () => onSelectTab(0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    ' Patient Documents',
                    style: active == 0 ? activeTextStyle : inactiveTextStyle,
                  )
                ],
              ),
            ),
          ),
          const VerticalDivider(
            indent: 15,
            thickness: 1,
            endIndent: 15,
          ),
          Expanded(
            child: GestureDetector(
              behavior: HitTestBehavior.translucent,
              onTap: () => onSelectTab(1),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    ' Hospital Apply',
                    style: active == 1 ? activeTextStyle : inactiveTextStyle,
                  )
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class HospitalCard extends StatelessWidget {
  HospitalCard(
      {this.name = 'Bhagat Chandra Hospital',
      this.regNo = '1245',
      this.type = 'Private',
      required this.onTap,
      Key? key})
      : super(key: key);
  String name;
  VoidCallback onTap;
  String regNo;
  String type;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Center(
      child: Card(
        margin: const EdgeInsets.symmetric(vertical: 10),
        elevation: 5,
        color: Theme.of(context).colorScheme.surfaceVariant,
        child: SizedBox(
          width: size.width * 0.85,
          height: 150,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Flexible(
                  child: Text(
                    name,
                    style: const TextStyle(
                        color: primaryColor,
                        fontWeight: FontWeight.w700,
                        fontStyle: FontStyle.normal,
                        height: 1.2,
                        letterSpacing: 3,
                        fontSize: 16.0),
                  ),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceAround,
                  children: [
                    Text(
                      'Type: ' + type,
                      style: const TextStyle(
                          color: primaryColor,
                          fontWeight: FontWeight.w500,
                          fontStyle: FontStyle.normal,
                          height: 1.2,
                          letterSpacing: 1,
                          fontSize: 14),
                    ),
                    Text(
                      'Registration No: ' + regNo,
                      style: const TextStyle(
                          color: primaryColor,
                          fontWeight: FontWeight.w500,
                          fontStyle: FontStyle.normal,
                          height: 1.2,
                          letterSpacing: 1,
                          fontSize: 14),
                    ),
                  ],
                ),
                Align(
                  alignment: Alignment.bottomRight,
                  child: TextButton(
                      onPressed: onTap,
                      child: const Text(
                        'Apply',
                        style: TextStyle(
                            decoration: TextDecoration.underline,
                            color: primaryColor,
                            fontWeight: FontWeight.w800,
                            fontStyle: FontStyle.normal,
                            height: 1.2,
                            letterSpacing: 1,
                            fontSize: 14),
                      )),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
