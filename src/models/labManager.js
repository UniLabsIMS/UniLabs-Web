export default class LabManager {
  constructor(labManager) {
    this.id = labManager.id;
    this.email = labManager.email;
    this.firstName = labManager.first_name;
    this.lastName = labManager.last_name;
    this.name = `${this.firstName} ${this.lastName}`;
    this.contactNumber = labManager.contact_number;
    this.image = labManager.image;
    this.role = labManager.role;
    this.blocked = labManager.blocked;
    this.lab = labManager.lab;
    this.department = labManager.department;
  }
}
