export default class User {
  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.image = user.image;
    this.role = user.role;
    this.is_default_password = user.is_default_password;
    this.other_details = user.other_details;
  }
}
