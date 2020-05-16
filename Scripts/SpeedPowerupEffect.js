class SpeedPowerupEffect extends PowerupEffect {

  StartEffect() {
    this.tank.speed *= this.effectiveness;
  }

  EndEffect() {
    this.tank.speed /= this.effectiveness;
  }

}
