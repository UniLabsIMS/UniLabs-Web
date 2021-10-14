export default class BucketItem {
  constructor(displayItemObj) {
    this.displayItemId = displayItemObj.id;
    this.labId = displayItemObj.lab.id;
    this.name = displayItemObj.name;
    this.image = displayItemObj.image;
    this.description = displayItemObj.description;
    this.category = displayItemObj.category;
    this.lab = displayItemObj.lab;
    this.quantity = 1;
  }

  increaseQuantity() {
    this.quantity += 1;
    return this;
  }

  decreaseQuantity() {
    this.quantity -= 1;
    return this;
  }
}
