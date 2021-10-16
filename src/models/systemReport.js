export default class SystemReport {
  constructor(reportData) {
    this.userCount = reportData.user_count;
    this.studentCount = reportData.student_count;
    this.lecturerCount = reportData.lecturer_count;
    this.adminCount = reportData.admin_count;
    this.labAssistantCount = reportData.lab_assistant_count;
    this.labManagerCount = reportData.lab_manager_count;
    this.departmentCount = reportData.department_count;
    this.labCount = reportData.lab_count;
    this.categoryCount = reportData.category_count;
    this.displayItemCount = reportData.display_item_count;
    this.itemCount = reportData.item_count;
    this.availableItemCount = reportData.available_item_count;
    this.damagedItemCount = reportData.damaged_item_count;
    this.borrowedItemCount = reportData.borrowed_item_count;
    this.tempBorrowedItemCount = reportData.temp_borrowed_item_count;
    this.totalRequestCount = reportData.request_count;
    this.pendingRequestCount = reportData.pending_request_count;
  }
}
