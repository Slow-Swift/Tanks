class MachineGun extends Bullet {

  static shootDelay = 0.05;
  static maxStackAmount = 200;
  static stopRadius = 600;

  name = "Pellets";
  damage = 0.3;

  constructor(...args) {
    super(...args);
    this.sprite.src = "Images/MachineGun.png";
    this.transform.scale = this.transform.scale.clone.MultiplyS(0.3);

  }

  PlaySound() {
    let sound = new Audio("Audio/machineGun.wav");
    let volume = gameManager.volume / 100;
    AudioPlayer.playAudio(sound, this.startTank.transform.position,
      gameManager.volumeQuietDst, volume);
  }

}
