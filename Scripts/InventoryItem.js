class InventoryItem extends Component {
  constructor(object, item, zOrder, ...args) {
    super(object, ...args);
    this.item = item;
    this.icon = new CamSprite(this.object, item.imageSrc, false, zOrder);
    this.nameText = new Text(this.object, item.name, "white", 50,
      Vector2.Zero, true, false, 0, false,
      zOrder);
    this.quantityText = new Text(this.object, item.quantity, "white", 40,
      Vector2.Zero, true, false, 0, false, zOrder);
  }

  Update() {
    if(this.item.quantity <= 0) {
      this.object.SetActive(false);
      return;
    }
    this.nameText.offset.y = this.icon.image.height * 0.47;
    this.nameText.text = this.item.name;
    this.quantityText.offset = new Vector2(this.icon.image.width * 0.44,
      -this.icon.image.height * 0.38);
    this.quantityText.text = this.item.quantity;
  }

  ChangeItem(item) {
    if(item && this.item != item) {
      this.item = item;
      this.icon.src = item.imageSrc;
      if(this.item.quantity > 0)
        this.object.SetActive(true);
    } else if(!item) {
      this.item = item;
      this.object.SetActive(false);
    }
  }
}
