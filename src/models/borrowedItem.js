export default class BorrowedItem {
  constructor(borrowedItemData) {
    this.id = borrowedItemData.item.id; // borrowed item's id
    this.state = borrowedItemData.item.state;
    this.dueDate = borrowedItemData.due_date;
    this.displayItemName = borrowedItemData.item.display_item.name;
    this.studentName = borrowedItemData.student.first_name
      .concat(' ')
      .concat(borrowedItemData.student.last_name);
    this.studentEmail = borrowedItemData.student.email;
    this.studentIndexNumber = borrowedItemData.student.student_id;
    this.labName = borrowedItemData.lab.name;
    this.labEmail = borrowedItemData.lab.contact_email;
    this.labContactNo = borrowedItemData.lab.contact_no;
  }
}
