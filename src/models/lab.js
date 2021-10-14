import AssignedLecturer from './assignedLecturer';

export default class Lab {
  constructor(lab) {
    this.id = lab.id;
    this.name = lab.name;
    this.department = lab.department;
    this.location = lab.location;
    this.contactNo = lab.contact_no;
    this.contactEmail = lab.contact_email;
    this.image = lab.image;
    this.createdAt = lab.created_at;
    this.assignedLecturers = lab.assigened_lecturers.map(
      data => new AssignedLecturer(data),
    );
  }
}
