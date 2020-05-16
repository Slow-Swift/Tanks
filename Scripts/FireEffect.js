class FireEffect extends PowerupEffect {

  StartEffect() {
    this.tank.DealDamage(this.effectiveness);
    if(this.tank.fireActive) {
      this.tank.fireEffect.remainingTime = 5;
      this.object.Destroy();
      return;
    }

    if(this.tank.freezeActive) {
      this.tank.freezeActive = false;
      this.object.Destroy();
      return;
    }
    let audio = new Audio("Audio/fireCrackle.wav");
    this.audio = AudioPlayer.playAdaptiveAudio(audio, this.transform.position,
      gameManager.volumeQuietDst, gameManager.volume/100, Infinity)

    this.tank.fireEffect = this;

    let animations = [["Fire", 1, "Images/TankFire/TankFire1.png",
  "Images/TankFire/TankFire2.png", "Images/TankFire/TankFire3.png",
  "Images/TankFire/TankFire4.png", "Images/TankFire/TankFire5.png",
  "Images/TankFire/TankFire6.png"]];

    let animation = new AnimatedSprite(this.object, animations, true, 0.4);
    animation.ShowAnimation("Fire", true);
    this.tank.fireActive = true;
  }

  UpdateEffect() {
    if(this.tank.active)
      this.tank.DealDamage(this.effectiveness * Time.deltaTime);
    else
      this.object.Destroy();

    if(!this.tank.fireActive) {
      this.EndEffect();
      this.object.Destroy();
    }

    this.transform.position = this.tank.transform.position;
    this.transform.scale = this.tank.transform.scale;
    this.transform.rotation = this.tank.transform.rotation;
  }

  EndEffect() {
    this.tank.fireActive = false;
    this.audio.iterations = 0;
    this.audio.audio.pause();
  }
}
