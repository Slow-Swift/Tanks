class SettingsMenu extends Component {

  difficultyPresets = [
    {
      name: "Easy",
      numE: 4,
      speedE: 150,
      healthE: 150,
      damageE: 3,
      sDelayE: 1,
      stopRadiusE: 100,
    },

    {
      name: "Medium",
      numE: 10,
      speedE: 350,
      healthE: 300,
      damageE: 10,
      sDelayE: 0.75,
      stopRadiusE: 230,
    },

    {
      name: "Hard",
      numE: 17,
      speedE: 580,
      healthE: 570,
      damageE: 20,
      sDelayE: 0.4,
      stopRadiusE: 400,
    },

    {
      name: "Crazy",
      numE: 20,
      speedE: 750,
      healthE: 750,
      damageE: 30,
      sDelayE: 0.2,
      stopRadiusE: 500,
    },
  ]

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

  checkboxConfig = {
    width: 30,
    backColor: "#ddaa00",
    borderColor: "#bb7700",
    checked: true,
    shadows: false,
    checkColor: "white",
    checkThickness: 5,
  }

  dropdownConfig = {
    width: 300,
    height: 50,
    color: "#ddaa00",
    borderColor: "#bb7700",
    textColor: "white",
    shadows: false,
    items: this.difficultyPresets,
    itemIndex: 0,
    callback: this.OnDifficultyPresetSelected.bind(this)
  }

  Update() {
    gameManager.autoDifficulty = this.autoDifficultyCheckbox.checked;
    gameManager.volume = this.volumeSlider.value;

  }

  constructor(object) {
    super(object);
    this.mainMenuBtn = new Button(new Object("MenuBtn", new Vector2(
      canvas.width * 0.14, canvas.height * 0.14), 0, new Vector2(canvas.width / 1700,
        canvas.width / 1700)), 400, 200, "Images/BackBtn.png",
      this.OnMainMenuPressed.bind(this));
    this.volumeSlider = new Slider(new Object("VolumeSldr", new Vector2(
      canvas.width / 2, canvas.height * 0.24), 0, new Vector2(
        canvas.width / 1000, canvas.width / 1000)), this.sliderConfig);
    this.volumeText = new Text(this.object, "Volume", "white", 30 *
      canvas.width / 1000, new Vector2(canvas.width * 0.5, canvas.height * 0.2),
      true);
    this.titleText = new Text(this.object, "Settings", "white",
      canvas.width / 15, new Vector2(canvas.width * 0.5, canvas.height * 0.1),
      true);
    this.autoDifficultyCheckbox = new Checkbox(new Object("AutoDifficultyCB",
      new Vector2(canvas.width * 0.41, canvas.height * 0.35), 0, new Vector2(
      canvas.width / 1000, canvas.width / 1000)), this.checkboxConfig);
    new Text(this.object, "Auto Difficulty", "white", 30 *
      canvas.width / 1000, new Vector2(canvas.width * 0.43, canvas.height * 0.36),
      false);
    this.difficultyDropdown = new Dropdown(new Object("DifficultyDropdown",
      new Vector2(canvas.width * 0.5, canvas.height * 0.5), 0, new Vector2(
      canvas.width / 1000, canvas.width / 1000)), this.dropdownConfig);
    this.advancedDifficultyBtn = new Button(new Object("advancedDifficultyBtn",
      new Vector2(canvas.width * 0.5, canvas.height * 0.74), 0, new Vector2(
        canvas.width / 1300, canvas.width / 1300)), 400, 200,
        "Images/AdvanceDifficultyBtn.png", this.OnAdvancedDifficultyPressed.bind(this));
    this.resetBtn = new Button(new Object("resetBtn",
      new Vector2(canvas.width * 0.9, canvas.height * 0.9), 0, new Vector2(
      canvas.width / 2300, canvas.width / 2300)), 400, 200,
      "Images/Reset.png", this.OnResetPressed.bind(this));
    this.CloseMenu();
  }

  ShowMenu() {
    this.object.SetActive(true);
    this.mainMenuBtn.object.SetActive(true);
    this.volumeSlider.object.SetActive(true);
    this.autoDifficultyCheckbox.SetActive(true);
    this.difficultyDropdown.SetActive(true);
    this.advancedDifficultyBtn.object.SetActive(true);
    this.resetBtn.object.SetActive(true);
    this.autoDifficultyCheckbox.checked = gameManager.autoDifficulty;
    this.volumeSlider.value = gameManager.volume;
    if(!gameManager.presetDifficulty) {
      gameManager.presetDifficulty = this.dropdownConfig.items[0];
    } else {
      let index = -1;

      for (var preset of this.difficultyPresets) {
        if(preset.name == gameManager.presetDifficulty.name)
          index = this.difficultyPresets.indexOf(preset);
      }

      if(index >= 0) {
        this.difficultyDropdown.itemIndex = index;
      }

      gameManager.presetDifficulty = this.difficultyPresets[
        this.difficultyDropdown.itemIndex];
    }
  }

  OnDifficultyPresetSelected(index) {
    gameManager.presetDifficulty = this.dropdownConfig.
      items[index];
    gameManager.UpdateDifficultyToPreset();
    gameManager.Save();
  }

  CloseMenu() {
    this.object.SetActive(false);
    this.mainMenuBtn.object.SetActive(false);
    this.volumeSlider.object.SetActive(false);
    this.autoDifficultyCheckbox.SetActive(false);
    this.difficultyDropdown.SetActive(false);
    this.advancedDifficultyBtn.object.SetActive(false);
    this.resetBtn.object.SetActive(false);
  }

  OnAdvancedDifficultyPressed() {
    let advancedDifficultyMenu = ObjectManagement.FindObjectOfType(
      AdvancedDifficultyMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      advancedDifficultyMenu.ShowMenu.bind(advancedDifficultyMenu)], []);
  }

  OnResetPressed() {
    this.CloseMenu();
    ObjectManagement.FindObjectOfType(ConfirmResetMenu, false).ShowMenu();
  }

  OnMainMenuPressed() {
    let mainMenu = ObjectManagement.FindObjectOfType(MainMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      mainMenu.ShowMenu.bind(mainMenu)], []);
    gameManager.Save();
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale.MultiplyS(scale);
    this.mainMenuBtn.transform.scale.MultiplyS(scale);
    this.mainMenuBtn.transform.position.MultiplyS(scale);
    this.volumeSlider.transform.scale.MultiplyS(scale);
    this.volumeSlider.transform.position.MultiplyS(scale);
    this.autoDifficultyCheckbox.transform.scale.MultiplyS(scale);
    this.autoDifficultyCheckbox.transform.position.MultiplyS(scale);
    this.difficultyDropdown.transform.scale.MultiplyS(scale);
    this.difficultyDropdown.transform.position.MultiplyS(scale);
    this.advancedDifficultyBtn.transform.scale.MultiplyS(scale);
    this.advancedDifficultyBtn.transform.position.MultiplyS(scale);
    this.resetBtn.transform.scale.MultiplyS(scale);
    this.resetBtn.transform.position.MultiplyS(scale);
  }
}
