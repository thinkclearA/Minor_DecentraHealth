import 'package:decentrahealth/Screens/patient_screens/patient_main_screen.dart';
import 'package:decentrahealth/utils/shared_pref.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:sms_autofill/sms_autofill.dart';

import '../../theme/colors.dart';
// import 'package:sms_autofill/sms_autofill.dart';

// import '../../get_it_dependecy/locator.dart';
// import '../../view_model/authentication_state.dart';

class OTPSignup extends StatefulWidget {
  OTPSignup({Key? key, required this.phoneNo}) : super(key: key);
  String phoneNo = '1';
  @override
  State<OTPSignup> createState() => _OTPSignupState();
}

class _OTPSignupState extends State<OTPSignup> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  String? smsCode;
  String? _verificationId;
  TextEditingController otpController = TextEditingController();
  AuthCredential? credential;
  late String? phoneno;

  @override
  void initState() {
    phoneno = SharedPrefs.getPhoneNum() ?? '';
    listenForSms();
    super.initState();
    verifyPhoneNumber();
  }

  listenForSms() async {
    await SmsAutoFill().listenForCode();
  }

  void verifyPhoneNumber() async {
    try {
      await _auth.verifyPhoneNumber(
          phoneNumber: widget.phoneNo,
          timeout: const Duration(seconds: 5),
          verificationCompleted:
              (PhoneAuthCredential phoneAuthCredential) async {
            await _auth.signInWithCredential(phoneAuthCredential);
            showSnackbar(
                "Phone number automatically verified and user signed in: ${_auth.currentUser!.uid}");
          },
          verificationFailed: (FirebaseAuthException authException) {
            showSnackbar(
                'Phone number verification failed. Code: ${authException.code}. Message: ${authException.message}');
          },
          codeSent: (String verificationId, int? forceResendingToken) async {
            showSnackbar('Please check your phone for the verification code.');
            _verificationId = verificationId;
          },
          codeAutoRetrievalTimeout: (String verificationId) {
            showSnackbar("verification code: " + verificationId);
            _verificationId = verificationId;
          });
    } catch (e) {
      showSnackbar("Failed to Verify Phone Number: $e");
    }
  }

  Future<void> signInWithPhoneNumber() async {
    try {
      credential = PhoneAuthProvider.credential(
        verificationId: _verificationId!,
        smsCode: otpController.text,
      );

      final User? user = (await _auth.signInWithCredential(credential!)).user;

      showSnackbar("Successfully signed in UID: ${user!.uid}");
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (context) => const PatientMainScreen()),
          (route) => false);
    } catch (e) {
      showSnackbar("Failed to sign in: " + e.toString());
    }
  }

  void showSnackbar(String message) {
    var snackBar = SnackBar(
      content: Text(message),
    );
    ScaffoldMessenger.of(context).showSnackBar(snackBar);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
      child: Scaffold(
        body: Padding(
          padding: const EdgeInsets.only(top: 90, left: 25, right: 25),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Text(
                'Enter OTP',
                style: TextStyle(
                  fontSize: 28,
                  height: 1.2,
                  fontWeight: FontWeight.bold,
                  color: Color(0xff413945),
                ),
              ),
              const SizedBox(
                height: 8,
              ),
              const Text("An OTP has been sent to you mobile number.",
                  style: TextStyle(
                      color: brownishGrey,
                      fontWeight: FontWeight.w400,
                      height: 1.5,
                      fontStyle: FontStyle.normal,
                      fontSize: 16.0),
                  textAlign: TextAlign.left),
              Text(phoneno ?? '',
                  style: const TextStyle(
                      color: brownishGrey,
                      fontWeight: FontWeight.w400,
                      height: 1.5,
                      fontStyle: FontStyle.normal,
                      fontSize: 16.0),
                  textAlign: TextAlign.left),
              const SizedBox(
                height: 20,
              ),
              PinFieldAutoFill(
                  controller: otpController,
                  onCodeChanged: (val) async {
                    smsCode = val;
                  },
                  codeLength: 6,
                  cursor: Cursor(
                      width: 2,
                      color: Theme.of(context).primaryColor,
                      enabled: true),
                  decoration: UnderlineDecoration(
                      gapSpace: 10,
                      lineHeight: 1,
                      textStyle: TextStyle(
                          color: Theme.of(context).primaryColor, fontSize: 16),
                      hintText: '------',
                      hintTextStyle: TextStyle(
                          color:
                              Theme.of(context).primaryColor.withOpacity(0.4),
                          fontSize: 16),
                      colorBuilder: PinListenColorBuilder(
                          Theme.of(context).primaryColor,
                          Theme.of(context).primaryColor.withOpacity(0.4)))),
              RichText(
                  text: TextSpan(children: [
                const TextSpan(
                    style: TextStyle(
                        color: Color(0xff828282),
                        fontWeight: FontWeight.w400,
                        height: 2.5,
                        fontStyle: FontStyle.normal,
                        fontSize: 12.0),
                    text: "Not received yet? "),
                TextSpan(
                    style: TextStyle(
                        color: Theme.of(context).primaryColor,
                        fontWeight: FontWeight.w700,
                        fontStyle: FontStyle.normal,
                        fontSize: 12.0),
                    text: "Resend again")
              ])),
              const SizedBox(
                height: 30,
              ),
              ElevatedButton(
                  onPressed: () async {
                    FocusManager.instance.primaryFocus?.unfocus();
                    if (otpController.text.length == 6) {
                      await signInWithPhoneNumber();
                    } else {
                      showSnackbar('OTP Invalid!');
                    }
                  },
                  child: const Text('Verify OTP')),
            ],
          ),
        ),
      ),
    );
  }
}
