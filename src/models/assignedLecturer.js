export default class AssignedLecturer {
  constructor(assignedLecturerData) {
    this.id = assignedLecturerData.id;
    this.lecturerID = assignedLecturerData.lecturer_id;
    this.email = assignedLecturerData.email;
    this.firstName = assignedLecturerData.first_name;
    this.lastName = assignedLecturerData.last_name;
    this.contactNo = assignedLecturerData.contact_number;
    this.department = assignedLecturerData.department;
    this.image = assignedLecturerData.image;
    this.blocked = assignedLecturerData.blocked;
  }
}
