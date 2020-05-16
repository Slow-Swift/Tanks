class ShieldPowerup extends Powerup {
  constructor(object, effectiveness, ...args) {
    super(object, "Images/ShieldPowerup.png", ...args);
    this.effectiveness = effectiveness;
  }

  OnCollected(tank) {
    let sound = new Audio("Audio/pickup.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.transform.position,
      gameManager.volumeQuietDst, volume);
    new ShieldPowerupEffect("ShieldPowerupEffect", 1, 10 * this.effectiveness, tank);
  }

}
