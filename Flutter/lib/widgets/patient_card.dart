import 'package:flutter/material.dart';

import '../theme/colors.dart';

class PatientCard extends StatelessWidget {
  PatientCard(
      {this.name = 'Bhagat Chandra Hospital',
      this.aadhar = '1245',
      this.isApply = true,
      this.gender = 'Private',
      this.age = '12',
      Key? key})
      : super(key: key);
  String name;
  bool isApply;
  String aadhar;
  String gender;
  String age;
  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Card(
      shadowColor: primaryColor,
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
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Flexible(
                child: Text(
                  name,
                  style: const TextStyle(
                      decoration: TextDecoration.underline,
                      color: primaryColor,
                      fontWeight: FontWeight.w600,
                      fontStyle: FontStyle.normal,
                      height: 1.2,
                      letterSpacing: 3,
                      fontSize: 25.0),
                ),
              ),
              const Divider(),
              Row(
                children: [
                  Text(
                    'Gender: ' + gender,
                    style: const TextStyle(
                        color: primaryColor,
                        fontWeight: FontWeight.w500,
                        fontStyle: FontStyle.normal,
                        height: 1.2,
                        letterSpacing: 1,
                        fontSize: 16),
                  ),
                  Icon(
                    gender == 'Male' ? Icons.male : Icons.female,
                    size: 16,
                    color: primaryColor,
                  )
                ],
              ),
              Flexible(
                child: Text(
                  'Aadhar: ' + aadhar,
                  style: const TextStyle(
                      color: primaryColor,
                      fontWeight: FontWeight.w500,
                      fontStyle: FontStyle.normal,
                      height: 1.2,
                      letterSpacing: 1,
                      fontSize: 16),
                ),
              ),
              Text(
                'Age: ' + age,
                style: const TextStyle(
                    color: primaryColor,
                    fontWeight: FontWeight.w500,
                    fontStyle: FontStyle.normal,
                    height: 1.2,
                    letterSpacing: 1,
                    fontSize: 16),
              ),
            ],
          ),
        ),
      ),
    );
    //   Positioned(
    //     right: 10,
    //     bottom: 10,
    //     child: TextButton(
    //         onPressed: () {},
    //         child: const Text(
    //           'Download',
    //           style: TextStyle(
    //               decoration: TextDecoration.underline,
    //               color: primaryColor,
    //               fontWeight: FontWeight.w800,
    //               fontStyle: FontStyle.normal,
    //               height: 1.2,
    //               letterSpacing: 1,
    //               fontSize: 14),
    //         )),
    //   ),
    // ],
  }
}
