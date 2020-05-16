class TwoPlayerManager extends Component {
  backgroundScale = 10;

  constructor(...args) {
    super(...args);
    this.DoBackground();
    this.CreateBackgroundObjects();
  }


  Update() {
    this.UpdateCameraPosition();
  }

  UpdateCameraPosition() {
    let p1ToP2 = player2.transform.position.clone.Subtract(player1.transform.position);
    let cameraPosition = player1.transform.position.clone.Add(p1ToP2.clone.MultiplyS(0.5));
    cameraPosition.Subtract(new Vector2(canvas.width / 2, canvas.height/2));
    camera.position = cameraPosition;

    let scaleX = (Math.abs(p1ToP2.x) + 400) / canvas.width * 1.3;
    let scaleY = (Math.abs(p1ToP2.y) + 400) / (canvas.height - canvas.width * 0.2);
    let scale = Math.max(scaleX, scaleY, 1)
    camera.scale = new Vector2(scale, scale);
  }

  DoBackground() {
    let backgroundWidth = 512 * this.backgroundScale;
    let x = Math.floor((this.transform.position.x+backgroundWidth/2) / backgroundWidth);
    let y = Math.floor((this.transform.position.y+backgroundWidth/2) / backgroundWidth);

    let surroundingBackground = [[0,0,0],[0,0,0],[0,0,0]];

    for (var i = 0; i < surroundingBackground.length; i++) {
      for (var j = 0; j < surroundingBackground[i].length; j++) {
        if(!surroundingBackground[i][j]) {
          this.CreateNewBackground(i-1 + x, y-1 + j);
        }
      }
    }
  }

  CreateNewBackground(x, y) {
    let backgroundWidth = 512 * this.backgroundScale;
    let o = new Object("Background", new Vector2(x * backgroundWidth, y * backgroundWidth),
      0, new Vector2(this.backgroundScale,this.backgroundScale));
    o.x = x;
    o.y = y;
    new Sprite(o, "Images/Background.png", false, 1);
  }

  CreateBackgroundObjects() {
    let numCacs = random.Random(50, 80, true);
    let cacImages = ["Images/Cactus1.png"];
    for (var i = 0; i < numCacs; i++) {
      let angle = random.Random(0, Math.PI * 2);
      let magnitude = getDispersionRadius(gameManager.worldRadius);
      let pos = Vector2.VectorFromAngleAndMagnitude(angle, magnitude);
      let rotation = random.Random(0, Math.PI * 2);
      let scale = random.Random(0.2, 0.4);
      let o = new Object("Cactus", pos, rotation, new Vector2(scale, scale));
      new Sprite(o, cacImages[random.Random(0, cacImages.length, true)]);
      new CircleCollider(o, 64);
    }

    let numBarrels = random.Random(7, 13, true);
    for (var i = 0; i < numBarrels; i++) {
      let angle = random.Random(0, Math.PI * 2);
      let min = random.Random(0, gameManager.worldRadius);
      let magnitude = random.Random(min, gameManager.worldRadius);
      let pos = Vector2.VectorFromAngleAndMagnitude(angle, magnitude);
      let rotation = random.Random(0, Math.PI * 2);
      let scale = random.Random(0.6, 0.8);
      let o = new Object("Barrel", pos, rotation, new Vector2(scale, scale));
      new Sprite(o, "Images/WaterTower.png");
      new CircleCollider(o, 64);
    }
  }

}
