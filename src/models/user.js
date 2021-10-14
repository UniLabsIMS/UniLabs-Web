export default class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.contactNumber = user.contact_number;
    this.image = user.image;
    this.role = user.role;
    this.isDefaultPassword = user.is_default_password;
    this.otherDetails = user.other_details; // do not change
  }

  update(data) {
    this.firstName = data.first_name;
    this.lastName = data.last_name;
    this.contactNumber = data.contact_number;
    return this;
  }

  updateImage(data) {
    this.image = data.image;
    return this;
  }
}
