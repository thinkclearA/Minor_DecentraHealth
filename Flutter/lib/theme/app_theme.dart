import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
export './colors.dart';
import 'package:decentrahealth/theme/colors.dart';

class AppTheme {
  AppTheme({required this.context});
  BuildContext context;

  final themeData = ThemeData(
    scaffoldBackgroundColor: backgroundColor,
    appBarTheme: const AppBarTheme(
        iconTheme: IconThemeData(color: Colors.white),
        centerTitle: true,
        elevation: 0,
        titleTextStyle: TextStyle(
            color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600),
        backgroundColor: backgroundColor),
    primaryColor: primaryColor,
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
          primary: primaryColor,
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
          minimumSize: const Size(40, 55),
          textStyle: const TextStyle(
            color: primaryColor,
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
          side: const BorderSide(color: primaryColor)),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
          primary: primaryColor,
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
          textStyle: const TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
          ),
          minimumSize: const Size(40, 55)),
    ),
    textButtonTheme:
        TextButtonThemeData(style: TextButton.styleFrom(primary: primaryColor)),
    inputDecorationTheme: const InputDecorationTheme(
      contentPadding: EdgeInsets.all(10),
      labelStyle: TextStyle(color: blueyGrey, fontSize: 12),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(8)),
        borderSide: BorderSide(width: 0.0, color: blueyGrey),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(8)),
        borderSide: BorderSide(width: 0.0, color: blueyGrey),
      ),
    ),
    textSelectionTheme: const TextSelectionThemeData(cursorColor: primaryColor),
    colorScheme: ColorScheme.fromSwatch().copyWith(secondary: primaryColor),
    textTheme: GoogleFonts.publicSansTextTheme(),
    primaryTextTheme: GoogleFonts.publicSansTextTheme(),
  );
}
