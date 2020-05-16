class PauseMenu extends Component {

  borderColor = "#a06f28";
  color = "#b57f2e";

  constructor(...args) {
    super(...args);
    new Text(this.object, "Paused", "#eeddaa", 30, new Vector2(330, 70), true, 0, 0, 0, -0.81);

    this.resumeBtn = new CameraButton(new Object("ResumeBtn", new Vector2(330, 120), 0,
      new Vector2(0.35, 0.35)), 400, 200, "Images/ResumeBtn.png",
      this.OnResumePressed.bind(this), -0.81);
    this.quitBtn = new CameraButton(new Object("QuitBtn", new Vector2(330, 200), 0,
      new Vector2(0.35, 0.35)), 400, 200, "Images/QuitBtn.png",
      this.OnQuitPressed.bind(this), -0.81);
    this.OnDisplayResized(new Vector2(660, 360));
    this.Hide();
  }

  Show() {
    gameManager.paused = true;
    this.object.SetActive(true);
    this.resumeBtn.object.SetActive(true);
    this.quitBtn.object.SetActive(true);
  }

  Update() {
    camera.MoveCtxBack();

    this.DrawBackground(canvas.height * 0.7, canvas.height * 0.6, 10, this.borderColor);
    display.TurnShadowsOff();

    this.DrawBackground(canvas.height * 0.67, canvas.height * 0.57, 10, this.color);

    display.TurnShadowsOn();
    camera.MoveCtxOut();
  }

  DrawBackground(width, height, cornerRadius, color) {
    ctx.fillStyle = color;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(canvas.width * 0.5 - width / 2 + cornerRadius,
      canvas.height * 0.4 - height / 2);
    ctx.lineTo(canvas.width * 0.5 + width / 2 - cornerRadius,
       canvas.height * 0.4 - height / 2);
    ctx.arc(canvas.width * 0.5 + width / 2 - cornerRadius,
        canvas.height * 0.4 - height / 2 + cornerRadius, cornerRadius,
        Math.PI * 3 / 2, 0);
    ctx.lineTo(canvas.width * 0.5 + width / 2,
      canvas.height * 0.4 + height / 2 - cornerRadius);
    ctx.arc(canvas.width * 0.5 + width / 2 - cornerRadius,
      canvas.height * 0.4 + height / 2 - cornerRadius, cornerRadius, 0,
      Math.PI/2);
    ctx.lineTo(canvas.width * 0.5 - width / 2 + cornerRadius,
       canvas.height * 0.4 + height / 2);
    ctx.arc(canvas.width * 0.5 - width / 2 + cornerRadius,
      canvas.height * 0.4 + height / 2 - cornerRadius, cornerRadius,
      Math.PI / 2, Math.PI);
    ctx.lineTo(canvas.width * 0.5 - width / 2,
       canvas.height * 0.4 - height / 2 + cornerRadius);
    ctx.arc(canvas.width * 0.5 - width / 2 + cornerRadius,
      canvas.height * 0.4 - height / 2 + cornerRadius, cornerRadius,
      Math.PI, Math.PI * 3 / 2);
    ctx.fill();
  }

  Hide() {
    gameManager.paused = false;
    this.object.SetActive(false);
    this.resumeBtn.object.SetActive(false);
    this.quitBtn.object.SetActive(false);
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale = this.transform.scale.MultiplyS(scale);
    this.resumeBtn.transform.position.MultiplyS(scale);
    this.resumeBtn.transform.scale.MultiplyS(scale);
    this.quitBtn.transform.position.MultiplyS(scale);
    this.quitBtn.transform.scale.MultiplyS(scale);
  }

  OnResumePressed() {
    this.Hide();
  }

  OnQuitPressed() {
    this.Hide();
    gameManager.gameOver = false;
    gameManager.playingGame = false;
    let menu = ObjectManagement.FindObjectOfType(MainMenu, false);
    let middleCallbacks = [gameManager.CleanupGame.bind(gameManager),
      menu.ShowMainMenu.bind(menu)];
    new SceneFader("SceneFader", 2, middleCallbacks, []);
  }

}
