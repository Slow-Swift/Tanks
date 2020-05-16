class GameOverMenu extends Component {
  borderColor = "#a06f28";
  backColor = "#ae8c5b";
  font = "sans-serif";

  buttons = [];

  constructor(...args) {
    super(...args);
    this.backBtn = new Button(new Object("BackBtn", new Vector2(
      canvas.width * 0.5, canvas.height * 0.8), 0, new Vector2(canvas.width / 1700,
        canvas.width / 1700)), 400, 200, "Images/MainMenu.png",
      this.OnMainMenuPressed.bind(this));

    this.messageText = new Text(this.object, "", "white",
      canvas.width / 8, new Vector2(canvas.width * 0.5, canvas.height * 0.2),
      true);
    this.playTimeText = new Text(this.object, "", "white", canvas.width / 20,
      new Vector2(canvas.width * 0.5, canvas.height * 0.4), true);
    this.collectedCoinsText = new Text(this.object, "", "white", canvas.width / 20,
      new Vector2(canvas.width * 0.5, canvas.height * 0.55), true);

    this.CloseMenu();
  }

  ShowMenu() {
    this.object.SetActive(true);
    this.backBtn.object.SetActive(true);
    if(gameManager.twoPlayer) {
      this.messageText.text = gameManager.winner;
      this.collectedCoinsText.text = "";
    } else {
      let message = gameManager.playerWins ? "You Win!!" : "You Lose!";
      this.messageText.text = message;
      this.collectedCoinsText.text = "Collectected Coins: " + gameManager.collectedCoins;
    }
    this.playTimeText.text = "Play Time: " + gameManager.playTimeAsString;
  }

  CloseMenu() {
    this.object.SetActive(false);
    this.backBtn.object.SetActive(false);
  }

  OnMainMenuPressed() {
    let mainMenu = ObjectManagement.FindObjectOfType(MainMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      mainMenu.ShowMenu.bind(mainMenu)], []);
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale.MultiplyS(scale);
    this.backBtn.transform.scale.MultiplyS(scale);
    this.backBtn.transform.position.MultiplyS(scale);
  }
}
