class Bullet extends Weapon {
  name = "Bullet";
  speed = 1000;
  lifetime = 1;
  damage = 1;

  static maxStackAmount = 100;

  constructor(...args) {
    super(...args);
    this.collider = new CircleCollider(this.object, 8, true);
    this.sprite = new Sprite(this.object, "Images/Bullet.png", true, 0.6);
  }

  PlaySound() {
    let sound = new Audio("Audio/fire.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.startTank.transform.position,
      gameManager.volumeQuietDst, volume);
  }

  PlaceAtTank() {
    this.transform.position = this.startTank.transform.LocalVectorToWorld(
      new Vector2(0, -90), true);
    this.transform.rotation = this.startTank.transform.rotation;
    this.transform.scale = this.startTank.transform.scale;
  }

  Update() {
    if(Time.time - this.startTime >= this.lifetime) {
      this.object.Destroy();
      return;
    }

    this.transform.Translate(new Vector2(0, -this.speed * Time.deltaTime), "self");
  }

  OnCollidingWithWeapon(weapon) {
    this.object.Destroy();
  }

  OnCollisionEnter(collider) {
    let w = collider.object.FindComponentOfType(Weapon);
    if(w) {
      w.OnCollidingWithWeapon(this);
      this.OnCollidingWithWeapon(w);
    }

    if(collider.trigger)
      return;

    let tank = collider.object.FindComponentOfType(Tank);
    if(tank) {
      tank.DealDamage(this.damage * this.damageModifier);
    }
    this.object.Destroy();
  }
}
