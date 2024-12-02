class CreateLectures {
  constructor(email, phone_number, fullname, password, supervisor_id) {
    (this.email = email),
      (this.phone_number = phone_number),
      (this.fullname = fullname),
      (this.password = password),
      (this.supervsisor_id = supervisor_id);
  }
  Values() {
    return {
      email: this.email,
      phone_number: this.phone_number,
      fullname: this.fullname,
      password: this.password,
      supervisor_id: this.supervsisor_id,
    };
  }
}

module.exports = CreateLectures;
