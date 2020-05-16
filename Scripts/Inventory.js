class Inventory extends Component {
  color = "#b57f2e"
  borderColor = "#a06f28";
  backColor = "#ae8c5b";
  numItemCols = 8;
  numItemRows = 5;

  inventoryItems = [];

  constructor(...args) {
    super(...args);
    this.width = canvas.height * 0.85;
    this.height = canvas.height * 0.55;
  }

  GenerateInventoryItems() {
    for (var i = 0; i < this.numItemCols; i++) {
      this.inventoryItems[i] = [];
      for (var j = 0; j < this.numItemRows; j++) {
        this.inventoryItems[i][j] = new InventoryItem("InventoryItem",
          player.tank.items[0], -0.72);
        this.inventoryItems[i][j].object.SetActive(false);
      }
    }
  }

  Update() {
    camera.MoveCtxBack();
    display.TurnShadowsOff();

    this.DrawBackground(this.width * 1.05, this.height + this.width * 0.05,
      canvas.height * 0.01, this.borderColor);
    this.DrawBackground(this.width, this.height,
      canvas.height * 0.008, this.color);
    this.DrawItemSlots();
    this.UpdateInventoryItems();
    display.TurnShadowsOn();
    camera.MoveCtxOut();
    this.HandleInput();
  }

  DrawBackground(width, height, cornerRadius, color) {
    ctx.fillStyle = color;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.5 - width / 2 + cornerRadius,
      canvas.height * 0.4 - height / 2);
    ctx.lineTo(canvas.width * 0.5 + width / 2 - cornerRadius,
       canvas.height * 0.4 - height / 2);
    ctx.arc(canvas.width * 0.5 + width / 2 - cornerRadius,
        canvas.height * 0.4 - height / 2 + cornerRadius, cornerRadius,
        Math.PI * 3 / 2, 0);
    ctx.lineTo(canvas.width * 0.5 + width / 2,
      canvas.height * 0.4 + height / 2 - cornerRadius);
    ctx.arc(canvas.width * 0.5 + width / 2 - cornerRadius,
      canvas.height * 0.4 + height / 2 - cornerRadius, cornerRadius, 0,
      Math.PI/2);
    ctx.lineTo(canvas.width * 0.5 - width / 2 + cornerRadius,
       canvas.height * 0.4 + height / 2);
    ctx.arc(canvas.width * 0.5 - width / 2 + cornerRadius,
      canvas.height * 0.4 + height / 2 - cornerRadius, cornerRadius,
      Math.PI / 2, Math.PI);
    ctx.lineTo(canvas.width * 0.5 - width / 2,
       canvas.height * 0.4 - height / 2 + cornerRadius);
    ctx.arc(canvas.width * 0.5 - width / 2 + cornerRadius,
      canvas.height * 0.4 - height / 2 + cornerRadius, cornerRadius,
      Math.PI, Math.PI * 3 / 2);
    ctx.fill();
  }

  DrawItemSlots() {

    let pIndex = player.tank.items.indexOf(player.tank.primaryFireItem);
    let sIndex = player.tank.items.indexOf(player.tank.secondaryFireItem);
    ctx.fillStyle = "blue";
    this.DrawSlotRing(pIndex % this.numItemCols,
      Math.floor(pIndex / this.numItemCols));
    ctx.fillStyle = "red";
    this.DrawSlotRing(sIndex % this.numItemCols,
      Math.floor(sIndex / this.numItemCols));

    for (var i = 0; i < this.numItemCols; i++) {
      for (var j = 0; j < this.numItemRows; j++) {
        this.DrawItemSlot(i, j);
      }
    }


  }

  DrawSlotRing(col, row) {
    if(col < 0 || row < 0)
      return;

    let size = this.width / (this.numItemCols * 1.2);
    let edge = this.width / (this.numItemCols * 6);
    let se = size + edge;
    ctx.fillRect((canvas.width * 0.5 - se / 2.1) + se * (col  + 0.5 -
      this.numItemCols / 2), (canvas.height * 0.4 - se / 2.1) + se * (row +
      0.5 - this.numItemRows / 2), se * 0.95, se * 0.95);
  }

  DrawItemSlot(col, row) {
    ctx.fillStyle = this.backColor;
    let size = this.width / (this.numItemCols * 1.2);
    let edge = this.width / (this.numItemCols * 6);
    ctx.fillRect((canvas.width * 0.5 - size / 2) - (size + edge) * (col  +
      0.5 - this.numItemCols / 2), (canvas.height * 0.4 - size / 2) -
      (size + edge) * (row + 0.5 - this.numItemRows / 2), size, size);
  }

  UpdateInventoryItems() {
    if(this.inventoryItems.length == 0) {
      this.GenerateInventoryItems();
    }

    let size = this.width / (this.numItemCols * 1.2);
    let edge = this.width / (this.numItemCols * 6);

    for (var i = 0; i < this.numItemCols; i++) {
      for (var j = 0; j < this.numItemRows; j++) {
        let inventoryItem = this.inventoryItems[i][j];
        let item = player.tank.items[j * this.numItemCols + i];
        inventoryItem.ChangeItem(item);
        let scaleFactor = size * 0.8 / inventoryItem.icon.image.width;
        inventoryItem.transform.scale = new Vector2(scaleFactor, scaleFactor);
        let x = (canvas.width * 0.5) + (size + edge) * (i  +
          0.5 - this.numItemCols / 2);
        let y = (canvas.height * 0.4) + (size + edge) *
          (j + 0.5 - this.numItemRows / 2);
        inventoryItem.transform.position = new Vector2(x, y);
      }
    }
  }

  OnEnable() {
    if(!this.inventoryItems)
      return;
    for (var col of this.inventoryItems) {
      for (var item of col) {
        if(item.item)
          item.object.SetActive(true);
      }
    }
  }

  OnDisable() {
    if(!this.inventoryItems)
      return;
    for (var col of this.inventoryItems) {
      for (var item of col) {
        item.object.SetActive(false);
      }
    }
  }

  HandleInput() {
    let mp = Input.mousePosition;
    let boxSize = this.width / this.numItemCols;
    let left = canvas.width / 2 - boxSize * this.numItemCols / 2;
    let mouseBoxX = Math.floor((mp.x - left) / boxSize);
    let mouseBoxY = Math.floor(mp.y / boxSize - 0.4) - 1;
    let overBox = mouseBoxX >= 0  && mouseBoxX < this.numItemCols &&
      mouseBoxY >= 0 && mouseBoxY < this.numItemRows;
    if(Input.GetKeyDown(1) && overBox) {
      let item = this.inventoryItems[mouseBoxX][mouseBoxY].item;
      if(item) {
        if(item == player.tank.secondaryFireItem) {
          player.tank.secondaryFireItem = player.tank.primaryFireItem;
        }
        if(item == player.tank.primaryFireItem) {
          player.tank.primaryFireItem = null;
        } else {
          player.tank.primaryFireItem = item;
        }
      } else {
        player.tank.primaryFireItem = null;
      }
    }
    if(Input.GetKeyDown(2) && overBox) {
      let item = this.inventoryItems[mouseBoxX][mouseBoxY].item;
      if(item) {
        if(item == player.tank.primaryFireItem) {
          player.tank.primaryFireItem = player.tank.secondaryFireItem;
        }
        if(item == player.tank.secondaryFireItem) {
          player.tank.secondaryFireItem = null;
          console.log(player.tank.secondaryFireItem);
        } else {
          player.tank.secondaryFireItem = item;
        }
      } else {
        player.tank.secondaryFireItem = null;
      }
    }
    if(Input.GetKeyDown("q") && overBox) {
      let item = this.inventoryItems[mouseBoxX][mouseBoxY].item;
      if(item) {
        player.tank.ThrowOutItem(player.tank.items.indexOf(item));
      }
    }
  }

  OnDisplayResized(oldSize) {
    this.width = canvas.height * 0.85;
    this.height = canvas.height * 0.55;
  }
}
