import 'package:dio/dio.dart';

class BaseService {
  static String baseUrl = 'http://localhost:8000';

  Future<Response?> getresponse(String subpath) async {
    try {
      Response response = await Dio().get(baseUrl + subpath);
      return response;
    } on DioError catch (e) {
      print(e);
    }
    return null;
  }

  Future<dynamic> postResponse(String subpath,
      {required Map<String, dynamic> data}) async {
    try {
      var res = await Dio().post(baseUrl + subpath, data: data);
      return res.data;
    } on DioError catch (e) {
      print(e);
    }
    return null;
  }
}
