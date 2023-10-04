import 'package:shared_preferences/shared_preferences.dart';

class SharedPrefs {
  static const _phoneNumKey = 'phoneNo';
  static const _doctorEmailKey = 'doctorEmail';
  static const _doctorPassword = 'doctorPassword';

  static SharedPreferences? _preferances;

  static Future init() async {
    _preferances = await SharedPreferences.getInstance();
  }

//Patient
  static Future setPhoneNo(String phonenum) async =>
      await _preferances!.setString(_phoneNumKey, phonenum);

  static String? getPhoneNum() => _preferances!.getString(_phoneNumKey);

//patient

  static Future clearAllData() => _preferances!.clear();

//Doctor

  static Future setEmail(String email) async =>
      await _preferances!.setString(_doctorEmailKey, email);

  static String? getEmail() => _preferances!.getString(_doctorEmailKey);

  static Future setPassword(String email) async =>
      await _preferances!.setString(_doctorPassword, email);

  static String? getPassword() => _preferances!.getString(_doctorPassword);

//Doctor

}
