class HealPowerup extends Powerup {

  healAmount = 20;

  constructor(object, effectiveness, ...args) {
    super(object, "Images/HealPowerup.png", ...args);
    this.effectiveness = effectiveness;
  }

  OnCollected(tank) {
    let sound = new Audio("Audio/pickup.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.transform.position,
      gameManager.volumeQuietDst, volume);

    tank.health += this.healAmount * this.effectiveness;
    tank.health = Mathf.Min(tank.health, tank.maxHealth);
  }
}
