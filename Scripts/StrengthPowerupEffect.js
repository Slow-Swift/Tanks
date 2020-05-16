class StrengthPowerupEffect extends PowerupEffect {

  StartEffect() {
    this.tank.transform.scale = this.tank.transform.scale.MultiplyS(this.effectiveness);
    this.tank.bulletDamage *= this.effectiveness;
  }

  EndEffect() {
    this.tank.transform.scale = this.tank.transform.scale.DivideS(this.effectiveness);
    this.tank.bulletDamage /= this.effectiveness;
  }
}
