class PowerupEffect extends Component {

  constructor(object, effectiveness, time, tank) {
    super(object, 0.2);
    this.tank = tank;
    this.effectiveness = effectiveness;
    this.remainingTime = time;
    this.transform.position = this.tank.transform.position.clone;
    this.transform.scale = this.tank.transform.scale.clone;
    this.transform.rotation = this.tank.transform.rotation.clone;
    this.StartEffect();
  }

  StartEffect() {}

  EndEffect() {}

  UpdateEffect() {}

  Update() {
    this.UpdateEffect();
    if(this.remainingTime <= 0) {
      this.EndEffect();
      this.object.Destroy();
    }
    this.remainingTime -= Time.deltaTime;
  }


}
