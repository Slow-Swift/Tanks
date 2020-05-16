class Tracks extends Component {
  lifetime = .3;

  constructor(object) {
    super(object);
    this._RequireComponent(Sprite, "Images/Tracks.png", false, 1);
    this.startTime = Time.time;
  }

  Update() {
    if(Time.time - this.startTime >= this.lifetime) {
      this.object.Destroy();
    }
  }
}
