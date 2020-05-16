class GameManager extends Component {

  remainingTanks = 0;
  numEnemyTanks = 5;

  worldRadius = 5000;
  dispersionPower = 2;
  volumeQuietDst = 300;

  savedDataPrefix = location.href + ": ";

  _playTime = null

  constructor(...args) {
    super(...args)
    window.gameManager = this;
    this.Load();
  }

  Update() {
    if(this.playingGame)
      this.UpdateGameState();
  }

  UpdateGameState() {
    let remainingTanks = ObjectManagement.FindObjectsOfType(Tank);
    this.remainingTanks = remainingTanks.length - 1;
    if(this.twoPlayer) {
      this.CheckTwoPlayerGameOver();
    } else {
      this.CheckForGameOver();
    }

    if(this.gameOver && Time.time - this.gameOverTime >= 1 && !this.cleaningUpGame) {
      let gameOverMenu = ObjectManagement.FindObjectOfType(GameOverMenu, false);
      new SceneFader("SceneFader", 2, [this.CleanupGame.bind(this),
        gameOverMenu.ShowMenu.bind(gameOverMenu)], []);
      this.cleaningUpGame = true;
    }
  }

  CleanupGame() {
    this.playingGame = false;
    this.cleaningUpGame = false;
    this._playTime = this.playTime;
    camera.position = Vector2.Zero;
    camera.scale = Vector2.One;
    let otd = [];

    otd.push(...ObjectManagement.FindObjectsOfType(Tank, false));
    otd.push(...ObjectManagement.FindObjectsOfType(Weapon, false));
    otd.push(...ObjectManagement.FindObjectsOfType(WorldItem, false));
    otd.push(...ObjectManagement.FindObjectsOfType(Powerup, false));
    otd.push(...ObjectManagement.FindObjectsOfType(PowerupEffect, false));
    otd.push(...ObjectManagement.FindObjectsOfType(AmmoCrate, false));
    otd.push(...ObjectManagement.FindObjectsOfType(BorderDrawer, false));
    otd.push(...ObjectManagement.FindObjectsOfType(Overlay, false));
    otd.push(...ObjectManagement.FindObjectsOfType(GameDataDisplay, false));
    otd.push(...ObjectManagement.FindObjectsOfType(Coin, false));
    otd.push(...ObjectManagement.FindObjectsOfType(InventoryItem, false));
    otd.push(...ObjectManagement.FindObjectsByName("Cactus", false));
    otd.push(...ObjectManagement.FindObjectsByName("Background", false));
    otd.push(...ObjectManagement.FindObjectsByName("Barrel", false));
    otd.push(...ObjectManagement.FindObjectsOfType(TwoPlayerManager, false));
    otd.push(...ObjectManagement.FindObjectsOfType(TwoPlayerOverlay, false));
    otd.push(...ObjectManagement.FindObjectsOfType(TwoPlayerInput, false));
    otd.push(...ObjectManagement.FindObjectsOfType(PlayerInput, false));

    for (var o of otd) {
      o.object.Destroy();
    }
  }

  CheckForGameOver() {
    if(this.gameOver)
      return;

    if(this.remainingTanks <= 0 && player.active) {
      this.gameOver = true;
      this.playerWins = true;
      this.gameOverTime = Time.time;
    } else if(!player.active) {
      this.gameOver = true;
      this.playerWins = false;
      this.gameOverTime = Time.time;
    }

    if(this.gameOver && this.autoDifficulty)
      this.AutoUpdateDifficulty();
  }

  AutoUpdateDifficulty() {
    if(this.playerWins) {
      this.numEnemyTanks = Mathf.Clamp(this.numEnemyTanks+1, 4, 20);
      this.enemyTankSpeed = Mathf.Clamp(this.enemyTankSpeed+30, 150, 750);
      this.enemyTankHealth = Mathf.Clamp(this.enemyTankHealth+31, 150, 750);
      this.enemyTankDamage = Mathf.Clamp(this.enemyTankDamage+1.6, 3, 30);
      this.enemyShootDelay = Mathf.Clamp(this.enemyShootDelay-0.05, 0.2, 1);
      this.enemyStopRadius = Mathf.Clamp(this.enemyStopRadius+25, 100, 500);
    } else {
      this.numEnemyTanks = Mathf.Clamp(this.numEnemyTanks-1, 4, 20);
      this.enemyTankSpeed = Mathf.Clamp(this.enemyTankSpeed-30, 150, 750);
      this.enemyTankHealth = Mathf.Clamp(this.enemyTankHealth-31, 150, 750);
      this.enemyTankDamage = Mathf.Clamp(this.enemyTankDamage-1.6, 3, 30);
      this.enemyShootDelay = Mathf.Clamp(this.enemyShootDelay+0.05, 0.2, 1);
      this.enemyStopRadius = Mathf.Clamp(this.enemyStopRadius-25, 100, 500);
    }
  }

  CheckTwoPlayerGameOver() {
    if(this.gameOver)
      return;

    if(!player1.active && !player2.active) {
      this.gameOver = true;
      this.winner = "Tie!";
      this.gameOverTime = Time.time;
    } else if(!player1.active) {
      this.gameOver = true;
      this.winner = "Player 2 Wins!!";
      this.gameOverTime = Time.time;
    } else if(!player2.active) {
      this.gameOver = true;
      this.winner = "Player 1 Wins!!";
      this.gameOverTime = Time.time;
    }
  }

  PrepareNewGame() {
    let playerPos = getRandomWorldPos();
    this.twoPlayer = false;
    this.gameOver = false;
    window.player = new Object("Player", playerPos, 0, new Vector2(0.3, 0.3));
    new Sprite(player, "Images/Tank.png");
    new PlayerInput(player, 0.39);

    new GameDataDisplay(new Object("GameDataDisplay", Vector2.Zero, 0, Vector2.One));
    new BorderDrawer("BorderDrawer", 0);
    new PowerupManager("PowerupManager");

    let pos = getRandomWorldPos();
    let o = new Object("AmmoCrate", pos, random.Random(0,Math.PI),new Vector2(0.5, 0.5));
    new AmmoCrate(o);
    this.CreateEnemies(gameManager.numEnemyTanks);
  }

  StartGame() {
    this.playingGame = true;
    this._playTime = null;
    this.gameStartTime = Time.time;
    this.startCoins = playerData.numCoins;
  }

  PrepareTwoPlayerGame() {
    this.gameOver = false;
    this.twoPlayer = true;
    let player1Pos = getRandomWorldPos();
    window.player1 = new Object("Player1", player1Pos, 0, new Vector2(0.3, 0.3));
    new Sprite(player1, "Images/Tank.png");
    new TwoPlayerInput(player1, {firePrimary: " ", fireSecondary: "f", front: "w", back: "s",
      left: "a", right: "d", itemSelect: "e"}, 0.39);

    let player2Pos = getRandomWorldPos();
    window.player2 = new Object("Player1", player2Pos, 0, new Vector2(0.3, 0.3));
    new Sprite(player2, "Images/Tank.png");
    new TwoPlayerInput(player2, {firePrimary: ",", fireSecondary: ".", front: "ArrowUp",
      back: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", itemSelect: "/"}, 0.39);

    player1.tank.name = "Player 1";
    player2.tank.name = "Player 2";
    player1.tank.inventorySize = 8;
    player2.tank.inventorySize = 8;
    new TwoPlayerManager("TwoPlayerManager");
    new TwoPlayerOverlay("TwoPlayerOverlay");
    new BorderDrawer("BorderDrawer", 0);
    let pos = getRandomWorldPos();
    let o = new Object("AmmoCrate", pos, random.Random(0,Math.PI),new Vector2(0.5, 0.5));
    new AmmoCrate(o);
    this.CreateEnemies(gameManager.numEnemyTanks);
  }

  CreateEnemies(amount) {
    for (var i = 0; i < amount; i++) {
      let pos = getRandomWorldPos();
      let tank = new Object("Enemy", pos, 0, new Vector2(.4, .4));
      new Sprite(tank, "Images/Tank.png");
      new Enemy(tank, 0.39);
    }
  }

  UpdateDifficultyToPreset() {
    this.numEnemyTanks = this.presetDifficulty.numE;
    this.enemyTankSpeed = this.presetDifficulty.speedE;
    this.enemyTankHealth = this.presetDifficulty.healthE;
    this.enemyTankDamage = this.presetDifficulty.damageE;
    this.enemyShootDelay = this.presetDifficulty.sDelayE;
    this.enemyStopRadius = this.presetDifficulty.stopRadiusE;

  }

  Load() {
    playerData.Load();

    let json = localStorage.getItem(this.savedDataPrefix + "DifficultySettings");
    let obj = JSON.parse(json) || {};
    this.numEnemyTanks = obj.numEnemyTanks || 4;
    this.enemyTankSpeed = obj.enemyTankSpeed || 150;
    this.enemyTankHealth = obj.enemyTankHealth || 150;
    this.enemyTankDamage = obj.enemyTankDamage || 3;
    this.enemyShootDelay = obj.enemyShootDelay || 1;
    this.enemyStopRadius = obj.enemyStopRadius || 100;
    this.autoDifficulty = !(obj.autoDifficulty === false);
    this.presetDifficulty = obj.presetDifficulty || {
      name: "Easy",
      numE: 4,
      speedE: 150,
      healthE: 150,
      damageE: 3,
      sDelayE: 1,
      stopRadiusE: 100,
    };
    this.volume = obj.volume || 100;
  }

  Save() {
    playerData.Save();
    let gm = this;
    let obj = {
      numEnemyTanks: gm.numEnemyTanks,
      enemyTankSpeed: gm.enemyTankSpeed,
      enemyTankHealth: gm.enemyTankHealth,
      enemyTankDamage: gm.enemyTankDamage,
      enemyShootDelay: gm.enemyShootDelay,
      enemyStopRadius: gm.enemyStopRadius,
      autoDifficulty: gm.autoDifficulty,
      presetDifficulty: gm.presetDifficulty,
      volume: gm.volume
    }
    let json = JSON.stringify(obj);
    localStorage.setItem(this.savedDataPrefix + "DifficultySettings", json);
  }

  get playTime() {
    return this._playTime || Time.time - this.gameStartTime;
  }

  get playTimeAsString() {
    let time = Math.floor(this.playTime);
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

  get collectedCoins() {
    return playerData.numCoins - this.startCoins;
  }
}
