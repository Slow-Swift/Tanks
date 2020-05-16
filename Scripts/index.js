function init() {
  console.log("Load Library");
  LibraryLoader.LoadLibrary(FinishedLoadingLibrary)
  let scripts = ["Scripts/PlayerInput.js", "Scripts/Tank.js",
"Scripts/Enemy.js", "Scripts/GameManager.js", "Scripts/GameDataDisplay.js",
"Scripts/MainMenu.js", "Scripts/Tracks.js", "Scripts/Item.js",
"Scripts/Overlay.js", "Scripts/WorldItem.js", "Scripts/InventoryItem.js",
"Scripts/Weapon.js", "Scripts/Bullet.js", "Scripts/Mine.js",
"Scripts/Inventory.js", "Scripts/BorderDrawer.js", "Scripts/SettingsMenu.js",
"Scripts/AdvancedDifficultyMenu.js", "Scripts/HomingMissile.js",
'Scripts/Powerup.js', "Scripts/HealPowerup.js", "Scripts/PowerupManager.js",
"Scripts/ShieldPowerup.js", "Scripts/PowerupEffect.js", "Scripts/ShieldPowerupEffect.js",
"Scripts/StrengthPowerup.js", "Scripts/StrengthPowerupEffect.js",
"Scripts/SpeedPowerup.js", "Scripts/SpeedPowerupEffect.js", "Scripts/MachineGun.js",
"Scripts/ExplodingShell.js", "Scripts/FreezeShell.js", "Scripts/FreezeEffect.js",
"Scripts/FireShell.js", "Scripts/FireEffect.js", "Scripts/AmmoCrate.js",
"Scripts/Coin.js", "Scripts/PauseMenu.js", "Scripts/WeaponsMenu.js", "Scripts/PlayerData.js",
"Scripts/TwoPlayerInput.js", "Scripts/TwoPlayerManager.js", "Scripts/TwoPlayerOverlay.js",
"Scripts/InfoMenu.js", "Scripts/GameOverMenu.js", "Scripts/HowToPlayMenu.js",
"Scripts/SettingsInfoMenu.js", "Scripts/UpgradesInfoMenu.js", "Scripts/PowerupInfoMenu.js",
"Scripts/WeaponsInfoMenu.js", "Scripts/ConfirmResetMenu.js"];

  LibraryLoader.LoadScripts(scripts, Setup);
}

function Setup() {
  display.Resize(800, 700);
  display.clearColor = "#ffc500";
  onresize();

  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 3;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  window.random = new Random();

  window.playerData = new PlayerData();
  window.gameManager = new GameManager(new Object("GameManager", Vector2.Zero, 0, Vector2.One));
  window.pauseMenu = new PauseMenu("PauseMenu", -0.8);


  new MainMenu(new Object("MainMenu", Vector2.Zero, 0, Vector2.One));
  new GameOverMenu("GameOverMenu");
  new SettingsMenu("SettingsMenu");
  new AdvancedDifficultyMenu("AdvancedDifficultyMenu");
  new WeaponsMenu("WeaponsMenu");
  new InfoMenu("InfoMenu");
  new HowToPlayMenu("HowToPlayMenu");
  new SettingsInfoMenu("SettingsInfoMenu");
  new UpgradesInfoMenu("UpgradesInfoMenu");
  new PowerupInfoMenu("PowerupInfoMenu");
  new WeaponsInfoMenu("WeaponsInfoMenu");
  new ConfirmResetMenu("ConfirmResetMenu");
}

window.PrepareNewGame = function() {
  let playerPos = getRandomWorldPos();
  window.player = new Object("Player", playerPos, 0, new Vector2(0.3, 0.3));
  new Sprite(player, "Images/Tank.png");
  new PlayerInput(player, 0.39);


  new GameDataDisplay(new Object("GameDataDisplay", Vector2.Zero, 0, Vector2.One));
  new BorderDrawer("BorderDrawer", 0);
  let angle = random.Random(0, Math.PI * 2)
  let min = random.Random(0, gameManager.worldRadius);
  let mag = random.Random(min, gameManager.worldRadius);
  let pos = Vector2.VectorFromAngleAndMagnitude(angle, mag)
  let o = new Object("AmmoCrate", pos, random.Random(0,Math.PI),new Vector2(0.5, 0.5));
  new AmmoCrate(o);
  CreateEnemies(gameManager.numEnemyTanks);
}

window.PrepareTwoPlayerGame = function() {
  gameManager.twoPlayer = true;
  let player1Pos = getRandomWorldPos();
  window.player1 = new Object("Player1", player1Pos, 0, new Vector2(0.3, 0.3));
  new Sprite(player1, "Images/Tank.png");
  new TwoPlayerInput(player1, {firePrimary: " ", fireSecondary: "f", front: "w", back: "s",
    left: "a", right: "d", itemSelect: "e"}, 0.39);

  let player2Pos = getRandomWorldPos();
  window.player2 = new Object("Player1", player2Pos, 0, new Vector2(0.3, 0.3));
  new Sprite(player2, "Images/Tank.png");
  new TwoPlayerInput(player2, {firePrimary: "Control", fireSecondary: "Shit", front: "ArrowUp",
    back: "ArrowDown", left: "ArrowLeft", right: "ArrowRight", itemSelect: "Enter"}, 0.39);

  player1.tank.name = "Player 1";
  player2.tank.name = "Player 2";
  player1.tank.inventorySize = 8;
  player2.tank.inventorySize = 8;
  new TwoPlayerManager("TwoPlayerManager");
  new TwoPlayerOverlay("TwoPlayerOverlay");
  new BorderDrawer("BorderDrawer", 0);
  let angle = random.Random(0, Math.PI * 2)
  let min = random.Random(0, gameManager.worldRadius);
  let mag = random.Random(min, gameManager.worldRadius);
  let pos = Vector2.VectorFromAngleAndMagnitude(angle, mag)
  let o = new Object("AmmoCrate", pos, random.Random(0,Math.PI),new Vector2(0.5, 0.5));
  new AmmoCrate(o);
  CreateEnemies(gameManager.numEnemyTanks);
}

function OnPlayPressed() {
  console.log("Hello");
  ObjectManagement.FindObjectByName("MainMenu").SetActive(false);
  ObjectManagement.FindObjectByName("PlayBtn").SetActive(false);
  gameManager.PrepareNewGame();
}

function FinishedLoadingLibrary() {
  console.log("Loading Library Complete");
}

window.onresize = function(e) {
  let widthScale = (document.body.clientWidth / 660) < (document.body.clientHeight / 360);
  let width = widthScale ? document.body.clientWidth * 0.98 : document.body.clientHeight * 0.98 * 1.8;
  let height = width * 0.54;
  display.Resize(width, height);
}

window.getDispersionRadius = function(radius) {
  let v = random.Random(0, 1);
  v = Math.pow(v, gameManager.dispersionPower);
  return (1-v) * radius;
}

window.getRandomWorldPos = function() {
  let a = random.Random(0, Math.PI * 2);
  let m = getDispersionRadius(gameManager.worldRadius);
  return Vector2.VectorFromAngleAndMagnitude(a, m);
}
