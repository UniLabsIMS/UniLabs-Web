import RequestedDisplayItem from './requestedDisplayItem';

export default class LecturerRequest {
  constructor(lecturerRequest) {
    this.id = lecturerRequest.id;
    this.lab = lecturerRequest.lab;
    this.labId = lecturerRequest.lab.id;
    this.student = lecturerRequest.student;
    this.studentIndex = lecturerRequest.student.student_id;
    this.studentDepartment = lecturerRequest.student.department.name;
    this.studentName = `${lecturerRequest.student.first_name} ${lecturerRequest.student.last_name}`;
    this.lecturer = lecturerRequest.lecturer;
    this.reason = lecturerRequest.reason;
    this.state = lecturerRequest.state;
    this.createdAt = lecturerRequest.created_at;
    this.requestedDisplayItems = lecturerRequest.requested_display_items.map(
      requestedDisplayItem => new RequestedDisplayItem(requestedDisplayItem),
    );
  }
}
