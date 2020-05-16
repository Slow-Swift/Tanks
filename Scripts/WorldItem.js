class WorldItem extends Component {
  gettingSmaller = true;
  sizeChangeTime = 0;

  waitTime = 0;

  constructor(object, item, finishPos, ...args) {
    super(object, ...args);
    this.item = item;
    this.finishPos = finishPos;
    this.startPos = this.transform.position.clone;
    this.startTime = Time.time;

    if(!item)
      return;

    let sprite = new Sprite(this.object, item.imageSrc, true, 0.2);
    new CircleCollider(this.object, sprite.image.width/2, true);
    this.quantityText = new Text(this.object, this.item.quantity, "white", 50,
      new Vector2(30, 30), true, true, 0, false, 0.1);

    this.lastScale = this.transform.scale.clone;
    this.targetScale = this.transform.scale.clone.MultiplyS(1.2);
    this.oldTargetScale = this.transform.scale.clone;
  }

  Update() {
    if(this.lastScale && !this.lastScale.Equals(this.transform.scale)) {
      let scaleValue = this.transform.scale.clone.Divide(this.lastScale);
      this.targetScale = this.targetScale.MultiplyS(scaleValue);
      this.oldTargetScale = this.oldTargetScale.MultiplyS(scaleValue);
    }

    let scaleDifference = this.targetScale.clone.Subtract(this.oldTargetScale);
    let scaleChange = scaleDifference.MultiplyS(Time.deltaTime);
    this.transform.scale = this.transform.scale.Add(scaleChange);

    if(this.targetScale.magnitude > this.oldTargetScale.magnitude) {
      if(this.transform.scale.magnitude >= this.targetScale.magnitude) {
        let temp = this.oldTargetScale;
        this.oldTargetScale = this.targetScale;
        this.targetScale = temp;
      }
    } else {
      if(this.transform.scale.magnitude <= this.targetScale.magnitude) {
        let temp = this.oldTargetScale;
        this.oldTargetScale = this.targetScale;
        this.targetScale = temp;
      }
    }

    if(Time.time - this.startTime < 0.2) {
      let percentageMove = (Time.time - this.startTime) / 0.2;
      let targetPos = this.startPos.clone.Interpolate(this.finishPos, percentageMove);
      this.transform.position = targetPos;
    } else {
      this.transform.position = this.finishPos;
    }

    this.lastScale = this.transform.scale.clone;
  }

  OnCollisionEnter(other) {
    if(this.startTime + this.waitTime > Time.time)
      return;

    let tank = other.object.FindComponentOfType(Tank);
    if(tank) {
      let sound = new Audio("Audio/pickup.wav");
      let volume = gameManager.volume / 100;

      AudioPlayer.playAudio(sound, this.transform.position,
        gameManager.volumeQuietDst, volume);

      if(tank.PickUpItem(this.item)) {
        this.object.Destroy();
      } else {
        this.quantityText.text = this.item.quantity;
      }
    }
  }
}
