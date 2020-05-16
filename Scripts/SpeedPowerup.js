class SpeedPowerup extends Powerup {
  constructor(object, effectiveness, ...args) {
    super(object, "Images/SpeedPowerup.png", ...args);
    this.effectiveness = effectiveness;
  }

  OnCollected(tank) {
    let sound = new Audio("Audio/pickup.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.transform.position,
      gameManager.volumeQuietDst, volume);
    new SpeedPowerupEffect("SpeedPowerupEffect", 2 * this.effectiveness, 10, tank);
  }
}
