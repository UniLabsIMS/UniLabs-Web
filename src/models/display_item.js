export default class DisplayItem {
  constructor(displayItem) {
    this.id = displayItem.id;
    this.name = displayItem.name;
    this.image = displayItem.image;
    this.description = displayItem.description;
    this.category = displayItem.category;
    this.lab = displayItem.lab;
    this.itemCount = displayItem.item_count;
  }
}
