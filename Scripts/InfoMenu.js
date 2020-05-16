class InfoMenu extends Component {
  borderColor = "#a06f28";
  backColor = "#ae8c5b";
  font = "sans-serif";

  buttons = [];

  constructor(...args) {
    super(...args);
    this.backBtn = new Button(new Object("BackBtn", new Vector2(
      canvas.width * 0.5, canvas.height * 0.88), 0, new Vector2(canvas.width / 1900,
        canvas.width / 1900)), 400, 200, "Images/BackBtn.png",
      this.OnBackBtnPressed.bind(this));
    this.titleText = new Text(this.object, "Info Menu", "white",
      canvas.width / 15, new Vector2(canvas.width * 0.5, canvas.height * 0.1),
      true);

    this.buttons[5] = this.backBtn;
    this.buttons[0] = new Button(new Object("HowToPlayBtn", new Vector2(
      canvas.width * 0.5, canvas.height * 0.23), 0, new Vector2(canvas.width / 1900,
      canvas.width / 1900)), 800, 200, "Images/HowToPlayBtn.png",
      this.OnHowToPlayPressed.bind(this));
    this.buttons[1] = new Button(new Object("SettingsBtn", new Vector2(
      canvas.width * 0.39, canvas.height * 0.45), 0, new Vector2(canvas.width / 1900,
      canvas.width / 1900)), 400, 200, "Images/SettingsInfoBtn.png",
      this.OnSettingsPressed.bind(this));
    this.buttons[2] = new Button(new Object("UpgradesBtn", new Vector2(
      canvas.width * 0.61, canvas.height * 0.45), 0, new Vector2(canvas.width / 1900,
      canvas.width / 1900)), 400, 200, "Images/UpgradesInfoBtn.png",
      this.OnUpgradesPressed.bind(this));
    this.buttons[3] = new Button(new Object("WeaponsBtn", new Vector2(
      canvas.width * 0.39, canvas.height * 0.67), 0, new Vector2(canvas.width / 1900,
      canvas.width / 1900)), 400, 200, "Images/WeaponsInfoBtn.png",
      this.OnWeaponsPressed.bind(this));
    this.buttons[4] = new Button(new Object("PowerupsBtn", new Vector2(
      canvas.width * 0.61, canvas.height * 0.67), 0, new Vector2(canvas.width / 1900,
        canvas.width / 1900)), 400, 200, "Images/PowerupsInfoBtn.png",
      this.OnPowerupsPressed.bind(this));
    this.CloseMenu();
  }

  ShowMenu() {
    this.object.SetActive(true);

    for (var button of this.buttons) {
      button.object.SetActive(true);
    }
  }

  CloseMenu() {
    this.object.SetActive(false);

    for (var button of this.buttons) {
      button.object.SetActive(false);
    }
  }

  OnBackBtnPressed() {
    let mainMenu = ObjectManagement.FindObjectOfType(MainMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      mainMenu.ShowMenu.bind(mainMenu)], []);
    gameManager.Save();
  }

  OnHowToPlayPressed() {
    let howToPlayMenu = ObjectManagement.FindObjectOfType(HowToPlayMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      howToPlayMenu.ShowMenu.bind(howToPlayMenu)], []);
  }

  OnSettingsPressed() {
    let settingsInfo = ObjectManagement.FindObjectOfType(SettingsInfoMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      settingsInfo.ShowMenu.bind(settingsInfo)], []);
  }

  OnUpgradesPressed() {
    let upgradesInfo = ObjectManagement.FindObjectOfType(UpgradesInfoMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      upgradesInfo.ShowMenu.bind(upgradesInfo)], []);
  }

  OnWeaponsPressed() {
    let weaponsInfo = ObjectManagement.FindObjectOfType(WeaponsInfoMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      weaponsInfo.ShowMenu.bind(weaponsInfo)], []);
  }

  OnPowerupsPressed() {
    let powerupsInfo = ObjectManagement.FindObjectOfType(PowerupInfoMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      powerupsInfo.ShowMenu.bind(powerupsInfo)], []);
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale.MultiplyS(scale);

    for (var button of this.buttons) {
      button.transform.position.MultiplyS(scale);
      button.transform.scale.MultiplyS(scale);
    }
  }
}
