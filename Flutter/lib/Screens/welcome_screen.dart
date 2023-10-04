import 'package:decentrahealth/Screens/doctor_login_screen/doctor_login_screen.dart';
import 'package:decentrahealth/Screens/signup_screens/phone_signup.dart';
import 'package:decentrahealth/theme/app_theme.dart';
import 'package:flutter/material.dart';

import 'package:decentrahealth/constants.dart';
import 'package:flutter_svg/svg.dart';

class WelcomeScreen extends StatelessWidget {
// Future pushPatientLoginScreen(BuildContext context){
//   return
// }
  var Isuser;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomSheet: Container(
        color: backgroundColor,
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 25, horizontal: 15),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ElevatedButton(
                  onPressed: () {
                    Isuser = Users.patient;
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const PhoneSignup()),
                    );
                  },
                  child: const Text('Patient')),
              const SizedBox(height: 30),
              ElevatedButton(
                  onPressed: () {
                    Isuser = Users.doctor;
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => DoctorLoginScreen()),
                    );
                  },
                  child: const Text('Doctor')),
            ],
          ),
        ),
      ),
      body: SafeArea(
        child: Padding(
            padding: const EdgeInsets.all(15.0),
            child: CustomScrollView(
              slivers: [
                SliverFillRemaining(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(top: 50),
                        child: SvgPicture.asset(
                          'asset/icons/doctor_patient.svg',
                          width: 300,
                        ),
                      ),
                      const Spacer(),
                      WelcomeHeadingText(), const Spacer(),
                      // const SizedBox(
                      //   height: 50.0,
                      // ),

                      const Spacer(),
                    ],
                  ),
                )
              ],
            )),
      ),
    );
  }
}

class WelcomeHeadingText extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        // Stroked text as border.
        Text(
          'YOU \nARE?',
          style: TextStyle(
            fontSize: 70,
            fontWeight: FontWeight.w900,
            letterSpacing: 8.0,
            foreground: Paint()
              ..style = PaintingStyle.stroke
              ..strokeWidth = 6
              ..color = primaryColor,
          ),
        ),
        // Solid text as fill.
        const Text(
          'YOU \nARE?',
          style: TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: 8.0,
            fontSize: 70,
            color: secondaryColor,
          ),
        ),
      ],
    );
  }
}
