class FreezeEffect extends PowerupEffect {

  constructor(...args) {
    super(...args);
  }

  StartEffect() {
    this.tank.DealDamage(this.effectiveness);
    if(this.tank.freezeActive) {
      this.tank.freezeEffect.remainingTime = 10;
      this.object.Destroy();
      return;
    }

    if(this.tank.fireActive) {
      this.tank.fireActive = false;
      this.object.Destroy();
      return;
    }

    this.tank.freezeEffect = this;

    let animations = [["Freeze", 1, "Images/TankFreeze/TankFreeze1.png",
  "Images/TankFreeze/TankFreeze2.png", "Images/TankFreeze/TankFreeze3.png",
  "Images/TankFreeze/TankFreeze4.png", "Images/TankFreeze/TankFreeze5.png",
  "Images/TankFreeze/TankFreeze6.png"]];

    this.speed = this.tank.speed;
    this.turnSpeed = this.tank.turnSpeed;
    this.tank.speed = 0;
    this.tank.turnSpeed = 0;
    let animation = new AnimatedSprite(this.object, animations, true, 0.4);
    animation.ShowAnimation("Freeze", false);
    this.tank.freezeActive = true;
  }

  UpdateEffect() {

    if(!this.tank.active || !this.tank.freezeActive)
      this.object.Destroy();

    this.transform.position = this.tank.transform.position;
    this.transform.scale = this.tank.transform.scale;
    this.transform.rotation = this.tank.transform.rotation;
  }

  EndEffect() {
    this.tank.speed = this.speed;
    this.tank.turnSpeed = this.turnSpeed;
    this.tank.freezeActive = false;
  }
}
