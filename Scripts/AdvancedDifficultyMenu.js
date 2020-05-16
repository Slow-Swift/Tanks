class AdvancedDifficultyMenu extends Component {

  sliderConfig = {
    startPos: new Vector2(-100, 0),
    endPos: new Vector2(100, 0),
    thickness: 15,
    backColor: "#ddaa00",
    frontColor: "#ffdd00",
    handleColor: "#bb7700",
    textColor: "white",
    wholeNumbers: true,
    shadows: false,
  }

  sliders = [];

  constructor(object) {
    super(object);
    this.applyBtn = new Button(new Object("ApplyBtn", new Vector2(
      canvas.width * 0.5, canvas.height * 0.85), 0, new Vector2(canvas.width / 2000,
      canvas.width / 2000)), 400, 200, "Images/DoneBtn.png",
      this.OnApplyButtonPressed.bind(this));
    this.randomizeBtn = new Button(new Object("RandomizeBtn", new Vector2(
      canvas.width * 0.91, canvas.height * 0.85), 0, new Vector2(canvas.width / 2000,
      canvas.width / 2000)), 200, 200, "Images/RandomizeBtn.png",
      this.OnRandomizeButtonPressed.bind(this));

    this.SetupSliders();
    this.SetupTexts();

    this.CloseMenu();
  }

  SetupSliders() {
    this.numTanksSlider = this.sliders[0] = new Slider(new Object("numTanksSlider",
      new Vector2(canvas.width * 0.35, canvas.height * 0.18), 0, new Vector2(
      canvas.width / 1000, canvas.width / 1000)), this.sliderConfig);
    this.numTanksSlider.max = 20; this.numTanksSlider.min = 4;

    this.tankSpeedSlider = this.sliders[1] = new Slider(new Object("tankSpeedSlider",
      new Vector2(canvas.width * 0.35, canvas.height * 0.28), 0, new Vector2(
      canvas.width / 1000, canvas.width / 1000)), this.sliderConfig);
    this.tankSpeedSlider.max = 5; this.tankSpeedSlider.min = 1;
    this.tankSpeedSlider.wholeNumbers = false;

    this.tankHealthSlider = this.sliders[2] = new Slider(new Object("tankHealthSlider",
      new Vector2(canvas.width * 0.35, canvas.height * 0.38), 0, new Vector2(
      canvas.width / 1000, canvas.width / 1000)), this.sliderConfig);
    this.tankHealthSlider.max = 5; this.tankHealthSlider.min = 1;
    this.tankHealthSlider.wholeNumbers = false;

    this.tankDamageSlider = this.sliders[3] = new Slider(new Object("tankDamageSlider",
      new Vector2(canvas.width * 0.35, canvas.height * 0.48), 0, new Vector2(
      canvas.width / 1000, canvas.width / 1000)), this.sliderConfig);
    this.tankDamageSlider.max = 10; this.tankDamageSlider.min = 1;
    this.tankDamageSlider.wholeNumbers = false;

    this.enemyShootDelaySlider = this.sliders[4] = new Slider(new Object("enemyShootDelaySlider",
      new Vector2(canvas.width * 0.35, canvas.height * 0.58), 0, new Vector2(
      canvas.width / 1000, canvas.width / 1000)), this.sliderConfig);
    this.enemyShootDelaySlider.max = 1; this.enemyShootDelaySlider.min = 0.2;
    this.enemyShootDelaySlider.wholeNumbers = false;

    this.tankStopRadius = this.sliders[5] = new Slider(new Object("tankStopRadius",
      new Vector2(canvas.width * 0.35, canvas.height * 0.68), 0, new Vector2(
      canvas.width / 1000, canvas.width / 1000)), this.sliderConfig);
    this.tankStopRadius.max = 5; this.tankStopRadius.min = 1;
    this.tankStopRadius.wholeNumbers = false;
  }

  SetupTexts() {
    new Text(this.object, "Advanced Difficulty", "white",
      canvas.width / 15, new Vector2(canvas.width * 0.5, canvas.height * 0.1),
      true);

    new Text(this.object, "Number of Enemies", "white",
      canvas.width / 35, new Vector2(canvas.width * 0.55, canvas.height * 0.2),
      false);
    new Text(this.object, "Enemy Speed", "white",
      canvas.width / 35, new Vector2(canvas.width * 0.55, canvas.height * 0.3),
      false);
    new Text(this.object, "Enemy Health", "white",
      canvas.width / 35, new Vector2(canvas.width * 0.55, canvas.height * 0.4),
      false);
    new Text(this.object, "Enemy Damage", "white",
      canvas.width / 35, new Vector2(canvas.width * 0.55, canvas.height * 0.5),
      false);
    new Text(this.object, "Enemy Shoot Delay", "white",
      canvas.width / 35, new Vector2(canvas.width * 0.55, canvas.height * 0.6),
      false);
    new Text(this.object, "Enemy Stop Radius", "white",
      canvas.width / 35, new Vector2(canvas.width * 0.55, canvas.height * 0.7),
      false);
  }

  ShowMenu() {
    this.object.SetActive(true);
    this.applyBtn.object.SetActive(true);
    this.randomizeBtn.object.SetActive(true);

    for (let slider of this.sliders) {
      slider.object.SetActive(true);
    }

    this.SetupSliderValues();
  }

  SetupSliderValues() {
    this.numTanksSlider.value = gameManager.numEnemyTanks
    this.tankSpeedSlider.value = gameManager.enemyTankSpeed / 150;
    this.tankHealthSlider.value = gameManager.enemyTankHealth / 150;
    this.tankDamageSlider.value = gameManager.enemyTankDamage / 3;
    this.enemyShootDelaySlider.value = gameManager.enemyShootDelay;
    this.tankStopRadius.value = gameManager.enemyStopRadius / 100;
  }

  CloseMenu() {
    this.object.SetActive(false);
    this.applyBtn.object.SetActive(false);
    this.randomizeBtn.object.SetActive(false);

    for (let slider of this.sliders) {
      slider.object.SetActive(false);
    }
  }

  OnApplyButtonPressed() {
    gameManager.numEnemyTanks = this.numTanksSlider.value;
    gameManager.enemyTankSpeed = this.tankSpeedSlider.value * 150;
    gameManager.enemyTankHealth = this.tankHealthSlider.value * 150;
    gameManager.enemyTankDamage = this.tankDamageSlider.value * 3;
    gameManager.enemyShootDelay = this.enemyShootDelaySlider.value;
    gameManager.enemyStopRadius = this.tankStopRadius.value * 100;

    let settingsMenu = ObjectManagement.FindObjectOfType(SettingsMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      settingsMenu.ShowMenu.bind(settingsMenu)], []);

    gameManager.Save();
  }

  OnRandomizeButtonPressed() {
    for(let slider of this.sliders) {
      slider.value = random.Random(slider.min, slider.max, slider.wholeNumbers);
    }
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale.MultiplyS(scale);
    this.applyBtn.transform.position.MultiplyS(scale);
    this.applyBtn.transform.scale.MultiplyS(scale);

    for (var slider of this.sliders) {
      slider.transform.scale.MultiplyS(scale);
      slider.transform.position.MultiplyS(scale);
    }
  }
}
