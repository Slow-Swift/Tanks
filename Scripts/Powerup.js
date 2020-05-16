class Powerup extends Component {
  gettingSmaller = true;
  sizeChangeTime = 0;

  constructor(object, src, ...args) {
    super(object, ...args);
    new Sprite(this.object, src, true, 0.2);
    new CircleCollider(this.object, 64, true);
  }

  Update() {
    let scaleChange = new Vector2(0.09 * Time.deltaTime, 0.09 * Time.deltaTime);
    if(this.gettingSmaller) {
      this.transform.scale = this.transform.scale.Subtract(scaleChange);
    } else {
      this.transform.scale = this.transform.scale.Add(scaleChange);
    }

    this.sizeChangeTime += Time.deltaTime;
    if(this.sizeChangeTime >= 1) {
      this.gettingSmaller = !this.gettingSmaller;
      this.sizeChangeTime = 0;
    }
  }

  OnCollected(tank) {}

  OnCollisionEnter(other) {
    let tank = other.object.FindComponentOfType(Tank);
    if(tank) {
      this.OnCollected(tank);
      this.object.Destroy();
    }
  }
}
