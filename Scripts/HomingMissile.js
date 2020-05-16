class HomingMissile extends Weapon {
  name = "Missile";
  primary = false;
  speed = 300;
  lifetime = 15;
  damage = 3;
  turnSpeed = 3;

  static maxStackAmount = 20;
  static primary = false;
  static stopRadius = Infinity;
  static shootDelay = 0.7;

  constructor(...args) {
    super(...args);
    this.collider = new CircleCollider(this.object, 8, false);
    new Sprite(this.object, "Images/Missile.png", true, 0.6);
    this.transform.scale = this.transform.scale.clone.MultiplyS(0.5);
  }

  PlaySound() {
    let sound = new Audio("Audio/missileFire.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.startTank.transform.position,
      gameManager.volumeQuietDst, volume);
  }

  PlaceAtTank() {
    this.transform.position = this.startTank.transform.LocalVectorToWorld(
      new Vector2(0, -90), true);
    this.transform.rotation = this.startTank.transform.rotation;
    this.transform.scale = this.startTank.transform.scale;
    this.FindTarget();
  }

  FindTarget() {
    let tanks = ObjectManagement.FindObjectsOfType(Tank);
    let shortestDst = Infinity;
    for(let tank of tanks) {
      if(tank == this.startTank)
        continue;

      let toTankVector = tank.transform.position.clone.Subtract(this.transform.position);
      if(toTankVector.magnitude < shortestDst) {
        this.target = tank;
        shortestDst = toTankVector.magnitude;
      }
    }
  }

  OnCollidingWithWeapon(weapon) {
    this.object.Destroy();
  }

  Update() {
    if(Time.time - this.startTime >= this.lifetime) {
      this.object.Destroy();
      return;
    }

    if(this.target && this.target.active) {
      let toTargetVector = this.target.transform.position.clone.Subtract(
        this.transform.position);
      let targetAngle = toTargetVector.angle + Math.PI/2;
      let currentAngle = this.transform.rotation;
      let relativeAngle = targetAngle-currentAngle;
      relativeAngle = Mathf.NormalizeRadians(relativeAngle);
      relativeAngle = Mathf.Clamp(relativeAngle, -this.turnSpeed * Time.deltaTime,
        this.turnSpeed * Time.deltaTime);
      this.transform.rotation = currentAngle + relativeAngle;
    }

    this.transform.Translate(new Vector2(0, -this.speed * Time.deltaTime), "self");
  }

  OnCollisionEnter(collider) {
    let w = collider.object.FindComponentOfType(Weapon);
    if(w) {
      w.OnCollidingWithWeapon(this);
      this.OnCollidingWithWeapon(w);
      return;
    }

    if(collider.trigger)
      return;

    let tank = collider.object.FindComponentOfType(Tank);
    if(tank && tank == this.startTank) {
      return;
    }
    if(tank) {
      tank.DealDamage(this.damage * this.damageModifier);
    }
    this.object.Destroy();
  }
}
