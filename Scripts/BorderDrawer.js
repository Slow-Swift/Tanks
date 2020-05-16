class BorderDrawer extends Component {

  Update() {
    display.TurnShadowsOff();
    this.radius = gameManager.worldRadius;
    ctx.fillStyle = "rgba(256, 0, 0, 0.2)";
    this.DrawCorner(1, 0, 0, Math.PI / 2, 1, 1);
    this.DrawCorner(0, 1, Math.PI / 2, Math.PI, -1, 1);
    this.DrawCorner(-1, 0, Math.PI, Math.PI * 3 / 2, -1, -1);
    this.DrawCorner(0, -1, Math.PI * 3 / 2, Math.PI * 2, 1, -1);
    display.TurnShadowsOn();
  }

  DrawCorner(sx, sy, a1, a2, d1, d2) {
    ctx.moveTo(sx * this.radius, sy * this.radius);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + 20, a1, a2);
    ctx.lineTo(-sy * this.radius * 2, sx * this.radius * 2);
    ctx.lineTo(d1 * this.radius * 2, d2 * this.radius * 2);
    ctx.lineTo(sx * this.radius * 2, sy * this.radius * 2);
    ctx.fill();
    ctx.closePath();
  }
}
