export default class AssignedLecturer {
  constructor(assignedLecturerData) {
    this.id = assignedLecturerData.id;
    this.lecturerId = assignedLecturerData.lecturer_id;
    this.email = assignedLecturerData.email;
    this.firstName = assignedLecturerData.first_name;
    this.lastName = assignedLecturerData.last_name;
    this.contactNo = assignedLecturerData.contact_number;
    this.department = assignedLecturerData.department;
    this.image = assignedLecturerData.image;
    this.blocked = assignedLecturerData.blocked;
  }

  static fromLecturer(lecturer) {
    const data = {
      id: lecturer.id,
      lecturer_id: lecturer.lecturerId,
      email: lecturer.email,
      first_name: lecturer.firstName,
      last_name: lecturer.lastName,
      contact_number: lecturer.contactNumber,
      department: lecturer.department,
      image: lecturer.image,
      blocked: lecturer.blocked,
    };
    return new AssignedLecturer(data);
  }
}
