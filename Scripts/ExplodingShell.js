class ExplodingShell extends Bullet {
  name = "Shell";
  speed = 400;
  lifetime = 0.7;
  range = 200;
  damage = 10;

  static maxStackAmount = 50;
  static shootDelay = 0.2;
  static stopRadius = 300;
  static shootDelay = 0.5;

  constructor(...args) {
    super(...args);
    this.sprite.src = "Images/Shell.png";
    this.transform.scale = this.transform.scale.clone.MultiplyS(0.3);
  }

  PlaySound() {
    let sound = new Audio("Audio/shellFire.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.transform.position,
      gameManager.volumeQuietDst, volume);
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
    this.Explode();
    this.object.Destroy();
  }

  OnCollidingWithWeapon(weapon) {
    this.Explode();
    this.object.Destroy();
  }

  Update() {
    if(Time.time - this.startTime >= this.lifetime) {
      this.Explode();
      this.object.Destroy();
      return;
    }

    this.transform.Translate(new Vector2(0, -this.speed * Time.deltaTime), "self");
  }

  Explode() {
    let sound = new Audio("Audio/boom.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.transform.position,
      gameManager.volumeQuietDst, volume);

    let tanks = ObjectManagement.FindObjectsOfType(Tank);
    let damageVal = this.damage * this.damageModifier;
    for (var tank of tanks) {
      let toTankVector = tank.transform.position.clone.Subtract(this.transform.position);
      if(toTankVector.magnitude < this.range) {
        let damage = damageVal - damageVal *
          (toTankVector.magnitude / this.range);
        tank.DealDamage(damage);
        let explosionMagnitude = Mathf.Interpolate(this.range * 3, 0,
          toTankVector.magnitude / this.range);
        let explosionForce = toTankVector.clone;
        explosionForce.magnitude = explosionMagnitude;
        if(tank.active)
          tank.object.FindComponentOfType(RigidBody2D).AddForce(explosionForce);
      }
    }
  }

}
