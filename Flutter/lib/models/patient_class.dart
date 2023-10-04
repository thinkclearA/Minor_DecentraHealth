class Patient {
  String? name;
  String? aadhar;
  String? age;
  String? gender;

  Patient({this.name, this.aadhar, this.age, this.gender});

  Patient.fromJson(Map<String, dynamic> json) {
    name = json['Name'];
    aadhar = json['Aadhar'];
    age = json['Age'];
    gender = json['Gender'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = Map<String, dynamic>();
    data['Name'] = name;
    data['Aadhar'] = aadhar;
    data['Age'] = age;
    data['Gender'] = gender;
    return data;
  }
}
