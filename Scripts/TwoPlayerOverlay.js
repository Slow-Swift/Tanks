class TwoPlayerOverlay extends Component {

  color = "#b57f2e"
  borderColor = "#a06f28";
  backColor = "#ae8c5b";
  font = "sans-serif";

  items = [];
  p1PIndex = 0;
  p1SIndex = 1;
  p2PIndex = 0;
  p2SIndex = 1;

  constructor(o) {
    super(o, -0.5);
    this.SetupItems();
    this.OnDisplayResized(Vector2.Zero);
  }

  Update() {
    display.TurnShadowsOff();
    camera.MoveCtxBack();
    this.DrawRim();
    this.DrawHealth();
    this.DrawItemPockets();
    this.UpdateItems();
    this.DrawPlayerNames();
    camera.MoveCtxOut();
    display.TurnShadowsOn();
  }

  SetupItems() {
    for (var i = 0; i < 16; i++) {
      this.items.push(new InventoryItem("2PItem", player1.tank.items[0],
       -0.7))
    }
  }

  DrawRim() {
    let borderThickness = this.thickness * 0.15;
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.thickness, canvas.height);
    ctx.fillRect(0, 0, canvas.width, this.thickness);
    ctx.fillRect(0, canvas.height, canvas.width, -this.thickness);
    ctx.fillRect(canvas.width, 0, -this.thickness, canvas.height);

    ctx.fillStyle = this.borderColor;
    ctx.fillRect(this.thickness, this.thickness, -borderThickness,
        canvas.height - this.thickness * 1.5);
    ctx.fillRect(this.thickness, this.thickness, canvas.width -
      this.thickness * 2, -borderThickness);
    ctx.fillRect(canvas.width - this.thickness, this.thickness,
      borderThickness, canvas.height - this.thickness * 1.5);
    ctx.fillRect(this.thickness - borderThickness, canvas.height - this.thickness,
      canvas.width - this.thickness * 2 + borderThickness * 2, canvas.height * 0.15);

    this.DrawCorner(this.thickness, this.thickness, this.thickness/2, false);
    this.DrawCorner(canvas.width - this.thickness, this.thickness,
      this.thickness/2, true);
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

  DrawHealth() {
    ctx.fillStyle = this.backColor
    let healthBarTop = canvas.height - this.thickness * 0.9;
    ctx.fillRect(canvas.width * 0.495, healthBarTop, -canvas.width * 0.395,
      canvas.height * 0.1);
    ctx.fillRect(canvas.width * 0.505, healthBarTop, canvas.width * 0.395,
      canvas.height * 0.1);

    let healthPercent1 = player1.tank.health / player1.tank.maxHealth;
    let healthPercent2 = player2.tank.health / player2.tank.maxHealth;
    let c1 = new Vector4(256,0,0,1).Interpolate(new Vector4(0,256,0,1),
      healthPercent1);
    let c2 = new Vector4(256,0,0,1).Interpolate(new Vector4(0,256,0,1),
      healthPercent2);
    ctx.fillStyle = "rgba" + c1.toString();
    if(healthPercent1 > 0) {
      ctx.fillRect(canvas.width * 0.495, healthBarTop, -healthPercent1
        * canvas.width * 0.395, canvas.height * 0.1);
    }
    if(healthPercent2 > 0) {
      ctx.fillStyle = "rgba" + c2.toString();
      ctx.fillRect(canvas.width * 0.505, healthBarTop, healthPercent2
        * canvas.width * 0.395, canvas.height * 0.1);
    }
  }

  DrawItemPockets() {
    ctx.fillStyle = this.borderColor;
    let boxSize = canvas.height * 0.1;
    ctx.fillRect(canvas.width * 0.92, canvas.height * 0.07, canvas.width * 0.07,
      canvas.height * 0.895);
    ctx.fillRect(canvas.width * 0.01, canvas.height * 0.07, canvas.width * 0.07,
      canvas.height * 0.895);

    this.DrawSelectedItems();
    ctx.fillStyle = this.backColor;
    for (var i = 0; i < 8; i++) {
      ctx.fillRect(canvas.width * 0.018, canvas.height * 0.08 + boxSize * 1.1 * i,
        boxSize, boxSize);
      ctx.fillRect(canvas.width * 0.928, canvas.height * 0.08 + boxSize * 1.1 * i,
        boxSize, boxSize);
    }
  }

  DrawPlayerNames() {
    ctx.fillStyle = this.borderColor;
    ctx.fillRect(canvas.width * 0.085, canvas.height * 0.02, canvas.width * 0.412,
       canvas.height * 0.13);
     ctx.fillRect(canvas.width * 0.915, canvas.height * 0.02, -canvas.width * 0.412,
        canvas.height * 0.13);
    ctx.fillStyle = "white";
    ctx.font = canvas.height * 0.1 + "px " + this.font;
    ctx.fillText("Player 1", canvas.width * 0.18, canvas.height * 0.12);
    ctx.fillText("Player 2", canvas.width * 0.62, canvas.height * 0.12);
  }

  UpdateItems() {
    let p1Items = player1.tank.items;
    let p2Items = player2.tank.items;
    for (var i = 0; i < 8; i++) {
      this.items[i].ChangeItem(p1Items[i]);
      this.items[i+8].ChangeItem(p2Items[i]);
    }
  }

  DrawSelectedItems() {
    this.p1PIndex = player1.tank.selectedPIndex;
    this.p1SIndex = player1.tank.selectedSIndex;
    this.p2PIndex = player2.tank.selectedPIndex;
    this.p2SIndex = player2.tank.selectedSIndex;

    let boxSize = canvas.height * 0.1;
    ctx.fillStyle = "red";
    ctx.fillRect(canvas.width * 0.018 - boxSize * 0.05, canvas.height * 0.08 -
      boxSize * 0.05 + boxSize * 1.1 * this.p1PIndex, boxSize * 1.1, boxSize * 1.1);
    ctx.fillRect(canvas.width * 0.928 - boxSize * 0.05, canvas.height * 0.08 -
      boxSize * 0.05 + boxSize * 1.1 * this.p2PIndex, boxSize * 1.1, boxSize * 1.1);
    ctx.fillStyle = "blue";
    ctx.fillRect(canvas.width * 0.018 - boxSize * 0.05, canvas.height * 0.08 -
      boxSize * 0.05 + boxSize * 1.1 * this.p1SIndex, boxSize * 1.1, boxSize * 1.1);
    ctx.fillRect(canvas.width * 0.928 - boxSize * 0.05, canvas.height * 0.08 -
      boxSize * 0.05 + boxSize * 1.1 * this.p2SIndex, boxSize * 1.1, boxSize * 1.1);
  }

  OnDisplayResized(oldSize) {
    this.thickness = canvas.width * 0.1;
    for (var i = 0; i < 8; i++) {
      this.items[i].transform.scale = new Vector2((canvas.height * 0.1) / 180,
        (canvas.height * 0.1)/180);
      this.items[i].transform.position = new Vector2(canvas.width * 0.018 +
        canvas.height * 0.05, (i+1.2) * canvas.height * 0.11);
      this.items[i+8].transform.scale = new Vector2((canvas.height * 0.1) / 180,
        (canvas.height * 0.1)/180);
      this.items[i+8].transform.position = new Vector2(canvas.width * 0.928 +
        canvas.height * 0.05, (i+1.2) * canvas.height * 0.11);
    }
  }
}
