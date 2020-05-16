class HowToPlayMenu extends Component {

  numHelpImages = 5;
  currentHelpImageIndex = 0;

  constructor(...args) {
    super(...args);
    this.nextButton = new Button(new Object("NextButton", new Vector2(
      canvas.width * 0.93, canvas.height * 0.85), 0, new Vector2(canvas.width / 1900,
      canvas.width / 1900)), 200, 200, "Images/nextArrow.png",
      this.OnNextButtonPressed.bind(this));
    this.previousButton = new Button(new Object("BackButton", new Vector2(
      canvas.width * 0.07, canvas.height * 0.85), 0, new Vector2(canvas.width / 1900,
      canvas.width / 1900)), 200, 200, "Images/prevArrow.png",
      this.OnPreviousButtonPressed.bind(this));
    this.xButton = new Button(new Object("xButton", new Vector2(
      canvas.width * 0.93, canvas.height * 0.12), 0, new Vector2(canvas.width / 1900,
      canvas.width / 1900)), 200, 200, "Images/xButton.png",
      this.OnXButtonPressed.bind(this));
    this.SetupHelpImages();
    this.CloseMenu();
  }

  SetupHelpImages() {
    this.helpImages = [];
    this.helpImages.push(new Image());
    this.helpImages.push(new Image());
    this.helpImages.push(new Image());
    this.helpImages.push(new Image());
    this.helpImages.push(new Image());
    this.helpImages[2].src = "Images/TanksInstruction1.png";
    this.helpImages[0].src = "Images/TanksInstruction3.png";
    this.helpImages[1].src = "Images/TanksInstruction4.png";
    this.helpImages[3].src = "Images/TanksInstruction5.png";
    this.helpImages[4].src = "Images/TanksInstruction2.png";
  }

  Update() {
    this.DrawHelpImages();
  }

  DrawHelpImages() {
    ctx.drawImage(this.helpImages[this.currentHelpImageIndex], canvas.width * 0.15,
      canvas.height * 0.15, canvas.width * 0.7, canvas.height * 0.7);
  }

  ShowMenu() {
    this.object.SetActive(true);
    this.nextButton.object.SetActive(true);
    this.previousButton.object.SetActive(true);
    this.xButton.object.SetActive(true);
  }

  CloseMenu() {
    this.object.SetActive(false);
    this.nextButton.object.SetActive(false);
    this.previousButton.object.SetActive(false);
    this.xButton.object.SetActive(false);
  }

  OnNextButtonPressed() {
    this.currentHelpImageIndex++;
    this.currentHelpImageIndex %= (this.numHelpImages);
  }

  OnPreviousButtonPressed() {
    this.currentHelpImageIndex--;
    if(this.currentHelpImageIndex < 0) {
      this.currentHelpImageIndex += this.numHelpImages;
    }
  }

  OnXButtonPressed() {
    let infoMenu = ObjectManagement.FindObjectOfType(InfoMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      infoMenu.ShowMenu.bind(infoMenu)], []);
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.position.MultiplyS(scale);
    this.transform.scale.MultiplyS(scale);
    this.xButton.transform.position.MultiplyS(scale);
    this.xButton.transform.scale.MultiplyS(scale);
    this.nextButton.transform.position.MultiplyS(scale);
    this.nextButton.transform.scale.MultiplyS(scale);
    this.previousButton.transform.position.MultiplyS(scale);
    this.previousButton.transform.scale.MultiplyS(scale);
  }
}
