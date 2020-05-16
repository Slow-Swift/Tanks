class PlayerInput extends Component {
  backgroundScale = 10;
  mines = 10;
  lastPFireTime = 0;

  constructor(gameobject, ...args) {
    super(gameobject, ...args);
    this._RequireComponent(Tank);
    this.tank = this.object.FindComponentOfType(Tank);
    this.object.tank = this.tank;
    this.object.pI = this;
    this.fireSound = new Audio("Audio/fire.wav");
    this.SetupStartItems();
    this.tank.primaryFireItem = this.tank.items[0];
    this.tank.secondaryFireItem = this.tank.items[1];
    this.tank.health = 250 + playerData.healthAmount * 25;
    this.tank.maxHealth = 250 + playerData.healthAmount * 25;
    this.tank.speed = 250 + playerData.speedAmount * 25;
    this.tank.bulletDamage = 5 + playerData.strengthAmount * 2;
    this.DoBackground();
    this.CreateBackgroundObjects();
  }

  SetupStartItems() {
    let startItems = [];
    for (var si of playerData.startItems) {
      startItems.push(new Item(si.name, si.quantity, si.imageSrc, si.objectType));
    }
    this.tank.items = startItems;
  }

  Update() {
    AudioPlayer.listenerLocation = this.transform.position.clone;
    if(gameManager.playingGame) {
      if(!gameManager.inventoryOpen) {
        this.HandleMovement();
        this.HandleFire();
        this.HandleScrolling();
      }
      if(Input.GetKeyDown("e")) {
        gameManager.inventoryOpen = !gameManager.inventoryOpen;
      }
      if(Input.GetKeyDown("Escape")) {
        if(gameManager.paused) {
          pauseMenu.Hide();
        } else {
          pauseMenu.Show();
        }
      }
    }
    this.UpdateCameraPosition();
  }

  UpdateCameraPosition() {
      let destinationPos = new Vector2(this.transform.position.x - canvas.width/2,
        this.transform.position.y - canvas.height/2);
      let pos = camera.transform.position.Interpolate(destinationPos,
        Time.deltaTime * 2);
    camera.position = pos;
  }

  HandleFire() {
    if(Input.GetKeyDown(' ') && this.tank.primaryFireItem) {
      this.elapsedPFireTime = this.tank.primaryFireItem.objectType.shootDelay;
    }
    if(Input.GetKey(' ') && this.tank.primaryFireItem) {
      this.elapsedPFireTime += Time.deltaTime
      let fireDelay = this.tank.primaryFireItem.objectType.shootDelay;
      while(this.elapsedPFireTime > fireDelay) {
        this.elapsedPFireTime -= fireDelay;
        this.tank.FirePrimary();
      }
    } else {
      this.elapsedPFireTime = 0;
    }

    if(Input.GetKeyDown('f') && this.tank.secondaryFireItem) {
      this.elapsedSFireTime = this.tank.secondaryFireItem.objectType.shootDelay;
    }
    if(Input.GetKey('f') && this.tank.secondaryFireItem) {
      this.elapsedSFireTime += Time.deltaTime
      let fireDelay = this.tank.secondaryFireItem.objectType.shootDelay;
      while(this.elapsedSFireTime > fireDelay) {
        this.elapsedSFireTime -= fireDelay;
        this.tank.FireSecondary();
      }
    } else {
      this.elapsedSFireTime = 0;
    }
  }

  HandleMovement() {
    if(Input.GetKey('w') || Input.GetKey("ArrowUp")) {
      this.transform.Translate(new Vector2(0, -this.tank.speed * Time.deltaTime), "self");
    }

    if(Input.GetKey('s') || Input.GetKey("ArrowDown")) {
      let pos = this.transform.LocalVectorToWorld(new Vector2(0, this.tank.speed  / 2 * Time.deltaTime), false);
      this.transform.position = pos;
    }

    if(Input.GetKey('a') || Input.GetKey("ArrowLeft")) {
      this.transform.rotation -= this.tank.turnSpeed * Time.deltaTime;
    }

    if(Input.GetKey('d') || Input.GetKey("ArrowRight")) {
      this.transform.rotation += this.tank.turnSpeed * Time.deltaTime;
    }
  }

  HandleScrolling() {
    if(Input.mouseScroll != 0) {
      let change = Input.mouseScroll * Time.deltaTime * 0.1;
      let scale = new Vector2(camera.scale.x + change, camera.scale.y + change);
      scale.x = Mathf.Clamp(scale.x, 0.3, 2.5);
      scale.y = Mathf.Clamp(scale.y, 0.3, 2.5);
      camera.scale = scale;
    }
  }

  DoBackground() {
    let background = ObjectManagement.FindObjectsByName("Background");
    let backgroundWidth = 512 * this.backgroundScale;
    let x = Math.floor((this.transform.position.x+backgroundWidth/2) / backgroundWidth);
    let y = Math.floor((this.transform.position.y+backgroundWidth/2) / backgroundWidth);

    let surroundingBackground = [[0,0,0],[0,0,0],[0,0,0]];
    for (var b of background) {
      let rx = b.x-x;
      let ry = b.y - y;
      if(rx >= -1 && rx <= 1 && ry >= -1 && ry <= 1) {
        surroundingBackground[rx + 1][ry + 1] = true;
      }
    }

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

  PickUpItem(item) {
    this.tank.PickUpItem(item);
  }

}
