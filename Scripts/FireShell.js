class FireShell extends Bullet {
  name = "FireShell";
  damage = 5;

  static primary = false;
  static maxStackAmount = 20;
  static shootDelay = 0.4;

  constructor(...args) {
    super(...args);
    this.sprite.src = "Images/FireShell.png";
    this.transform.scale = this.transform.scale.clone.MultiplyS(0.3);

  }

  PlaySound() {
    let sound = new Audio("Audio/flameFire.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.startTank.transform.position,
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

    let tank = collider.object.FindComponentOfType(Tank);
    if(tank) {
      new FireEffect("FireEffect", this.damage, 5, tank);
    }
    this.object.Destroy();
  }

}
