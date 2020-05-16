class WeaponsMenu extends Component {

  borderColor = "#a06f28";
  backColor = "#ae8c5b";
  font = "sans-serif";

  buttons = [];

  constructor(...args) {
    super(...args);
    this.backBtn = new Button(new Object("BackBtn", new Vector2(
      canvas.width * 0.5, canvas.height * 0.85), 0, new Vector2(canvas.width / 1700,
        canvas.width / 1700)), 400, 200, "Images/BackBtn.png",
      this.OnBackBtnPressed.bind(this));
    this.titleText = new Text(this.object, "Upgrades", "white",
      canvas.width / 15, new Vector2(canvas.width * 0.5, canvas.height * 0.1),
      true);
    this.availableUpgrades = playerData.availableUpgrades;
    this.coinImg = new Image();
    this.coinImg.src = "Images/Coin.png";
    this.SetupButtons();
    this.CloseMenu();
  }

  Update() {
    this.DrawIcons();
    this.DrawPrices();
    this.DrawSelected();
    this.DrawNumCoins();
  }

  DrawIcons() {
    display.TurnShadowsOff();

    let top = canvas.height * 0.2;
    let size = canvas.width * 0.07;
    let left = canvas.width * 0.5 - size * this.availableUpgrades.length / 2 * 1.1 +
      size * 0.05;
    ctx.fillStyle = this.borderColor;
    ctx.fillRect(left - size * 0.05, top - size * 0.05, size *
      this.availableUpgrades.length * 1.1, size * 1.1);
    for (var i = 0; i < this.availableUpgrades.length; i++) {
      let ap = this.availableUpgrades[i];
      ctx.fillStyle = this.backColor;
      ctx.fillRect(left + size * 1.1 * i, top, size, size);
      let img = ap.icon;
      let scale = size/img.width;
      let l = left + size * 0.5 + size * 1.1 * i - img.width / 2 * scale;
      let t = top + size * 0.5 - img.height / 2 * scale;
      ctx.drawImage(ap.icon, l, t, size, size);
      ctx.fillStyle = "white";
      ctx.font = canvas.height * 0.03 + "px " + this.font;
      ctx.textAlign = "end";
      ctx.fillText(ap.owned, l + size, top + size * 0.95);
      ctx.textAlign = "start";
    }

    display.TurnShadowsOn();
  }

  DrawPrices() {
    let top = canvas.height * 0.5;
    let size = canvas.width * 0.07;
    let left = canvas.width * 0.5 - size * this.availableUpgrades.length / 2 * 1.1 +
      size * 0.05;


    for (var i = 0; i < this.availableUpgrades.length; i++) {
      let ap = this.availableUpgrades[i];
      ctx.drawImage(this.coinImg, left + size * 1.1 * (i+0.05), top, size *0.5,
        size*0.5);
      let text = Math.floor(ap.price) + "";
      let fontSize = Math.min(canvas.height * 0.06, canvas.height * 0.12 / text.length);
      ctx.font = fontSize  + "px " + this.font;
      ctx.fillText(text, left + size * 1.1 * (i+0.53), top + size * 0.4,);
    }
  }

  DrawSelected() {

  }

  DrawNumCoins() {

    ctx.font = canvas.height * 0.1 + "px " + this.font;
    let left = canvas.width * 0.5 - (canvas.height * 0.12 +
      ctx.measureText(playerData.numCoins).width) / 2;
    ctx.fillText(playerData.numCoins, left + canvas.height * 0.12, canvas.height * 0.69);

    ctx.drawImage(this.coinImg, left, canvas.height * 0.6,
      canvas.height * 0.1, canvas.height * 0.1);
  }

  SetupButtons() {
    let top = canvas.height * 0.41;
    let size = canvas.width * 0.07;
    let left = canvas.width * 0.5 - size * this.availableUpgrades.length / 2 * 1.1 +
      size * 0.05;

    for (var i = 0; i < this.availableUpgrades.length; i++) {
      let o = new Object("AddBtn", new Vector2(left + size * 1.1 * i + size / 2, top),
        0, new Vector2(size/128, size/128));
      this.buttons.push(new Button(o, 128, 128, "Images/AddBtn.png",
      this.OnAddButtonPressed.bind(this, i)));
    }
  }

  OnAddButtonPressed(index) {
    let au = this.availableUpgrades[index];
    if(playerData.numCoins >= Math.floor(au.price)) {
      au.owned++;
      playerData.numCoins -= Math.floor(au.price);
      au.OnPurchased();
    }
    playerData.Save();
  }

  ShowMenu() {
    this.object.SetActive(true);
    this.backBtn.object.SetActive(true);

    for (var btn of this.buttons) {
      btn.object.SetActive(true);
    }
  }

  CloseMenu() {
    this.object.SetActive(false);
    this.backBtn.object.SetActive(false);

    for (var btn of this.buttons) {
      btn.object.SetActive(false);
    }
  }

  OnBackBtnPressed() {
    let mainMenu = ObjectManagement.FindObjectOfType(MainMenu, false);
    new SceneFader("SceneFader", 2, [this.CloseMenu.bind(this),
      mainMenu.ShowMenu.bind(mainMenu)], []);
    gameManager.Save();
  }

  OnDisplayResized(oldSize) {
    let scale = canvas.width / oldSize.x;
    this.transform.scale.MultiplyS(scale);
    this.backBtn.transform.scale.MultiplyS(scale);
    this.backBtn.transform.position.MultiplyS(scale);

    for (var btn of this.buttons) {
      btn.transform.scale.MultiplyS(scale);
      btn.transform.position.MultiplyS(scale);
    }
  }

}
