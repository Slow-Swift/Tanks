class Overlay extends Component {
  color = "#b57f2e"
  borderColor = "#a06f28";
  backColor = "#ae8c5b";

  constructor(o) {
    super(o, -0.5);
    this.signImg = new Image();
    this.signImg.src = "Images/Sign.png";
    this.primaryFireIcon = new InventoryItem("PFOL",
      player.tank.primaryFireItem, -0.6);
    this.secondaryFireIcon = new InventoryItem("SFOL",
      player.tank.secondaryFireItem, -0.6);
    this.inventory = new Inventory(this.object, -0.71);
    this.OnDisplayResized(Vector2.Zero);
  }

  Update() {
    display.TurnShadowsOff();
    camera.MoveCtxBack();
    this.DrawSigns();
    this.DrawRim();
    this.DrawHealth();
    ctx.fillStyle = this.borderColor;
    this.DrawBulge(this.thickness * 2.6, canvas.height - this.thickness * 2.3, this.thickness * 2);
    this.DrawItemPockets();
    this.UpdateFireIcons();
    camera.MoveCtxOut();
    display.TurnShadowsOn();
    this.inventory.SetActive(gameManager.inventoryOpen);
  }

  DrawRim() {
    let borderThickness = this.thickness * 0.3;
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.thickness, canvas.height);
    ctx.fillRect(0, 0, canvas.width, this.thickness);
    ctx.fillRect(0, canvas.height, canvas.width, -this.thickness * 2);
    ctx.fillRect(canvas.width, 0, -this.thickness, canvas.height);

    ctx.fillStyle = this.borderColor;
    ctx.fillRect(this.thickness, this.thickness, -borderThickness,
        canvas.height - this.thickness * 3);
    ctx.fillRect(this.thickness, this.thickness, canvas.width -
      this.thickness * 2, -borderThickness);
    ctx.fillRect(canvas.width - this.thickness, this.thickness,
      borderThickness, canvas.height - this.thickness * 3);
    ctx.fillRect(this.thickness, canvas.height - this.thickness * 2,
      canvas.width - this.thickness * 2, borderThickness);

    this.DrawCorner(this.thickness, this.thickness, this.thickness, false);
    this.DrawCorner(canvas.width - this.thickness, this.thickness,
      this.thickness, true);
}

  DrawCorner(x, y, thickness, left) {
    let borderThickness = thickness * 0.3;
    ctx.save();
    ctx.translate(x,y);
    ctx.beginPath();
    ctx.lineTo(0, thickness);
    let xChange = left ? thickness * -1 : thickness;
    let angle1 = left ? 0 : Math.PI;
    let angle2 = Math.PI * 3 / 2;
    ctx.arc(xChange, thickness, thickness, angle1, angle2, left);
    ctx.arc(0, 0, borderThickness, angle1, angle2, left);
    ctx.fill();
    ctx.restore();
  }

  DrawBulge(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  DrawSigns() {
    let scale = this.thickness / 40;
    ctx.scale(scale, scale)
    ctx.drawImage(this.signImg, canvas.width * 0.1 / scale, canvas.height
      * 0.06 / scale);
    ctx.drawImage(this.signImg, canvas.width * 0.75 / scale, canvas.height
      * 0.04 / scale);
    ctx.scale(1/scale, 1/scale);
  }

  DrawHealth() {
    ctx.fillStyle = this.backColor
    let healthBarTop = canvas.height - this.thickness * 1.7;
    ctx.fillRect(canvas.width * 0.2, healthBarTop, canvas.width * 0.7,
      canvas.height * 0.05);
    let healthPercent = player.tank.health / player.tank.maxHealth;
    let c = new Vector4(256,0,0,1).Interpolate(new Vector4(0,256,0,1),
      healthPercent);
    ctx.fillStyle = "rgba" + c.toString();
    ctx.fillRect(canvas.width * 0.2, healthBarTop, healthPercent
      * canvas.width * 0.65, canvas.height * 0.05);
    ctx.fillStyle = this.borderColor;
    ctx.fillRect(canvas.width * 0.15, healthBarTop + canvas.height * 0.05,
      canvas.width * 0.7, this.thickness * 0.2);
  }

  DrawItemPockets() {
    ctx.fillStyle = this.borderColor;
    let top = canvas.height - this.thickness * 2;
    let boxSize = canvas.height * 0.05;
    ctx.fillRect(canvas.width * 0.85, top, canvas.width * 0.15
      - this.thickness * 0.7, canvas.height * 0.05 + this.thickness * 0.5);
    ctx.fillStyle = this.backColor;
    ctx.fillRect(canvas.width - this.thickness * 1.2 - boxSize,
      canvas.height - this.thickness * 1.7, -boxSize, boxSize);
    ctx.fillRect(canvas.width - this.thickness, canvas.height -
      this.thickness * 1.7, -boxSize, boxSize);
  }

  UpdateFireIcons() {
    this.primaryFireIcon.ChangeItem(player.tank.primaryFireItem);
    this.secondaryFireIcon.ChangeItem(player.tank.secondaryFireItem);
  }

  OnDisplayResized(oldSize) {
    this.thickness = canvas.width * 0.05;
    let scaleFactor = this.thickness / 300;
    this.primaryFireIcon.transform.scale = new Vector2(scaleFactor, scaleFactor);
    this.secondaryFireIcon.transform.scale = new Vector2(scaleFactor, scaleFactor);
    let itemSize = canvas.height * 0.05;
    this.secondaryFireIcon.transform.position = new Vector2(canvas.width -
      this.thickness - itemSize / 2, canvas.height - this.thickness * 1.7 +
      itemSize / 2);
    this.primaryFireIcon.transform.position = new Vector2(canvas.width -
      this.thickness * 1.2 - itemSize * 1.5, canvas.height -
      this.thickness * 1.7 + itemSize / 2);
  }

}
