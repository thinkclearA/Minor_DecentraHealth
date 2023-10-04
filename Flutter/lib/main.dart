import 'package:decentrahealth/Screens/splash_screen.dart';
import 'package:decentrahealth/models/home_view_model.dart';
import 'package:decentrahealth/theme/app_theme.dart';
import 'package:decentrahealth/utils/shared_pref.dart';

import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  // Map<String, Object> values = <String, Object>{'phoneNo': '+916206794316'};
  // SharedPreferences.setMockInitialValues(values);
  await SharedPrefs.init();
  runApp(MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => HomeViewModel())],
      child: MyApp()));
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: AppTheme(context: context).themeData,
      debugShowCheckedModeBanner: false,
      home: const SplashScreen(),
    );
  }
}
