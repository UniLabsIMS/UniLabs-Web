import RequestedDisplayItem from './requestedDisplayItem';

export default class LecturerRequest {
  constructor(lecturerRequest) {
    this.id = lecturerRequest.id;
    this.lab = lecturerRequest.lab;
    this.labId = lecturerRequest.lab.id;
    this.student = lecturerRequest.student;
    // this.student = new Student(lecturerRequest.student);
    this.lecturer = lecturerRequest.lecturer;
    // this.requestedDisplayItems = lecturerRequest.requested_display_items;
    this.reason = lecturerRequest.reason;
    this.state = lecturerRequest.state;
    this.createdAt = lecturerRequest.created_at;
    this.requestedDisplayItems = lecturerRequest.requested_display_items.map(
      requestedDisplayItem => new RequestedDisplayItem(requestedDisplayItem),
    );
  }
}
