class Mine extends Weapon {
  name = "Mine";
  waitTime = 0.2;
  fireTime = 0.5;
  range = 200;
  damage = 3;

  static maxStackAmount = 30;

  constructor(...args) {
    super(...args);
    this.readyToTrigger = false;
    this.fireing = false;
    this.sprite = new Sprite(this.object, "Images/Mine.png", true, 0.8);
    new CircleCollider(this.object, 64, true);
  }

  Start() {
    let sound = new Audio("Audio/placeSound.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.transform.position,
      gameManager.volumeQuietDst, volume);
  }

  Update() {
    if(!this.readyToTrigger && Time.time - this.startTime >= this.waitTime) {
      this.readyToTrigger = true;
    }
    if(this.fireing) {
      if(Math.round(Time.time * 10) % 2 == 0) {
        this.sprite.src = "Images/Mine2.png";
      } else {
        this.sprite.src = "Images/Mine.png";
      }
      if(Time.time - this.fireStartTime > this.fireTime) {
        this.object.Destroy();
        this.Explode();
      }
    }
  }

  PlaceAtTank() {
    this.transform.position = this.startTank.transform.position;
    this.transform.scale = this.startTank.transform.scale;
  }

  OnCollisionEnter(collision) {
    let w = collision.object.FindComponentOfType(Weapon);
    if(w) {
      w.OnCollidingWithWeapon(this);
      this.OnCollidingWithWeapon(w);
      return;
    }

    if(this.readyToTrigger && collision.object.FindComponentOfType(Tank)) {
      this.fireing = true;
      this.fireStartTime = Time.time;
    }
  }

  OnCollidingWithWeapon(weapon) {
    if(weapon instanceof Mine)
      return;

    this.fireing = true;
    this.fireStartTime = Time.time;
  }

  Explode() {
    let sound = new Audio("Audio/boom.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.transform.position,
      gameManager.volumeQuietDst, volume);
    let tanks = ObjectManagement.FindObjectsOfType(Tank);
    let damageVal = this.damage * this.damageModifier;
    for (let tank of tanks) {
      let toTankVector = tank.transform.position.clone.Subtract(this.transform.position);
      if(toTankVector.magnitude < this.range) {
        let damage = damageVal - damageVal *
          (toTankVector.magnitude / this.range);
        tank.DealDamage(damage);
        let explosionMagnitude = Mathf.Interpolate(this.range * 2, 0,
          toTankVector.magnitude / this.range);
        let explosionForce = toTankVector.clone;
        explosionForce.magnitude = explosionMagnitude;
        if(tank.active)
          tank.object.FindComponentOfType(RigidBody2D).AddForce(explosionForce);
      }
    }
  }
}
