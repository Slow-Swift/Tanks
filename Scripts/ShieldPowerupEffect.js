class ShieldPowerupEffect extends PowerupEffect {

  StartEffect() {
    this.tank.shieldActive = true;
  }

  UpdateEffect() {
    this.tank.shieldActive = true;
    this.tank.fireActive = false;
    this.tank.freezeActive = false;
    ctx.fillStyle = "rgba(0,200,256,0.5)";
    ctx.beginPath();
    ctx.arc(this.tank.transform.position.x, this.tank.transform.position.y, 100 *
      this.tank.transform.scale.x, 0, Math.PI * 2);
    ctx.fill();
  }

  EndEffect() {
    this.tank.shieldActive = false;
  }

}
