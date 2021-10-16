import DisplayItem from './display_item';

export default class RequestedDisplayItem {
  constructor(requestedDisplayItem) {
    this.id = requestedDisplayItem.id;
    this.quantity = requestedDisplayItem.quantity;
    this.state = requestedDisplayItem.state;
    this.displayItem = new DisplayItem(requestedDisplayItem.display_item);
  }
}
