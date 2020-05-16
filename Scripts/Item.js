class Item {

  constructor(name, quantity, src, objectType) {
    this.name = name;
    this.quantity = quantity;
    this.imageSrc = src;
    this.objectType = objectType
    this.maxStackAmount = objectType.maxStackAmount || 30;
  }

  AddQuantity(amount) {
    this.quantity += amount;
    if(this.quantity > this.maxStackAmount) {
      let leftOver = this.quantity - this.maxStackAmount;
      this.quantity = this.maxStackAmount;
      return leftOver;
    }
    return 0;
  }

  SubtractQuantity(amount) {
    this.quantity -= amount;
    if(this.quantity < 0) {
      let leftOver = this.quantity;
      this.quantity = 0;
      return leftOver;
    }
    return 0;
  }

  SetQuantity(amount) {
    if(this.amount > this.maxStackAmount) {
      this.quantity = this.maxStackAmount;
      return this.amount - this.maxStackAmount;
    } else if(this.amount < 0) {
      this.quantity = 0;
      return this.amount;
    } else {
      this.quantity = amount;
      return 0;
    }
  }

  CombineWithItem(item) {
    if(item.objectType == this.objectType) {
      let leftOver = this.AddQuantity(item.quantity);
      item.quantity = leftOver;
    }
  }
}
