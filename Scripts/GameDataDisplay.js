class GameDataDisplay extends Component {
  constructor(object) {
    super(object);
    this.starTime = Time.time;
    this.tanksText = this._RequireComponent(Text, "", "#eeddaa", 22, new Vector2
      (660 * 0.18, 360 * 0.26), true, 0, 0, 0, -0.7);
    this.timeText = new Text(this.object, "", "#eeddaa", 25, new Vector2
      (660 * 0.835, 360 * 0.25), true, 0, 0, 0, -0.7);
    this.overlay = this._RequireComponent(Overlay);
    this.compass = new CamSprite("Compass", "Images/Compas.png", false, -0.7);
    this.compass.transform.position = new Vector2(660 * 0.13,
      360 * 0.781);
    this.compass.transform.scale = new Vector2(660 * 0.05  / 40,
      660 * 0.05 / 40);
    this.OnDisplayResized(new Vector2(660, 360));
  }

  Update() {
    let scale = Mathf.Min(canvas.width * 0.05, canvas.height * 0.1) / 40;
    this.tanksText.text = "Tanks: " + gameManager.remainingTanks;
    this.timeText.text = this.GetTimeAsMinsAndSecs();
    this.compass.transform.rotation = this.GetAngleToClosestTank();
  }

  GetTimeAsMinsAndSecs() {
    let time = Math.floor(Time.time-this.starTime);
    let seconds = time % 60 + "";
    let mins = Math.floor(time / 60) + "";
    let res = "";
    if(mins.length == 1)
      res += "0" + mins + ":";
    else
      res += mins + ":";

    if(seconds.length == 1)
      res += "0" + seconds;
    else
      res += seconds;
    return res;
  }

  GetAngleToClosestTank() {
    let tanks = ObjectManagement.FindObjectsOfType(Enemy);
    let smallestDstVector;
    for (var tank of tanks) {
      let toTankVector = tank.transform.position.clone.Subtract(
        player.transform.position);
      if(!smallestDstVector || smallestDstVector.magnitude > toTankVector.magnitude) {
        smallestDstVector = toTankVector;
      }
    }
    return smallestDstVector ? smallestDstVector.angle : 0;
  }

  OnDestroy() {
    this.compass.object.Destroy();
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale = this.transform.scale.MultiplyS(scale);
    this.compass.transform.position = this.compass.transform.position.
      MultiplyS(scale);
    this.compass.transform.scale = this.compass.transform.scale.MultiplyS(scale);

  }
}
