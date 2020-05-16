class UpgradesInfoMenu extends Component {
  constructor(...args) {
    super(...args);
    this.xButton = new Button(new Object("xButton", new Vector2(
      canvas.width * 0.93, canvas.height * 0.12), 0, new Vector2(canvas.width / 1900,
      canvas.width / 1900)), 200, 200, "Images/xButton.png",
      this.OnXButtonPressed.bind(this));
    this.infoImage = new Sprite("infoImage", "Images/UpgradesInfoMenu.png",
    "true");
    this.infoImage.transform.position = new Vector2(canvas.width / 2, canvas.height / 1.8);
    this.infoImage.transform.scale = new Vector2(canvas.width / 800, canvas.width / 800);
    this.CloseMenu();
  }

  ShowMenu() {
    this.object.SetActive(true);
    this.xButton.object.SetActive(true);
    this.infoImage.object.SetActive(true);
  }

  CloseMenu() {
    this.object.SetActive(false);
    this.xButton.object.SetActive(false);
    this.infoImage.object.SetActive(false);
  }

  OnXButtonPressed() {
    let infoMenu = ObjectManagement.FindObjectOfType(InfoMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      infoMenu.ShowMenu.bind(infoMenu)], []);
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale.MultiplyS(scale);
    this.transform.position.MultiplyS(scale);
    this.infoImage.transform.position.MultiplyS(scale);
    this.infoImage.transform.scale.MultiplyS(scale);
    this.xButton.transform.position.MultiplyS(scale);
    this.xButton.transform.scale.MultiplyS(scale);
  }
}
