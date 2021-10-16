export default class LabReport {
  constructor(reportData) {
    this.categoryCount = reportData.total_category_count;
    this.displayItemCount = reportData.total_display_item_count;
    this.itemCount = reportData.total_item_count;
    this.availableItemCount = reportData.available_item_count;
    this.damagedItemCount = reportData.damaged_item_count;
    this.borrowedItemCount = reportData.borrowed_item_count;
    this.tempBorrowedItemCount = reportData.temp_borrowed_item_count;
    this.labAssistantCount = reportData.lab_assistant_count;
    this.labManagerCount = reportData.lab_manager_count;
    this.totalRequestCount = reportData.request_count;
    this.pendingRequestCount = reportData.pending_request_count;
  }
}
