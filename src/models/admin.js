export default class Admin {
  constructor(admin) {
    this.id = admin.id;
    this.email = admin.email;
    this.firstName = admin.first_name;
    this.lastName = admin.last_name;
    this.name = `${this.firstName} ${this.lastName}`;
    this.contactNumber = admin.contact_number;
    this.image = admin.image;
    this.role = admin.role;
    this.blocked = admin.blocked;
  }
}
