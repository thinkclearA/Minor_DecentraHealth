export function generate(newDoctor){
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 8;
    var newPassword = "";
    for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
        newPassword += chars.substring(randomNumber, randomNumber +1);
    }
    var uniq = (new Date()).getTime() % 1000;
    var nameIni = newDoctor.Name.slice(0,2);
    var postName = newDoctor.hospitalName;
    var newDoctorId = nameIni + uniq + postName + ".com";
    return { newDoctorId, newPassword };
}