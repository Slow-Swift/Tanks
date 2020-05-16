class ConfirmResetMenu extends Component {
  constructor(...args) {
    super(...args);
    this.text = new Text(this.object, "Confirm Game Reset\nYou will lose all progress.", "white",
      canvas.width / 15, new Vector2(canvas.width * 0.5, canvas.height * 0.4),
      true, 0, 0, true);
    this.okBtn = new Button(new Object("okBtn",
      new Vector2(canvas.width * 0.37, canvas.height * 0.85), 0, new Vector2(
      canvas.width / 1700, canvas.width / 1700)), 400, 200,
      "Images/okBtn.png", this.OnConfirmPressed.bind(this));
    this.cancelBtn = new Button(new Object("cancelBtn",
      new Vector2(canvas.width * 0.63, canvas.height * 0.85), 0, new Vector2(
      canvas.width / 1700, canvas.width / 1700)), 400, 200,
      "Images/cancelBtn.png", this.OnCancelPressed.bind(this));
    this.CloseMenu();
  }

  ShowMenu() {
    this.object.SetActive(true);
    this.okBtn.object.SetActive(true);
    this.cancelBtn.object.SetActive(true);
  }

  CloseMenu() {
    this.object.SetActive(false);
    this.okBtn.object.SetActive(false);
    this.cancelBtn.object.SetActive(false);
  }

  OnConfirmPressed() {
    localStorage.removeItem(gameManager.savedDataPrefix + "Purchases");
    localStorage.removeItem(gameManager.savedDataPrefix + "DifficultySettings");
    window.location.reload();
  }

  OnCancelPressed() {
    this.CloseMenu();
    ObjectManagement.FindObjectOfType(SettingsMenu, false).ShowMenu();
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale.MultiplyS(scale);
    this.transform.position.MultiplyS(scale);
  }
}
