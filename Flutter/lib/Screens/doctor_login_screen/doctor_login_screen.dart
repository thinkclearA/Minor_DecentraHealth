import 'package:decentrahealth/Screens/doctor_login_screen/doctor_main_screen.dart';
import 'package:decentrahealth/models/doctor_login_class.dart';
import 'package:decentrahealth/theme/app_theme.dart';
import 'package:decentrahealth/utils/shared_pref.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class DoctorLoginScreen extends StatefulWidget {
  @override
  State<DoctorLoginScreen> createState() => _DoctorLoginScreenState();
}

class _DoctorLoginScreenState extends State<DoctorLoginScreen> {
  String? Id;
  String? Password;
  DoctorLoginClass doctor = DoctorLoginClass();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  Future<void> doctorLogin(String email, String password) async {
    var res = await Dio().post('http://localhost:8000/doctorLogin',
        data: {'email': email, 'password': password});
    if (res.statusCode == 500) {
      showSnackbar('Incorrent Password');
    } else if (res.statusCode == 500) {
      showSnackbar("Not found");
    } else if (res.statusCode == 200) {
      await SharedPrefs.setEmail(email);
      await SharedPrefs.setPassword(password);
      Navigator.of(context).pushAndRemoveUntil(
          MaterialPageRoute(builder: (context) => const DoctorMainScreen()),
          (route) => false);
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
    return Scaffold(
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(bottom: 15),
        child: SizedBox(
          height: 55,
          width: MediaQuery.of(context).size.width * 0.85,
          child: FloatingActionButton.extended(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10)),
              onPressed: () {
                //            if (!RegExp(
                //           r"^[a-zA-Z0-9.a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9]+\.[a-zA-Z]+")
                //       .hasMatch(_emailController.text)) {
                //     showSnackbar('E-mail invalid');
                //   }
                //  else{
                doctorLogin(_emailController.text, _passwordController.text);
                //}
              },
              label: const Center(
                child: Text(
                  'Login',
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                ),
              )),
        ),
      ),
      backgroundColor: backgroundColor,
      appBar: AppBar(
        backgroundColor: primaryColor,
        title: const Text("Doctor Login Page"),
      ),
      body: GestureDetector(
        onTap: () => FocusManager.instance.primaryFocus?.unfocus(),
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.only(
                    top: 60.0,
                    bottom: 60.0,
                  ),
                  child: Center(
                    child: SizedBox(
                        width: 200,
                        height: 150,
                        child: Image.asset('asset/images/doctor_logo.png')),
                  ),
                ),
                Padding(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 15, vertical: 20),
                  child: TextField(
                    controller: _emailController,
                    decoration: const InputDecoration(
                        border: OutlineInputBorder(), labelText: 'Email ID'),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(
                      left: 15.0, right: 15.0, top: 15, bottom: 0),
                  child: TextField(
                    controller: _passwordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Password',
                      //    hintText: 'Enter secure password'
                    ),
                  ),
                ),
                const SizedBox(
                  height: 50.0,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

// class LogoImage extends StatelessWidget {
//   var user;
//   LogoImage({this.user});
//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: const EdgeInsets.only(
//         top: 60.0,
//         bottom: 60.0,
//       ),
//       child: Center(
//         child: SizedBox(
//             width: 200,
//             height: 150,
//             /*decoration: BoxDecoration(
//                 color: Colors.red,
//                 borderRadius: BorderRadius.circular(50.0)),*/
//             child: user == Users.patient
//                 ? Image.asset('asset/images/patient_logo.jpeg')
//                 : Image.asset('asset/images/doctor_logo.png')),
//       ),
//     );
//   }
// }
//'http://localhost:8000/doctorLogin'
