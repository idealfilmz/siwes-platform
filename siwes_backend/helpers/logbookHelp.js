// helper class to create helpers in everything

class Logbook {
  constructor(establishment, instituton, address, student_id) {
    (this.establishment = establishment||null),
      (this.instituton = instituton ||null),
      (this.address = address ||null),
      (this.student_id = student_id ||null);
  }

  Values() {
    return {
     establishment:this.establishment,
     institution:this.instituton,
     address:this.address,
     student_id:this.student_id
    };
  }
}
module.exports = Logbook;
