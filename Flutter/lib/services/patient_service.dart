import 'package:decentrahealth/services/base_service.dart';

class PatientService {
  final BaseService _baseService = BaseService();

  Future<dynamic> getPatients() async {
    var res = await _baseService.postResponse(
      '/getPatients',
      data: {'Phone': ':+916206794316'},
    );
    if (res != null) {
      return res;

      // return (res.data as List).map((e) => Patient.fromJson(e)).toList();
    }
    return null;
  }
}
