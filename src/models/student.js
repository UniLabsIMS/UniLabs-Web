export default class Student {
  constructor(student) {
    this.id = student.id;
    this.studentId = student.student_id;
    this.email = student.email;
    this.firstName = student.first_name;
    this.lastName = student.last_name;
    this.name = `${this.firstName} ${this.lastName}`;
    this.contactNumber = student.contact_number;
    this.image = student.image;
    this.role = student.role;
    this.blocked = student.blocked;
    this.department = student.department;
  }

  updateBlocked(newBlockValue) {
    this.blocked = newBlockValue;
    return this;
  }
}
