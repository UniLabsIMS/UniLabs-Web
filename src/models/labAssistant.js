export default class LabAssistant {
  constructor(labAssistant) {
    this.id = labAssistant.id;
    this.email = labAssistant.email;
    this.firstName = labAssistant.first_name;
    this.lastName = labAssistant.last_name;
    this.name = `${this.firstName} ${this.lastName}`;
    this.contactNumber = labAssistant.contact_number;
    this.image = labAssistant.image;
    this.role = labAssistant.role;
    this.blocked = labAssistant.blocked;
    this.lab = labAssistant.lab;
    this.department = labAssistant.department;
  }

  updateBlocked(newBlockValue) {
    this.blocked = newBlockValue;
    return this;
  }
}
