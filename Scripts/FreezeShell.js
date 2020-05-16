class FreezeShell extends Bullet {
  name = "FreezeShell";
  primary = false;
  damage = 5;

  static maxStackAmount = 10;
  static primary = false;
  static shootDelay = 0.4;


  constructor(...args) {
    super(...args);
    this.sprite.src = "Images/FreezeShell.png";
    this.transform.scale = this.transform.scale.clone.MultiplyS(0.3);

  }

  PlaySound() {
    let sound = new Audio("Audio/freezeFire.wav");
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
      new FreezeEffect("FreezeEffect", this.damage, 10, tank);
    }
    this.object.Destroy();
  }

}
