class AddPatient {
  String? name;
  String? aadhar;
  String? age;
  String? gender;
  String? phone;

  AddPatient({this.name, this.aadhar, this.age, this.gender, this.phone});

  AddPatient.fromJson(Map<String, dynamic> json) {
    name = json['Name'];
    aadhar = json['Aadhar'];
    age = json['Age'];
    gender = json['Gender'];
    phone = json['Phone'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['Name'] = name;
    data['Aadhar'] = aadhar;
    data['Age'] = age;
    data['Gender'] = gender;
    data['Phone'] = phone;
    return data;
  }
}
