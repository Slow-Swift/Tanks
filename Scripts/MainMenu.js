class MainMenu extends Component {

  constructor(object) {
    super(object);
    this.background = new CamSprite("MenuBackground", "Images/TanksMainMenu.png", true, 1);
    this.background.transform.scale = new Vector2(canvas.width / 1320, canvas.width / 1320);
    this.background.transform.position = new Vector2(canvas.width / 2, canvas.height * 0.4);
    this.gameOverText = new Text(this.object, "", "#ffffff", 120,
      new Vector2(canvas.width/2, canvas.height/3), true);
    this.playBtn = new Button(new Object("PlayBtn", new Vector2(
      canvas.width / 1.95, canvas.height * 0.35), 0, new Vector2(canvas.width / 1700,
      canvas.width / 1700)), 400, 200, "Images/Play.png",
      this.OnPlayPressed.bind(this));
    this.settingsBtn = new Button(new Object("SettingsBtn", new Vector2(
      canvas.width / 1.95, canvas.height * 0.6), 0, new Vector2(canvas.width / 1700,
      canvas.width / 1700)), 400, 200, "Images/Settings.png",
      this.OnSettingsPressed.bind(this));
    this.weaponsBtn = new Button(new Object("WeaponsBtn", new Vector2(
      canvas.width / 1.95, canvas.height * 0.85), 0, new Vector2(canvas.width / 1700,
      canvas.width / 1700)), 400, 200, "Images/WeaponsBtn.png",
      this.OnWeaponsPressed.bind(this));
    this.instructionsBtn = new Button(new Object("InstructionsBtn", new Vector2(
      canvas.width * 0.92, canvas.height * 0.85), 0, new Vector2(canvas.width /
      1300, canvas.width / 1300)), 128, 128, "Images/Instructions.png", this.OnInstructionsBtnPressed.bind(this));
    this.twoPlayerBtn = new Button(new Object("TwoPlayerBtn", new Vector2(
      canvas.width * 0.08, canvas.height * 0.85), 0, new Vector2(canvas.width /
      1300, canvas.width / 1300)), 128, 128, "Images/TwoPlayers.png",
      this.OnTwoPlayerBtnPressed.bind(this));
    this.ShowMainMenu();
  }

  ShowMenu() {
    console.log("menu");
    this.object.SetActive(true);
    this.playBtn.object.SetActive(true);
    this.settingsBtn.object.SetActive(true);
    this.background.object.SetActive(true);
    this.instructionsBtn.object.SetActive(true);
    this.twoPlayerBtn.object.SetActive(true);
    this.weaponsBtn.object.SetActive(true);
  }

  ShowMainMenu() {
    console.log("Main");
    this.playBtn.object.SetActive(true);
    this.background.object.SetActive(true);
    this.settingsBtn.object.SetActive(true);
    this.instructionsBtn.object.SetActive(true);
    this.twoPlayerBtn.object.SetActive(true);
    this.weaponsBtn.object.SetActive(true);
  }

  OnSettingsPressed() {
    let settingsMenu = ObjectManagement.FindObjectOfType(SettingsMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      settingsMenu.ShowMenu.bind(settingsMenu)], []);
  }

  OnPlayPressed() {
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      gameManager.PrepareNewGame.bind(gameManager)], [gameManager.StartGame.
      bind(gameManager)]);
  }

  OnWeaponsPressed() {
    let weaponsMenu = ObjectManagement.FindObjectOfType(WeaponsMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      weaponsMenu.ShowMenu.bind(weaponsMenu)], []);
  }

  OnTwoPlayerBtnPressed() {
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      gameManager.PrepareTwoPlayerGame.bind(gameManager)], [
      gameManager.StartGame.bind(gameManager)]);
  }

  OnInstructionsBtnPressed() {
    let infoMenu = ObjectManagement.FindObjectOfType(InfoMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      infoMenu.ShowMenu.bind(infoMenu)], []);
  }

  CloseMenu() {
    this.playBtn.object.SetActive(false);
    this.object.SetActive(false);
    this.settingsBtn.object.SetActive(false);
    this.background.object.SetActive(false);
    this.instructionsBtn.object.SetActive(false);
    this.twoPlayerBtn.object.SetActive(false);
    this.weaponsBtn.object.SetActive(false);
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale = this.transform.scale.MultiplyS(scale);
    this.playBtn.transform.scale = this.playBtn.transform.scale.
      MultiplyS(scale);
    this.playBtn.transform.position = this.playBtn.transform.position.
      MultiplyS(scale);
    this.background.transform.scale.MultiplyS(scale);
    this.background.transform.position.MultiplyS(scale);
    this.settingsBtn.transform.scale.MultiplyS(scale);
    this.settingsBtn.transform.position.MultiplyS(scale);
    this.instructionsBtn.transform.scale.MultiplyS(scale);
    this.instructionsBtn.transform.position.MultiplyS(scale);
    this.twoPlayerBtn.transform.scale.MultiplyS(scale);
    this.twoPlayerBtn.transform.position.MultiplyS(scale);
    this.weaponsBtn.transform.scale.MultiplyS(scale);
    this.weaponsBtn.transform.position.MultiplyS(scale);
  }
}
